import { DAILY_CONTENT_DATA } from "./daily-content-data";

export interface ContentItem {
  text?: string;
  surah?: string;
  verseNumber?: number;
  narrator?: string;
  prophet?: string;
  title: string;
  story: string;
  quranReference?: string;
  quranCitation?: string;
  source: string;
  sourceUrl: string;
}

export interface DailyContentBundle {
  ayah: ContentItem;
  hadith: ContentItem;
  prophetStory: ContentItem;
}

export interface DailyContent {
  id: string;
  locales: {
    [key: string]: DailyContentBundle;
  };
}

// Re-export the data from the separate file
export const DAILY_CONTENT = DAILY_CONTENT_DATA;

export function getDailyContent(lang: string = 'ar'): DailyContentBundle {
  // Use local storage to persist the "daily" content for the day
  const todayStr = new Date().toDateString();
  const storedDate = localStorage.getItem('dailyContentDate');
  const storedIndex = localStorage.getItem('dailyContentIndex');
  
  let index = 0;

  if (storedDate === todayStr && storedIndex) {
    const parsedIndex = parseInt(storedIndex, 10);
    if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < DAILY_CONTENT.length) {
      index = parsedIndex;
    }
  } else {
    // If no valid stored content for today, pick a new random one
    index = Math.floor(Math.random() * DAILY_CONTENT.length);
    localStorage.setItem('dailyContentDate', todayStr);
    localStorage.setItem('dailyContentIndex', index.toString());
  }
  
  const content = DAILY_CONTENT[index];
  // Return requested language or fallback to English, then Arabic
  return content.locales[lang] || content.locales['en'] || content.locales['ar'];
}

export function getRandomContent(lang: string = 'ar'): DailyContentBundle {
  let randomIndex = Math.floor(Math.random() * DAILY_CONTENT.length);
  
  // Try to avoid the currently displayed one if possible
  const storedIndex = localStorage.getItem('dailyContentIndex');
  if (storedIndex && DAILY_CONTENT.length > 1) {
    const currentIdx = parseInt(storedIndex, 10);
    if (randomIndex === currentIdx) {
       randomIndex = (randomIndex + 1) % DAILY_CONTENT.length;
    }
  }
  
  const content = DAILY_CONTENT[randomIndex];
  return content.locales[lang] || content.locales['en'] || content.locales['ar'];
}
