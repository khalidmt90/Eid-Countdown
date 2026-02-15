import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { COUNTRIES, getDailyAyah, type Country, type City, type PrayerData } from "@/lib/prayer-data";

function findNearestCity(lat: number, lng: number): { country: Country; city: City } | null {
  let nearestCity: City | null = null;
  let nearestCountry: Country | null = null;
  let minDistance = Infinity;

  for (const country of COUNTRIES) {
    for (const city of country.cities) {
      const dLat = lat - city.lat;
      const dLng = lng - city.lng;
      const distance = Math.sqrt(dLat * dLat + dLng * dLng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city;
        nearestCountry = country;
      }
    }
  }

  if (nearestCity && nearestCountry) {
    return { country: nearestCountry, city: nearestCity };
  }
  return null;
}

function getInitialLocation(): { country: Country; city: City; hasStoredLocation: boolean } {
  const savedCountryName = localStorage.getItem("selectedCountry");
  const savedCityName = localStorage.getItem("selectedCity");

  if (savedCountryName && savedCityName) {
    const country = COUNTRIES.find(c => c.nameEn === savedCountryName);
    if (country) {
      const city = country.cities.find(c => c.nameEn === savedCityName);
      if (city) {
        return { country, city, hasStoredLocation: true };
      }
      return { country, city: country.cities[0], hasStoredLocation: true };
    }
  }
  
  return { country: COUNTRIES[0], city: COUNTRIES[0].cities[0], hasStoredLocation: false };
}

export function usePrayerTimes() {
  const { t, i18n } = useTranslation();
  
  const initialLocation = getInitialLocation();
  
  const [loading, setLoading] = useState(true);
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [locationSelected, setLocationSelected] = useState(initialLocation.hasStoredLocation);
  
  const [selectedCountry, setSelectedCountry] = useState<Country>(initialLocation.country);
  const [selectedCity, setSelectedCity] = useState<City>(initialLocation.city);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [usingExactLocation, setUsingExactLocation] = useState(false);

  const [nextPrayer, setNextPrayer] = useState<{name: string, time: Date} | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [dailyAyah] = useState(getDailyAyah());

  const handleUseCurrentLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setUsingExactLocation(true);
        setLocationSelected(true);
        
        const nearest = findNearestCity(latitude, longitude);
        if (nearest) {
          setSelectedCountry(nearest.country);
          setSelectedCity(nearest.city);
          localStorage.setItem("selectedCountry", nearest.country.nameEn);
          localStorage.setItem("selectedCity", nearest.city.nameEn);
        }
        
        setLoading(false);
      }, (error) => {
        console.error("Geolocation error:", error);
        alert(t('gps_error'));
        setLoading(false);
      });
    } else {
      alert(t('compass_error'));
      setLoading(false);
    }
  };

  // Fetch Prayer Times
  useEffect(() => {
    setLoading(true);
    const date = new Date();
    
    const lat = usingExactLocation && userLocation ? userLocation.lat : selectedCity.lat;
    const lng = usingExactLocation && userLocation ? userLocation.lng : selectedCity.lng;

    const cacheKey = `prayerTimes_${usingExactLocation ? 'exact' : selectedCity.nameEn}_${date.toDateString()}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (cached && !usingExactLocation) {
      setPrayerData(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetch(
      `https://api.aladhan.com/v1/timings/${Math.floor(date.getTime() / 1000)}?latitude=${lat}&longitude=${lng}&method=4`
    )
      .then(res => res.json())
      .then(data => {
        if (data.code === 200) {
          setPrayerData(data.data);
          if (!usingExactLocation) {
            localStorage.setItem(cacheKey, JSON.stringify(data.data));
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch prayer times", err);
        setLoading(false);
      });
  }, [selectedCity, userLocation, usingExactLocation]);

  const hijriMonth = prayerData?.date?.hijri?.month;
  const isRamadan = hijriMonth?.en === "Ramadan" || hijriMonth?.ar === "رمضان";

  // Calculate Next Prayer Countdown (context-aware for Ramadan)
  useEffect(() => {
    if (!prayerData) return;

    const parseTime = (timeStr: string): Date => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    const interval = setInterval(() => {
      const now = new Date();
      const timings = prayerData.timings;

      if (isRamadan) {
        const maghribTime = parseTime(timings.Maghrib);
        if (now < maghribTime) {
          setNextPrayer({ name: "__iftar__", time: maghribTime });
          setTimeRemaining(maghribTime.getTime() - now.getTime());
        } else {
          const fajrTomorrow = parseTime(timings.Fajr);
          fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);
          setNextPrayer({ name: "__imsak__", time: fajrTomorrow });
          setTimeRemaining(fajrTomorrow.getTime() - now.getTime());
        }
      } else {
        const prayers = [
          { name: "Fajr", time: parseTime(timings.Fajr) },
          { name: "Sunrise", time: parseTime(timings.Sunrise) },
          { name: "Dhuhr", time: parseTime(timings.Dhuhr) },
          { name: "Asr", time: parseTime(timings.Asr) },
          { name: "Maghrib", time: parseTime(timings.Maghrib) },
          { name: "Isha", time: parseTime(timings.Isha) },
        ];

        let next = prayers.find(p => p.time > now);
        
        if (!next) {
          const fajrTomorrow = parseTime(timings.Fajr);
          fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);
          next = { name: "Fajr", time: fajrTomorrow };
        }

        setNextPrayer(next);
        setTimeRemaining(next.time.getTime() - now.getTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerData, isRamadan]);

  const handleCountryChange = (val: string) => {
    const country = COUNTRIES.find(c => c.nameEn === val);
    if (country) {
      setSelectedCountry(country);
      setSelectedCity(country.cities[0]);
      setLocationSelected(true);
      localStorage.setItem("selectedCountry", val);
      localStorage.setItem("selectedCity", country.cities[0].nameEn);
    }
  };

  const handleCityChange = (val: string) => {
    const city = selectedCountry.cities.find(c => c.nameEn === val);
    if (city) {
      setSelectedCity(city);
      setLocationSelected(true);
      localStorage.setItem("selectedCity", val);
    }
  };

  const formatTimeRemaining = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / 1000 / 60 / 60) % 24);
    return { hours, minutes, seconds };
  };

  return {
    loading,
    prayerData,
    selectedCountry,
    selectedCity,
    usingExactLocation,
    locationSelected,
    nextPrayer,
    timeRemaining,
    dailyAyah,
    isRamadan,
    handleCountryChange,
    handleCityChange,
    handleUseCurrentLocation,
    setUsingExactLocation,
    formatTimeRemaining
  };
}
