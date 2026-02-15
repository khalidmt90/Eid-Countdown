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
  hijriDate: string;
}

export const ISLAMIC_EVENTS: EidDate[] = [
  // 2025 — 1446 AH
  {
    year: 2025,
    name: "Ramadan",
    nameKey: "ramadan",
    date: "2025-02-28",
    hijriDate: "١ رمضان ١٤٤٦هـ",
  },
  {
    year: 2025,
    name: "Eid al-Fitr",
    nameKey: "eid_al_fitr",
    date: "2025-03-30",
    hijriDate: "١ شوال ١٤٤٦هـ",
  },
  {
    year: 2025,
    name: "Eid al-Adha",
    nameKey: "eid_al_adha",
    date: "2025-06-06",
    hijriDate: "١٠ ذو الحجة ١٤٤٦هـ",
  },
  // 2026 — 1447 AH
  {
    year: 2026,
    name: "Ramadan",
    nameKey: "ramadan",
    date: "2026-02-17",
    hijriDate: "١ رمضان ١٤٤٧هـ",
  },
  {
    year: 2026,
    name: "Eid al-Fitr",
    nameKey: "eid_al_fitr",
    date: "2026-03-20",
    hijriDate: "١ شوال ١٤٤٧هـ",
  },
  {
    year: 2026,
    name: "Eid al-Adha",
    nameKey: "eid_al_adha",
    date: "2026-05-27",
    hijriDate: "١٠ ذو الحجة ١٤٤٧هـ",
  },
];

function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function getNextEvent(): EidDate | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureEvents = ISLAMIC_EVENTS
    .filter(event => parseLocalDate(event.date) >= today)
    .sort((a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime());

  return futureEvents.length > 0 ? futureEvents[0] : null;
}

export function getFollowingEvent(afterDateStr: string): EidDate | null {
  const afterDate = parseLocalDate(afterDateStr);
  
  const futureEvents = ISLAMIC_EVENTS
    .filter(event => parseLocalDate(event.date) > afterDate)
    .sort((a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime());

  return futureEvents.length > 0 ? futureEvents[0] : null;
}

export function formatDate(dateStr: string, locale: string = 'ar-SA'): string {
  const date = parseLocalDate(dateStr);
  return new Intl.DateTimeFormat(locale, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
}

