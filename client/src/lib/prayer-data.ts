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

export const CITIES: City[] = [
  { nameEn: "Riyadh", nameAr: "الرياض", lat: 24.7136, lng: 46.6753 },
  { nameEn: "Jeddah", nameAr: "جدة", lat: 21.5433, lng: 39.1728 },
  { nameEn: "Mecca", nameAr: "مكة المكرمة", lat: 21.3891, lng: 39.8579 },
  { nameEn: "Medina", nameAr: "المدينة المنورة", lat: 24.5247, lng: 39.5692 },
  { nameEn: "Dammam", nameAr: "الدمام", lat: 26.4207, lng: 50.0888 },
];

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
