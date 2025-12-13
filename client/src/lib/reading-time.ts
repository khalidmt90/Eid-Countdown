const ARABIC_WPM = 180;
const MIN_WORDS = 180;  // 1 minute minimum
const MAX_WORDS = 1260; // 7 minutes maximum

export function countWords(text: string): number {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function calculateReadingTime(text: string, wpm: number = ARABIC_WPM): number {
  const words = countWords(text);
  return Math.ceil(words / wpm);
}

export function isValidStoryLength(storyText: string): boolean {
  const words = countWords(storyText);
  return words >= MIN_WORDS && words <= MAX_WORDS;
}

export function getReadingTimeMinutes(storyText: string): number {
  return calculateReadingTime(storyText, ARABIC_WPM);
}

export function isStoryTooShort(storyText: string): boolean {
  return countWords(storyText) < MIN_WORDS;
}

export function isStoryTooLong(storyText: string): boolean {
  return countWords(storyText) > MAX_WORDS;
}

export { ARABIC_WPM, MIN_WORDS, MAX_WORDS };
