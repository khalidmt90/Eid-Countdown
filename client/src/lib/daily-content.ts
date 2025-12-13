import { DAILY_CONTENT_DATA } from "./daily-content-data";

export interface DailyContent {
  ayah: {
    text: string;
    surah: string;
    verseNumber: number;
    title: string;
    story: string;
    source: string;
    sourceUrl: string;
  };
  hadith: {
    text: string;
    narrator: string;
    title: string;
    story: string; // The context/story behind the hadith
    source: string;
    sourceUrl: string;
  };
  prophetStory: {
    title: string;
    prophet: string;
    story: string;
    quranReference?: string; // Verse text
    quranCitation?: string; // Surah name and verse number for the reference
    source: string;
    sourceUrl: string;
  };
}

// Re-export the data from the separate file
export const DAILY_CONTENT = DAILY_CONTENT_DATA;

export function getDailyContent(): DailyContent {
  // Use local storage to persist the "daily" content for the day
  // This ensures it doesn't change on refresh, but changes every 24h
  const todayStr = new Date().toDateString();
  const storedDate = localStorage.getItem('dailyContentDate');
  const storedIndex = localStorage.getItem('dailyContentIndex');

  if (storedDate === todayStr && storedIndex) {
    const index = parseInt(storedIndex, 10);
    // Ensure index is valid
    if (!isNaN(index) && index >= 0 && index < DAILY_CONTENT.length) {
      return DAILY_CONTENT[index];
    }
  }

  // If no valid stored content for today, pick a new random one
  const newIndex = Math.floor(Math.random() * DAILY_CONTENT.length);
  localStorage.setItem('dailyContentDate', todayStr);
  localStorage.setItem('dailyContentIndex', newIndex.toString());
  
  return DAILY_CONTENT[newIndex];
}

export function getRandomContent(): DailyContent {
  let randomIndex = Math.floor(Math.random() * DAILY_CONTENT.length);
  
  // Try to avoid the currently displayed one if possible (simple check)
  const storedIndex = localStorage.getItem('dailyContentIndex');
  if (storedIndex && DAILY_CONTENT.length > 1) {
    const currentIdx = parseInt(storedIndex, 10);
    // Simple retry once to get a different one
    if (randomIndex === currentIdx) {
       randomIndex = (randomIndex + 1) % DAILY_CONTENT.length;
    }
  }
  
  return DAILY_CONTENT[randomIndex];
}
