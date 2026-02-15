import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  PrayerTimes,
  Coordinates,
  CalculationMethod,
  Madhab,
} from "adhan";
// @ts-ignore
import tzlookup from "tz-lookup";
// @ts-ignore
import momentHijri from "moment-hijri";

const ARABIC_NAMES: Record<string, string> = {
  fajr: "الفجر",
  sunrise: "الشروق",
  dhuhr: "الظهر",
  asr: "العصر",
  maghrib: "المغرب",
  isha: "العشاء",
};

const PRAYER_ORDER = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const;
const FULL_PRAYER_ORDER = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"] as const;

const HIJRI_MONTHS_AR: Record<number, string> = {
  1: "محرم", 2: "صفر", 3: "ربيع الأول", 4: "ربيع الثاني",
  5: "جمادى الأولى", 6: "جمادى الآخرة", 7: "رجب", 8: "شعبان",
  9: "رمضان", 10: "شوال", 11: "ذو القعدة", 12: "ذو الحجة",
};

const HIJRI_MONTHS_EN: Record<number, string> = {
  1: "Muharram", 2: "Safar", 3: "Rabi al-Awwal", 4: "Rabi al-Thani",
  5: "Jumada al-Ula", 6: "Jumada al-Akhirah", 7: "Rajab", 8: "Sha'ban",
  9: "Ramadan", 10: "Shawwal", 11: "Dhul-Qi'dah", 12: "Dhul-Hijjah",
};

const FALLBACK = { lat: 24.7136, lng: 46.6753, city: "Riyadh" };

interface CacheEntry {
  data: any;
  expires: number;
}
const cache = new Map<string, CacheEntry>();
const CACHE_TTL_NEXT = 5 * 60 * 1000;
const CACHE_TTL_TIMES = 10 * 60 * 1000;

function cacheKey(lat: number, lng: number, lang: string): string {
  return `${lat.toFixed(2)}_${lng.toFixed(2)}_${lang}`;
}

function formatISO(date: Date, tz: string): string {
  const opts: Intl.DateTimeFormatOptions = {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const parts = new Intl.DateTimeFormat("en-CA", opts).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value || "00";
  const offsetMs = date.getTime() - new Date(
    new Date(date.toLocaleString("en-US", { timeZone: tz })).getTime()
  ).getTime();
  const now = new Date(date.toLocaleString("en-US", { timeZone: tz }));
  const utc = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const diffMin = Math.round((now.getTime() - utc.getTime()) / 60000);
  const sign = diffMin >= 0 ? "+" : "-";
  const absMin = Math.abs(diffMin);
  const oh = String(Math.floor(absMin / 60)).padStart(2, "0");
  const om = String(absMin % 60).padStart(2, "0");
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}${sign}${oh}:${om}`;
}

function computeNextPrayer(lat: number, lng: number, tz: string, lang: string) {
  const coords = new Coordinates(lat, lng);
  const params = CalculationMethod.UmmAlQura();
  params.madhab = Madhab.Shafi;

  const now = new Date();
  const today = new Date(now.toLocaleString("en-US", { timeZone: tz }));

  const todayPrayers = new PrayerTimes(coords, today, params);
  const times: { name: string; time: Date }[] = PRAYER_ORDER.map((p) => ({
    name: p,
    time: todayPrayers[p] as Date,
  }));

  for (const t of times) {
    if (t.time > now) {
      const displayName = lang === "ar" ? ARABIC_NAMES[t.name] : t.name.charAt(0).toUpperCase() + t.name.slice(1);
      return { name: displayName, timeISO: formatISO(t.time, tz) };
    }
  }

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowPrayers = new PrayerTimes(coords, tomorrow, params);
  const fajrTime = tomorrowPrayers.fajr;
  const displayName = lang === "ar" ? ARABIC_NAMES["fajr"] : "Fajr";
  return { name: displayName, timeISO: formatISO(fajrTime, tz) };
}

async function resolveLocation(
  queryLat: string | undefined,
  queryLng: string | undefined
): Promise<{ lat: number; lng: number; source: "gps" | "ip" | "fallback" }> {
  if (queryLat && queryLng) {
    const lat = parseFloat(queryLat);
    const lng = parseFloat(queryLng);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      return { lat, lng, source: "gps" };
    }
  }

  try {
    const res = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.latitude && data.longitude) {
        return {
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude),
          source: "ip",
        };
      }
    }
  } catch {}

  return { lat: FALLBACK.lat, lng: FALLBACK.lng, source: "fallback" };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/next-prayer", async (req: Request, res: Response) => {
    try {
      const lang = (req.query.lang as string) === "ar" ? "ar" : "en";
      const location = await resolveLocation(
        req.query.lat as string | undefined,
        req.query.lng as string | undefined
      );

      const key = cacheKey(location.lat, location.lng, lang);
      const cached = cache.get(key);
      if (cached && cached.expires > Date.now()) {
        return res.json(cached.data);
      }

      let tz: string;
      try {
        tz = tzlookup(location.lat, location.lng);
      } catch {
        tz = "Asia/Riyadh";
      }

      const nextPrayer = computeNextPrayer(location.lat, location.lng, tz, lang);

      const response = {
        tz,
        method: "UmmAlQura",
        location: {
          lat: Math.round(location.lat * 100) / 100,
          lng: Math.round(location.lng * 100) / 100,
          source: location.source,
        },
        nextPrayer,
      };

      cache.set(key, { data: response, expires: Date.now() + CACHE_TTL_NEXT });

      for (const [k, v] of cache.entries()) {
        if (v.expires < Date.now()) cache.delete(k);
      }

      res.json(response);
    } catch (err) {
      res.status(500).json({ error: "Failed to compute prayer time" });
    }
  });

  app.get("/api/prayer-times", async (req: Request, res: Response) => {
    try {
      const lang = (req.query.lang as string) === "ar" ? "ar" : "en";
      const dateParam = req.query.date as string | undefined;
      const location = await resolveLocation(
        req.query.lat as string | undefined,
        req.query.lng as string | undefined
      );

      const dateSuffix = dateParam || "today";
      const key = `times_${cacheKey(location.lat, location.lng, lang)}_${dateSuffix}`;
      const cached = cache.get(key);
      if (cached && cached.expires > Date.now()) {
        return res.json(cached.data);
      }

      let tz: string;
      try {
        tz = tzlookup(location.lat, location.lng);
      } catch {
        tz = "Asia/Riyadh";
      }

      const coords = new Coordinates(location.lat, location.lng);
      const params = CalculationMethod.UmmAlQura();
      params.madhab = Madhab.Shafi;

      let targetDate: Date;
      if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
        const [y, m, d] = dateParam.split("-").map(Number);
        targetDate = new Date(y, m - 1, d);
      } else {
        const now = new Date();
        targetDate = new Date(now.toLocaleString("en-US", { timeZone: tz }));
      }

      const prayerTimes = new PrayerTimes(coords, targetDate, params);

      const formatHHMM = (d: Date): string => {
        return new Intl.DateTimeFormat("en-GB", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(d);
      };

      const dateParts = new Intl.DateTimeFormat("en-CA", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(targetDate);

      const hijriMoment = dateParam
        ? momentHijri(dateParam, "YYYY-MM-DD")
        : momentHijri();
      const iDay = hijriMoment.iDate();
      const iMonth = hijriMoment.iMonth() + 1;
      const iYear = hijriMoment.iYear();
      const monthNames = lang === "ar" ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN;
      const hijri = `${iDay} ${monthNames[iMonth] || iMonth} ${iYear}`;

      let city = "";
      if (location.source === "fallback") {
        city = lang === "ar" ? "الرياض" : "Riyadh";
      } else if (location.source === "ip") {
        try {
          const geoRes = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(2000) });
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            city = geoData.city || "";
          }
        } catch {}
      } else {
        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json&accept-language=${lang}`,
            { signal: AbortSignal.timeout(3000), headers: { "User-Agent": "IslamTimeApp/1.0" } }
          );
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            city = geoData.address?.city || geoData.address?.town || geoData.address?.village || "";
          }
        } catch {}
      }

      const prayerTimeMap: Record<string, Date> = {
        fajr: prayerTimes.fajr,
        sunrise: prayerTimes.sunrise,
        dhuhr: prayerTimes.dhuhr,
        asr: prayerTimes.asr,
        maghrib: prayerTimes.maghrib,
        isha: prayerTimes.isha,
      };

      const prayers = FULL_PRAYER_ORDER.map((p) => ({
        key: p,
        name: lang === "ar" ? ARABIC_NAMES[p] : p.charAt(0).toUpperCase() + p.slice(1),
        time: formatHHMM(prayerTimeMap[p]),
      }));

      const response = {
        city,
        hijri,
        date: dateParts,
        tz,
        location: {
          lat: Math.round(location.lat * 100) / 100,
          lng: Math.round(location.lng * 100) / 100,
          source: location.source,
        },
        prayers,
      };

      cache.set(key, { data: response, expires: Date.now() + CACHE_TTL_TIMES });

      for (const [k, v] of cache.entries()) {
        if (v.expires < Date.now()) cache.delete(k);
      }

      res.json(response);
    } catch (err) {
      res.status(500).json({ error: "Failed to compute prayer times" });
    }
  });

  return httpServer;
}
