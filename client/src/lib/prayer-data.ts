// Prayer Times Types
export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export interface PrayerData {
  timings: PrayerTimes;
  date: {
    readable: string;
    hijri: {
      date: string;
      month: {
        en: string;
        ar: string;
      };
      year: string;
    };
  };
  meta: {
    timezone: string;
  };
}

export interface City {
  nameEn: string;
  nameAr: string;
  lat: number;
  lng: number;
}

export interface Country {
  nameEn: string;
  nameAr: string;
  cities: City[];
}

export const COUNTRIES: Country[] = [
  {
    nameEn: "Saudi Arabia",
    nameAr: "السعودية",
    cities: [
      { nameEn: "Riyadh", nameAr: "الرياض", lat: 24.7136, lng: 46.6753 },
      { nameEn: "Jeddah", nameAr: "جدة", lat: 21.5433, lng: 39.1728 },
      { nameEn: "Mecca", nameAr: "مكة المكرمة", lat: 21.3891, lng: 39.8579 },
      { nameEn: "Medina", nameAr: "المدينة المنورة", lat: 24.5247, lng: 39.5692 },
      { nameEn: "Dammam", nameAr: "الدمام", lat: 26.4207, lng: 50.0888 },
      { nameEn: "Tabuk", nameAr: "تبوك", lat: 28.3835, lng: 36.5662 },
      { nameEn: "Abha", nameAr: "أبها", lat: 18.2465, lng: 42.5117 }
    ]
  },
  {
    nameEn: "UAE",
    nameAr: "الإمارات",
    cities: [
      { nameEn: "Abu Dhabi", nameAr: "أبو ظبي", lat: 24.4539, lng: 54.3773 },
      { nameEn: "Dubai", nameAr: "دبي", lat: 25.2048, lng: 55.2708 },
      { nameEn: "Sharjah", nameAr: "الشارقة", lat: 25.3573, lng: 55.4033 },
      { nameEn: "Ajman", nameAr: "عجمان", lat: 25.4052, lng: 55.5136 }
    ]
  },
  {
    nameEn: "Egypt",
    nameAr: "مصر",
    cities: [
      { nameEn: "Cairo", nameAr: "القاهرة", lat: 30.0444, lng: 31.2357 },
      { nameEn: "Alexandria", nameAr: "الإسكندرية", lat: 31.2001, lng: 29.9187 },
      { nameEn: "Giza", nameAr: "الجيزة", lat: 30.0131, lng: 31.2089 },
      { nameEn: "Sharm El Sheikh", nameAr: "شرم الشيخ", lat: 27.9158, lng: 34.3299 }
    ]
  },
  {
    nameEn: "Kuwait",
    nameAr: "الكويت",
    cities: [
      { nameEn: "Kuwait City", nameAr: "مدينة الكويت", lat: 29.3759, lng: 47.9774 },
      { nameEn: "Al Ahmadi", nameAr: "الأحمدي", lat: 29.0769, lng: 48.0839 },
      { nameEn: "Hawalli", nameAr: "حولي", lat: 29.3328, lng: 48.0283 }
    ]
  },
  {
    nameEn: "Qatar",
    nameAr: "قطر",
    cities: [
      { nameEn: "Doha", nameAr: "الدوحة", lat: 25.2854, lng: 51.5310 },
      { nameEn: "Al Rayyan", nameAr: "الريان", lat: 25.2854, lng: 51.4244 },
      { nameEn: "Al Wakrah", nameAr: "الوكرة", lat: 25.1768, lng: 51.6048 }
    ]
  },
  {
    nameEn: "Bahrain",
    nameAr: "البحرين",
    cities: [
      { nameEn: "Manama", nameAr: "المنامة", lat: 26.2285, lng: 50.5860 },
      { nameEn: "Muharraq", nameAr: "المحرق", lat: 26.2572, lng: 50.6119 }
    ]
  },
  {
    nameEn: "Oman",
    nameAr: "عمان",
    cities: [
      { nameEn: "Muscat", nameAr: "مسقط", lat: 23.5880, lng: 58.3829 },
      { nameEn: "Salalah", nameAr: "صلالة", lat: 17.0151, lng: 54.0924 },
      { nameEn: "Sohar", nameAr: "صحار", lat: 24.3642, lng: 56.7468 }
    ]
  },
  {
    nameEn: "Jordan",
    nameAr: "الأردن",
    cities: [
      { nameEn: "Amman", nameAr: "عمان", lat: 31.9454, lng: 35.9284 },
      { nameEn: "Zarqa", nameAr: "الزرقاء", lat: 32.0608, lng: 36.0942 },
      { nameEn: "Irbid", nameAr: "إربد", lat: 32.5568, lng: 35.8469 }
    ]
  },
  {
    nameEn: "Palestine",
    nameAr: "فلسطين",
    cities: [
      { nameEn: "Jerusalem", nameAr: "القدس", lat: 31.7683, lng: 35.2137 },
      { nameEn: "Gaza", nameAr: "غزة", lat: 31.5017, lng: 34.4668 },
      { nameEn: "Ramallah", nameAr: "رام الله", lat: 31.9038, lng: 35.2034 },
      { nameEn: "Hebron", nameAr: "الخليل", lat: 31.5326, lng: 35.0998 }
    ]
  }
];

// Fallback for backward compatibility
export const CITIES: City[] = COUNTRIES[0].cities;

export const AYAH_LIST = [
  {
    text: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا",
    source: "سورة النساء: 103",
    translation: "Indeed, prayer has been decreed upon the believers a decree of specified times."
  },
  {
    text: "فَاصْبِرْ عَلَىٰ مَا يَقُولُونَ وَسَبِّحْ بِحَمْدِ رَبِّكَ قَبْلَ طُلُوعِ الشَّمْسِ وَقَبْلَ غُرُوبِهَا",
    source: "سورة طه: 130",
    translation: "So be patient over what they say and exalt [Allah] with praise of your Lord before the rising of the sun and before its setting."
  },
  {
    text: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ",
    source: "سورة البقرة: 238",
    translation: "Maintain with care the [obligatory] prayers and [in particular] the middle prayer and stand before Allah, devoutly obedient."
  },
];

export function getDailyAyah() {
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return AYAH_LIST[dayOfYear % AYAH_LIST.length];
}
