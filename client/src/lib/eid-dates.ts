/**
 * Eid Date Configuration
 * 
 * Note: These are astronomical estimates. Actual dates depend on moon sighting.
 * Users can update this list to adjust for their specific location or official announcements.
 */

export interface EidDate {
  year: number;
  name: "Eid al-Fitr" | "Eid al-Adha";
  nameAr: "عيد الفطر" | "عيد الأضحى";
  date: string; // ISO format YYYY-MM-DD
}

export const EID_DATES: EidDate[] = [
  // 2025
  {
    year: 2025,
    name: "Eid al-Fitr",
    nameAr: "عيد الفطر",
    date: "2025-03-30", // Estimate
  },
  {
    year: 2025,
    name: "Eid al-Adha",
    nameAr: "عيد الأضحى",
    date: "2025-06-06", // Estimate
  },
  // 2026
  {
    year: 2026,
    name: "Eid al-Fitr",
    nameAr: "عيد الفطر",
    date: "2026-03-20", // Estimate
  },
  {
    year: 2026,
    name: "Eid al-Adha",
    nameAr: "عيد الأضحى",
    date: "2026-05-27", // Estimate
  },
];

export function getNextEid(): EidDate | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureEids = EID_DATES
    .filter(eid => new Date(eid.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return futureEids.length > 0 ? futureEids[0] : null;
}

export function getFollowingEid(afterDateStr: string): EidDate | null {
  const afterDate = new Date(afterDateStr);
  
  const futureEids = EID_DATES
    .filter(eid => new Date(eid.date) > afterDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return futureEids.length > 0 ? futureEids[0] : null;
}

// Simple formatter for Arabic dates
export function formatArabicDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('ar-SA', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
}
