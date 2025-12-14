import { DAILY_CONTENT_DATA } from "./daily-content-data";
import { isValidStoryLength, getReadingTimeMinutes } from "./reading-time";

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
  readingTime?: number;
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

function addReadingTime(item: ContentItem): ContentItem {
  return {
    ...item,
    readingTime: getReadingTimeMinutes(item.story)
  };
}

function isValidContent(bundle: DailyContentBundle): boolean {
  return (
    isValidStoryLength(bundle.ayah.story) &&
    isValidStoryLength(bundle.hadith.story) &&
    isValidStoryLength(bundle.prophetStory.story)
  );
}

function getValidContentIndices(lang: string): number[] {
  const validIndices: number[] = [];
  
  for (let i = 0; i < DAILY_CONTENT.length; i++) {
    const content = DAILY_CONTENT[i];
    const bundle = content.locales[lang] || content.locales['en'] || content.locales['ar'];
    
    if (bundle && isValidContent(bundle)) {
      validIndices.push(i);
    }
  }
  
  return validIndices;
}

function enrichBundle(bundle: DailyContentBundle): DailyContentBundle {
  return {
    ayah: addReadingTime(bundle.ayah),
    hadith: addReadingTime(bundle.hadith),
    prophetStory: addReadingTime(bundle.prophetStory)
  };
}

export function getDailyContent(lang: string = 'ar'): DailyContentBundle {
  const todayStr = new Date().toDateString();
  const storedDate = localStorage.getItem('dailyContentDate');
  const storedIndex = localStorage.getItem('dailyContentIndex');
  
  const validIndices = getValidContentIndices(lang);
  
  if (validIndices.length === 0) {
    const fallbackContent = DAILY_CONTENT[0];
    const bundle = fallbackContent.locales[lang] || fallbackContent.locales['en'] || fallbackContent.locales['ar'];
    return enrichBundle(bundle);
  }
  
  let index = validIndices[0];

  if (storedDate === todayStr && storedIndex) {
    const parsedIndex = parseInt(storedIndex, 10);
    if (!isNaN(parsedIndex) && validIndices.includes(parsedIndex)) {
      index = parsedIndex;
    }
  } else {
    const randomValidIndex = validIndices[Math.floor(Math.random() * validIndices.length)];
    index = randomValidIndex;
    localStorage.setItem('dailyContentDate', todayStr);
    localStorage.setItem('dailyContentIndex', index.toString());
  }
  
  const content = DAILY_CONTENT[index];
  const bundle = content.locales[lang] || content.locales['en'] || content.locales['ar'];
  return enrichBundle(bundle);
}

export function getCurrentContentIndex(): number | null {
  const storedIndex = localStorage.getItem('dailyContentIndex');
  if (storedIndex) {
    const index = parseInt(storedIndex, 10);
    return isNaN(index) ? null : index;
  }
  return null;
}

export function getRandomContent(lang: string = 'ar', excludeIndex?: number): DailyContentBundle {
  const validIndices = getValidContentIndices(lang);
  
  if (validIndices.length === 0) {
    const fallbackContent = DAILY_CONTENT[0];
    const bundle = fallbackContent.locales[lang] || fallbackContent.locales['en'] || fallbackContent.locales['ar'];
    return enrichBundle(bundle);
  }
  
  let availableIndices = validIndices;
  
  if (excludeIndex !== undefined && validIndices.length > 1) {
    availableIndices = validIndices.filter(i => i !== excludeIndex);
  }
  
  const randomValidIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  
  localStorage.setItem('dailyContentIndex', randomValidIndex.toString());
  
  const content = DAILY_CONTENT[randomValidIndex];
  const bundle = content.locales[lang] || content.locales['en'] || content.locales['ar'];
  return enrichBundle(bundle);
}
