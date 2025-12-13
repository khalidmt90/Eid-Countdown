import { type DailyContent } from "./daily-content";

// A small pool of Ayahs for the daily home page feature
export interface AyahContent {
  text: string;
  source: string;
  translation: string;
}

export const DAILY_AYAHS: AyahContent[] = [
  {
    text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    source: "سورة الشرح: 5",
    translation: "For indeed, with hardship [will be] ease."
  },
  {
    text: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    source: "سورة البقرة: 286",
    translation: "Allah does not charge a soul except [with that within] its capacity."
  },
  {
    text: "وَرَبُّكَ الْغَنِيُّ ذُو الرَّحْمَةِ",
    source: "سورة الأنعام: 133",
    translation: "And your Lord is the Free of need, the possessor of mercy."
  },
  {
    text: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    source: "سورة طه: 114",
    translation: "And say, 'My Lord, increase me in knowledge.'"
  },
  {
    text: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
    source: "سورة البقرة: 45",
    translation: "And seek help through patience and prayer."
  }
];

export function getDailyAyah(): AyahContent {
  // Use local storage to persist the "daily" ayah for the day
  // This ensures it doesn't change on refresh, but changes every 24h
  const todayStr = new Date().toDateString();
  const storedDate = localStorage.getItem('dailyAyahDate');
  const storedIndex = localStorage.getItem('dailyAyahIndex');

  if (storedDate === todayStr && storedIndex) {
    const index = parseInt(storedIndex, 10);
    // Ensure index is valid
    if (!isNaN(index) && index >= 0 && index < DAILY_AYAHS.length) {
      return DAILY_AYAHS[index];
    }
  }

  // If no valid stored content for today, pick a new random one
  const newIndex = Math.floor(Math.random() * DAILY_AYAHS.length);
  localStorage.setItem('dailyAyahDate', todayStr);
  localStorage.setItem('dailyAyahIndex', newIndex.toString());
  
  return DAILY_AYAHS[newIndex];
}
