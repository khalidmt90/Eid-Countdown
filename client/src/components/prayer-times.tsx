import { useEffect, useState } from "react";
import { format } from "date-fns";
import { 
  Loader2, 
  MapPin, 
  Moon, 
  Sunrise, 
  Sun, 
  Sunset, 
  Clock, 
  Share2,
  Globe,
  Navigation
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  type PrayerTimes, 
  type City,
  type Country,
  type PrayerData,
  COUNTRIES,
  getDailyAyah
} from "@/lib/prayer-data";
import { cn } from "@/lib/utils";

// Helper to format time remaining
function formatTimeRemaining(ms: number) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 60 / 60) % 24);
  return { hours, minutes, seconds };
}

// Convert 24h time string "HH:mm" to Date object for today
function parseTime(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function PrayerTimesSection() {
  const [loading, setLoading] = useState(true);
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  
  // State for Country and City
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // Default Saudi Arabia
  const [selectedCity, setSelectedCity] = useState<City>(COUNTRIES[0].cities[0]); // Default Riyadh
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [usingExactLocation, setUsingExactLocation] = useState(false);

  const [nextPrayer, setNextPrayer] = useState<{name: string, time: Date} | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [dailyAyah] = useState(getDailyAyah());

  // Load saved country and city preference
  useEffect(() => {
    const savedCountryName = localStorage.getItem("selectedCountry");
    const savedCityName = localStorage.getItem("selectedCity");

    if (savedCountryName && savedCityName) {
      const country = COUNTRIES.find(c => c.nameEn === savedCountryName);
      if (country) {
        setSelectedCountry(country);
        const city = country.cities.find(c => c.nameEn === savedCityName);
        if (city) {
          setSelectedCity(city);
        } else {
          setSelectedCity(country.cities[0]); // Fallback to first city
        }
      }
    }
    // Note: We don't auto-geolocate on load anymore to give user choice
  }, []);

  const handleUseCurrentLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setUsingExactLocation(true);
        setLoading(false); // Trigger refetch in useEffect
      }, (error) => {
        console.error("Geolocation error:", error);
        alert("تعذر تحديد موقعك بدقة. الرجاء التأكد من تفعيل خدمة الموقع.");
        setLoading(false);
      });
    } else {
      alert("المتصفح لا يدعم تحديد الموقع.");
      setLoading(false);
    }
  };

  // Fetch Prayer Times
  useEffect(() => {
    setLoading(true);
    const date = new Date();
    
    // Determine coordinates to use
    const lat = usingExactLocation && userLocation ? userLocation.lat : selectedCity.lat;
    const lng = usingExactLocation && userLocation ? userLocation.lng : selectedCity.lng;

    // Cache check (skip cache if using exact location for freshness)
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

  // Calculate Next Prayer Countdown
  useEffect(() => {
    if (!prayerData) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timings = prayerData.timings;
      
      const prayers = [
        { name: "Fajr", time: parseTime(timings.Fajr) },
        { name: "Sunrise", time: parseTime(timings.Sunrise) },
        { name: "Dhuhr", time: parseTime(timings.Dhuhr) },
        { name: "Asr", time: parseTime(timings.Asr) },
        { name: "Maghrib", time: parseTime(timings.Maghrib) },
        { name: "Isha", time: parseTime(timings.Isha) },
      ];

      // Find next prayer
      let next = prayers.find(p => p.time > now);
      
      // If all passed, next is Fajr tomorrow
      if (!next) {
        const fajrTomorrow = parseTime(timings.Fajr);
        fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);
        next = { name: "Fajr", time: fajrTomorrow };
      }

      setNextPrayer(next);
      setTimeRemaining(next.time.getTime() - now.getTime());

    }, 1000);

    return () => clearInterval(interval);
  }, [prayerData]);

  const handleCountryChange = (val: string) => {
    const country = COUNTRIES.find(c => c.nameEn === val);
    if (country) {
      setSelectedCountry(country);
      setSelectedCity(country.cities[0]); // Default to first city of new country
      localStorage.setItem("selectedCountry", val);
      localStorage.setItem("selectedCity", country.cities[0].nameEn);
    }
  };

  const handleCityChange = (val: string) => {
    const city = selectedCountry.cities.find(c => c.nameEn === val);
    if (city) {
      setSelectedCity(city);
      localStorage.setItem("selectedCity", val);
    }
  };

  const handleShare = () => {
    if (!prayerData || !nextPrayer) return;
    
    const text = `
🕌 مواقيت الصلاة في ${selectedCity.nameAr}، ${selectedCountry.nameAr}
📅 ${prayerData.date.hijri.date} ${prayerData.date.hijri.month.ar} ${prayerData.date.hijri.year}

الفجر: ${prayerData.timings.Fajr}
الشروق: ${prayerData.timings.Sunrise}
الظهر: ${prayerData.timings.Dhuhr}
العصر: ${prayerData.timings.Asr}
المغرب: ${prayerData.timings.Maghrib}
العشاء: ${prayerData.timings.Isha}

⏳ الصلاة القادمة: ${nextPrayer.name === 'Fajr' ? 'الفجر' : 
                   nextPrayer.name === 'Maghrib' ? 'المغرب' : 
                   nextPrayer.name === 'Dhuhr' ? 'الظهر' : 
                   nextPrayer.name === 'Asr' ? 'العصر' : 
                   nextPrayer.name === 'Isha' ? 'العشاء' : 'الشروق'}
`;
    
    if (navigator.share) {
      navigator.share({
        title: 'مواقيت الصلاة',
        text: text,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(text);
      alert("تم نسخ المواقيت إلى الحافظة");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const { hours, minutes, seconds } = formatTimeRemaining(timeRemaining);

  const prayerIcons: Record<string, any> = {
    Fajr: Moon,
    Sunrise: Sunrise,
    Dhuhr: Sun,
    Asr: Sun,
    Maghrib: Sunset,
    Isha: Moon
  };

  const prayerNamesAr: Record<string, string> = {
    Fajr: "الفجر",
    Sunrise: "الشروق",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء"
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 px-4 font-sans" dir="rtl">
      
      {/* Top Bar: Location & Date */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card p-4 rounded-2xl shadow-lg border border-border">
        
        {/* Location Selectors */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Globe className="text-muted-foreground w-5 h-5" />
              <Select 
                onValueChange={(val) => {
                  setUsingExactLocation(false);
                  handleCountryChange(val);
                }} 
                value={usingExactLocation ? undefined : selectedCountry.nameEn}
                disabled={usingExactLocation}
              >
                <SelectTrigger className="w-full sm:w-[160px] bg-background border-border text-foreground font-bold">
                  <SelectValue placeholder={usingExactLocation ? "موقعك الحالي" : "اختر الدولة"} />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground border-border max-h-[300px]">
                  {COUNTRIES.map(country => (
                    <SelectItem key={country.nameEn} value={country.nameEn} className="font-sans">
                      {country.nameAr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <MapPin className="text-primary w-5 h-5" />
              <Select 
                onValueChange={(val) => {
                  setUsingExactLocation(false);
                  handleCityChange(val);
                }} 
                value={usingExactLocation ? undefined : selectedCity.nameEn}
                disabled={usingExactLocation}
              >
                <SelectTrigger className="w-full sm:w-[160px] bg-background border-border text-foreground font-bold">
                  <SelectValue placeholder={usingExactLocation ? "تم التحديد آلياً" : "اختر المدينة"} />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground border-border max-h-[300px]">
                  {selectedCountry.cities.map(city => (
                    <SelectItem key={city.nameEn} value={city.nameEn} className="font-sans">
                      {city.nameAr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!usingExactLocation ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleUseCurrentLocation}
                className="w-full text-xs gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary"
              >
                <Navigation className="w-3 h-3" />
                استخدم موقعي الحالي (دقة عالية)
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setUsingExactLocation(false)}
                className="w-full text-xs gap-2 text-destructive hover:bg-destructive/10"
              >
                إلغاء الموقع الحالي والعودة للقائمة
              </Button>
            )}
          </div>
        </div>
        
        <div className="text-center md:text-left text-muted-foreground font-medium">
          <p className="text-lg text-foreground font-bold">
            {prayerData?.date.hijri.date} {prayerData?.date.hijri.month.ar} {prayerData?.date.hijri.year}
          </p>
          <p className="text-sm opacity-80">{prayerData?.date.readable}</p>
        </div>
      </div>

      {/* Main Countdown Card */}
      {nextPrayer && (
        <Card className={cn(
          "overflow-hidden border-2 shadow-xl transition-all",
          nextPrayer.name === 'Fajr' ? "border-primary/50 shadow-primary/20" : 
          nextPrayer.name === 'Maghrib' ? "border-secondary/50 shadow-secondary/20" : 
          "border-border"
        )}>
          <CardHeader className={cn(
            "text-center py-6",
            nextPrayer.name === 'Fajr' ? "bg-primary text-primary-foreground" : 
            nextPrayer.name === 'Maghrib' ? "bg-secondary text-secondary-foreground" : 
            "bg-card text-foreground"
          )}>
            <CardTitle className="text-2xl font-bold font-serif">
              المتبقي لصلاة {prayerNamesAr[nextPrayer.name]}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center py-10 bg-card">
            <div className="grid grid-cols-3 gap-8 text-center" dir="ltr">
              <div>
                <span className="block text-5xl md:text-7xl font-mono font-black tracking-tighter text-foreground">
                  {String(hours).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-muted-foreground font-bold mt-2 block">ساعة</span>
              </div>
              <div>
                <span className="block text-5xl md:text-7xl font-mono font-black tracking-tighter text-foreground">
                  {String(minutes).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-muted-foreground font-bold mt-2 block">دقيقة</span>
              </div>
              <div>
                <span className="block text-5xl md:text-7xl font-mono font-black tracking-tighter text-foreground">
                  {String(seconds).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-muted-foreground font-bold mt-2 block">ثانية</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prayer Times Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {prayerData && Object.entries(prayerData.timings)
          .filter(([key]) => ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(key))
          .map(([name, time]) => {
            const Icon = prayerIcons[name] || Clock;
            const isNext = nextPrayer?.name === name;
            
            return (
              <Card key={name} className={cn(
                "text-center p-4 transition-all duration-300 border-2 hover:shadow-lg",
                isNext 
                  ? "border-primary bg-primary/10 scale-105 shadow-xl" 
                  : "border-border bg-card hover:border-primary/50"
              )}>
                <div className="flex flex-col items-center gap-3">
                  <Icon className={cn(
                    "w-8 h-8",
                    isNext ? "text-primary" : "text-muted-foreground"
                  )} />
                  <h3 className="font-bold text-lg">{prayerNamesAr[name]}</h3>
                  <p className="text-2xl font-mono font-black tracking-tight">{time}</p>
                </div>
              </Card>
            );
          })}
      </div>

      {/* Ayah of the Day */}
      <Card className="bg-card border-2 border-accent/20 overflow-hidden">
        <div className="bg-accent/10 p-2 text-center text-accent font-bold text-sm">
          آية اليوم
        </div>
        <CardContent className="p-8 text-center space-y-6">
          <p className="text-2xl md:text-4xl leading-loose font-serif text-foreground font-bold" style={{ lineHeight: '1.8' }}>
            {dailyAyah.text}
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-accent font-bold text-lg">{dailyAyah.source}</span>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base italic" dir="ltr">
              "{dailyAyah.translation}"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Share Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button 
          onClick={handleShare}
          className="rounded-full w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
        >
          <Share2 className="w-6 h-6" />
        </Button>
      </div>

    </div>
  );
}
