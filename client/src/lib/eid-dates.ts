/**
 * Eid & Ramadan Date Configuration
 * 
 * Note: These are astronomical estimates. Actual dates depend on moon sighting.
 */

export interface EidDate {
  year: number;
  name: "Ramadan" | "Eid al-Fitr" | "Eid al-Adha";
  nameKey: "ramadan" | "eid_al_fitr" | "eid_al_adha";
  date: string; // ISO format YYYY-MM-DD
}

export const ISLAMIC_EVENTS: EidDate[] = [
  // 2025
  {
    year: 2025,
    name: "Ramadan",
    nameKey: "ramadan",
    date: "2025-02-28", // Estimate
  },
  {
    year: 2025,
    name: "Eid al-Fitr",
    nameKey: "eid_al_fitr",
    date: "2025-03-30", // Estimate
  },
  {
    year: 2025,
    name: "Eid al-Adha",
    nameKey: "eid_al_adha",
    date: "2025-06-06", // Estimate
  },
  // 2026
  {
    year: 2026,
    name: "Ramadan",
    nameKey: "ramadan",
    date: "2026-02-17", // Estimate
  },
  {
    year: 2026,
    name: "Eid al-Fitr",
    nameKey: "eid_al_fitr",
    date: "2026-03-20", // Estimate
  },
  {
    year: 2026,
    name: "Eid al-Adha",
    nameKey: "eid_al_adha",
    date: "2026-05-27", // Estimate
  },
];

export function getNextEvent(): EidDate | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureEvents = ISLAMIC_EVENTS
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return futureEvents.length > 0 ? futureEvents[0] : null;
}

export function getFollowingEvent(afterDateStr: string): EidDate | null {
  const afterDate = new Date(afterDateStr);
  
  const futureEvents = ISLAMIC_EVENTS
    .filter(event => new Date(event.date) > afterDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return futureEvents.length > 0 ? futureEvents[0] : null;
}

// Simple formatter for dates based on locale
export function formatDate(dateStr: string, locale: string = 'ar-SA'): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat(locale, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
}
