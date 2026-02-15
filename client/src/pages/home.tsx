import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { getNextEvent, getFollowingEvent, formatDate, type EidDate } from "@/lib/eid-dates";
import { CountdownTimer } from "@/components/countdown-timer";
import { StoriesView } from "@/components/stories-view";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Moon, Calendar, Info, Clock, BookOpen, Compass, Globe, MapPin, ChevronDown, ChevronUp, Sunrise, Sun, Sunset, Share2, X } from "lucide-react";
import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QiblahFinder } from "@/components/qiblah-finder";
import { QuranKhatm } from "@/components/quran-khatm";
import { usePrayerTimes } from "@/hooks/use-prayer-times";
import { LocationSheet } from "@/components/location-sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import "@/lib/i18n";
const DuaPage = lazy(() => import("@/pages/dua"));

const ROUTE_TO_TAB: Record<string, string> = {
  "/": "home",
  "/prayer-times": "home",
  "/qiblah": "qiblah",
  "/daily-content": "daily",
  "/quran-khatm": "khatm",
  "/dua": "dua",
};

const TAB_TO_ROUTE: Record<string, string> = {
  home: "/prayer-times",
  qiblah: "/qiblah",
  daily: "/daily-content",
  khatm: "/quran-khatm",
  dua: "/dua",
};

interface PageSeo {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

const PAGE_SEO: Record<string, PageSeo> = {
  home: {
    title: "Prayer Times - Accurate Daily Salah Schedule",
    titleAr: "مواقيت الصلاة - جدول الصلاة اليومي الدقيق",
    description: "Get accurate prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha based on your location. Eid countdown and Islamic calendar included.",
    descriptionAr: "احصل على مواقيت صلاة دقيقة للفجر والظهر والعصر والمغرب والعشاء حسب موقعك. يشمل العد التنازلي للعيد والتقويم الهجري.",
  },
  qiblah: {
    title: "Qiblah Finder - Accurate Kaaba Direction Compass",
    titleAr: "اتجاه القبلة - بوصلة دقيقة لتحديد اتجاه الكعبة",
    description: "Find the accurate Qiblah direction from your location using GPS and compass. Point towards Mecca for prayer easily.",
    descriptionAr: "حدد اتجاه القبلة الدقيق من موقعك باستخدام GPS والبوصلة. توجه نحو مكة المكرمة للصلاة بسهولة.",
  },
  daily: {
    title: "Daily Islamic Content - Quran Verses, Hadiths & Prophet Stories",
    titleAr: "المحتوى الإسلامي اليومي - آيات قرآنية وأحاديث وقصص الأنبياء",
    description: "Read daily Quran verses with tafsir, authentic Hadiths from Sahih Bukhari and Muslim, and inspiring Prophet stories from reliable sources.",
    descriptionAr: "اقرأ آيات قرآنية يومية مع التفسير، وأحاديث صحيحة من البخاري ومسلم، وقصص ملهمة من سيرة الأنبياء من مصادر موثوقة.",
  },
  khatm: {
    title: "Quran Khatm Tracker - Complete Quran Reading in Ramadan",
    titleAr: "ختم القرآن - متابعة قراءة القرآن الكريم في رمضان",
    description: "Track your Quran reading progress during Ramadan. Read one Juz per day with full Uthmani text, search, and bookmarking.",
    descriptionAr: "تابع تقدمك في قراءة القرآن خلال رمضان. اقرأ جزءاً يومياً بالنص العثماني الكامل مع البحث والعلامات المرجعية.",
  },
  dua: {
    title: "Duas & Adhkar - Hisn Al-Muslim",
    titleAr: "الأدعية والأذكار - حصن المسلم",
    description: "Authentic duas and adhkar from Hisn Al-Muslim with proper source attribution from Sahih Bukhari and Muslim.",
    descriptionAr: "أدعية وأذكار صحيحة من حصن المسلم مع ذكر المصادر من صحيح البخاري ومسلم.",
  },
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const dateLocale = (() => {
    const lang = i18n.language;
    const map: Record<string, string> = { ar: 'ar-SA', fa: 'fa-IR', ur: 'ur-PK', bn: 'bn-BD', id: 'id-ID', tr: 'tr-TR', fr: 'fr-FR', ru: 'ru-RU', es: 'es-ES' };
    return map[lang] || 'en-US';
  })();
  const [location, setLocation] = useLocation();

  const activeTab = ROUTE_TO_TAB[location] || "home";

  useEffect(() => {
    if (location === "/") {
      setLocation("/prayer-times", { replace: true });
    }
  }, [location, setLocation]);

  const handleTabChange = useCallback((value: string) => {
    const route = TAB_TO_ROUTE[value] || "/prayer-times";
    setLocation(route);
  }, [setLocation]);

  useEffect(() => {
    const seo = PAGE_SEO[activeTab] || PAGE_SEO.home;
    const isAr = i18n.language === "ar";
    document.title = isAr ? seo.titleAr : seo.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", isAr ? seo.descriptionAr : seo.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", isAr ? seo.titleAr : seo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", isAr ? seo.descriptionAr : seo.description);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", isAr ? seo.titleAr : seo.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", isAr ? seo.descriptionAr : seo.description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + (TAB_TO_ROUTE[activeTab] || "/prayer-times");
  }, [activeTab, i18n.language]);
  
  // Eid Events State
  const [nextEvent, setNextEvent] = useState<EidDate | null>(null);
  const [followingEvent, setFollowingEvent] = useState<EidDate | null>(null);

  // Prayer Times Hook
  const {
    loading,
    prayerData,
    selectedCountry,
    selectedCity,
    usingExactLocation,
    locationSelected,
    nextPrayer,
    timeRemaining,
    dailyAyah,
    isRamadan,
    handleCountryChange,
    handleCityChange,
    handleUseCurrentLocation,
    setUsingExactLocation,
    formatTimeRemaining
  } = usePrayerTimes();

  // Location Sheet State - open automatically if no location saved
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
  
  // Auto-open location sheet on first visit if no location saved
  useEffect(() => {
    if (!locationSelected) {
      setIsLocationSheetOpen(true);
    }
  }, [locationSelected]);

  const pillContainerRef = useRef<HTMLDivElement>(null);
  const [showFadeLeft, setShowFadeLeft] = useState(false);
  const [showFadeRight, setShowFadeRight] = useState(true);

  const updateFades = useCallback(() => {
    const el = pillContainerRef.current;
    if (!el) return;
    const isRtl = i18n.dir() === 'rtl';
    if (isRtl) {
      setShowFadeRight(el.scrollLeft < -1);
      setShowFadeLeft(el.scrollLeft > -(el.scrollWidth - el.clientWidth - 1));
    } else {
      setShowFadeLeft(el.scrollLeft > 1);
      setShowFadeRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  }, [i18n]);

  useEffect(() => {
    const el = pillContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateFades, { passive: true });
    updateFades();
    return () => el.removeEventListener('scroll', updateFades);
  }, [updateFades]);

  useEffect(() => {
    if (!pillContainerRef.current) return;
    const container = pillContainerRef.current;
    const tabMap: Record<string, string> = { home: 'tab-prayer-times', qiblah: 'tab-qiblah', khatm: 'tab-quran-khatm', dua: 'tab-dua', daily: 'tab-daily-content' };
    const active = container.querySelector(`[data-testid="${tabMap[activeTab]}"]`) as HTMLElement | null;
    if (active) {
      try {
        active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } catch {
        const scrollLeft = active.offsetLeft - container.offsetWidth / 2 + active.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
    requestAnimationFrame(updateFades);
  }, [activeTab, updateFades]);

  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('12');
  const [shareHidden, setShareHidden] = useState(false);
  const [ramadanScheduleOpen, setRamadanScheduleOpen] = useState(false);
  const [weekSchedule, setWeekSchedule] = useState<Array<{date: string; dayName: string; fajr: string; maghrib: string}>>([]);

  useEffect(() => {
    if (!isRamadan || !selectedCity) return;
    setRamadanScheduleOpen(true);

    const lat = usingExactLocation && selectedCity ? selectedCity.lat : selectedCity.lat;
    const lng = usingExactLocation && selectedCity ? selectedCity.lng : selectedCity.lng;
    const cacheKey = `ramadan7_${selectedCity.nameEn}_${new Date().toDateString()}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try { setWeekSchedule(JSON.parse(cached)); return; } catch {}
    }

    const today = new Date();
    const days: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      days.push(`${y}-${m}-${dd}`);
    }

    Promise.all(
      days.map(date =>
        fetch(`https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lng}&method=4`)
          .then(r => r.json())
          .then(data => {
            if (data.code === 200) {
              const t = data.data.timings;
              const dateObj = new Date(date + 'T12:00:00');
              const dayName = new Intl.DateTimeFormat(dateLocale, { weekday: 'short' }).format(dateObj);
              const shortDate = new Intl.DateTimeFormat(dateLocale, { day: 'numeric', month: 'short' }).format(dateObj);
              return { date: shortDate, dayName, fajr: t.Fajr?.split(' ')[0] || '', maghrib: t.Maghrib?.split(' ')[0] || '' };
            }
            return null;
          })
          .catch(() => null)
      )
    ).then(results => {
      const valid = results.filter(Boolean) as Array<{date: string; dayName: string; fajr: string; maghrib: string}>;
      setWeekSchedule(valid);
      try { localStorage.setItem(cacheKey, JSON.stringify(valid)); } catch {}
    });
  }, [isRamadan, selectedCity, usingExactLocation, i18n.language]);

  const toggleTimeFormat = () => {
    setTimeFormat(prev => prev === '12' ? '24' : '12');
  };

  const formatTime = (time: string) => {
    if (!time) return "--:--";
    
    // Remove any timezone info or seconds
    const timeOnly = time.replace(/\s*\(.*\)$/, '').split(' ')[0];
    const [hoursStr, minutesStr] = timeOnly.split(':');
    
    if (!hoursStr || !minutesStr) return time;

    if (timeFormat === '24') {
      return `${hoursStr.padStart(2, '0')}:${minutesStr.padStart(2, '0')}`;
    }
    
    const hours = parseInt(hoursStr, 10);
    const suffix = hours >= 12 ? 'pm' : 'am';
    const h = hours % 12 || 12;
    return `${h}:${minutesStr} ${suffix}`;
  };

  // Set page direction based on language
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const next = getNextEvent();
    setNextEvent(next);
    if (next) {
      setFollowingEvent(getFollowingEvent(next.date));
    }
  }, []);

  const handleCelebration = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const { hours, minutes, seconds } = formatTimeRemaining(timeRemaining);

  const prayerIcons: Record<string, any> = {
    Fajr: Moon,
    Sunrise: Sunrise,
    Dhuhr: Sun,
    Asr: Sun,
    Maghrib: Sunset,
    Isha: Moon
  };

  const handleShare = () => {
    if (!prayerData || !nextPrayer) return;
    
    const cityName = i18n.language === 'ar' ? selectedCity.nameAr : selectedCity.nameEn;
    const countryName = i18n.language === 'ar' ? selectedCountry.nameAr : selectedCountry.nameEn;
    const prayerName = t(nextPrayer.name.toLowerCase());

    const text = `
🕌 ${t('prayer_times_in')} ${cityName}, ${countryName}
📅 ${prayerData.date.hijri.date} ${prayerData.date.hijri.month.ar} ${prayerData.date.hijri.year}

${t('fajr')}: ${prayerData.timings.Fajr}
${t('sunrise')}: ${prayerData.timings.Sunrise}
${t('dhuhr')}: ${prayerData.timings.Dhuhr}
${t('asr')}: ${prayerData.timings.Asr}
${t('maghrib')}: ${prayerData.timings.Maghrib}
${t('isha')}: ${prayerData.timings.Isha}

⏳ ${t('next_prayer')}: ${prayerName}
`;
    
    if (navigator.share) {
      navigator.share({
        title: t('prayer_times'),
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert(t('copied'));
    }
  };

  if (!nextEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-xl font-bold animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        {/* Sticky Header + Tabs */}
        <header className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ background: '#0B1324' }}>
          {/* Layer 1: App Identity */}
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between" style={{ paddingTop: '14px', paddingBottom: '6px' }}>
            <Select onValueChange={changeLanguage} defaultValue={i18n.language}>
              <SelectTrigger className="w-10 h-10 p-0 bg-transparent border-none shadow-none hover:bg-white/[0.06] rounded-xl flex items-center justify-center" data-testid="select-language">
                <Globe className="w-5 h-5 text-[#9FB3C8]" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ur">اردو</SelectItem>
                <SelectItem value="fa">فارسی</SelectItem>
                <SelectItem value="id">Indonesia</SelectItem>
                <SelectItem value="tr">Türkçe</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="bn">বাংলা</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-col items-center">
              <span className="text-white font-serif leading-tight" style={{ fontSize: '18px', fontWeight: 600 }}>
                {t('page_prayer_times')}
              </span>
              {prayerData && (
                <span className="mt-0.5" style={{ fontSize: '12px', color: '#8FA3BF' }}>
                  {prayerData.date.hijri.day} {prayerData.date.hijri.month.ar} {prayerData.date.hijri.year}هـ
                  {' · '}
                  {new Intl.DateTimeFormat(dateLocale, { day: 'numeric', month: 'short' }).format(new Date())}
                </span>
              )}
            </div>

            <div className="w-10" />
          </div>

          {/* Layer 2: Navigation Pills */}
          <nav className="relative" style={{ marginTop: '8px', marginBottom: '12px' }}>
            <style>{`[data-testid="tabs-nav"]::-webkit-scrollbar { display: none; }`}</style>
            {showFadeLeft && (
              <div
                className="absolute top-0 bottom-0 z-10 pointer-events-none"
                style={{
                  ...(i18n.dir() === 'rtl' ? { right: 0 } : { left: 0 }),
                  width: '28px',
                  background: i18n.dir() === 'rtl'
                    ? 'linear-gradient(to left, transparent, #0B1324)'
                    : 'linear-gradient(to right, #0B1324, transparent)',
                }}
              />
            )}
            {showFadeRight && (
              <div
                className="absolute top-0 bottom-0 z-10 pointer-events-none"
                style={{
                  ...(i18n.dir() === 'rtl' ? { left: 0 } : { right: 0 }),
                  width: '28px',
                  background: i18n.dir() === 'rtl'
                    ? 'linear-gradient(to right, transparent, #0B1324)'
                    : 'linear-gradient(to left, transparent, #0B1324)',
                }}
              />
            )}
            <div
              ref={pillContainerRef}
              className="flex items-center overflow-x-auto overflow-y-hidden"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                height: '60px',
                whiteSpace: 'nowrap',
                gap: '10px',
                paddingInline: '12px',
                scrollSnapType: 'x proximity',
              }}
              data-testid="tabs-nav"
            >
              {([
                { value: 'home', i18nKey: 'nav_prayer_times', testId: 'tab-prayer-times' },
                { value: 'qiblah', i18nKey: 'nav_qiblah', testId: 'tab-qiblah' },
                { value: 'khatm', i18nKey: 'nav_quran', testId: 'tab-quran-khatm' },
                { value: 'dua', i18nKey: 'nav_duas', testId: 'tab-dua' },
                { value: 'daily', i18nKey: 'nav_stories', testId: 'tab-daily-content' },
              ] as const).map((tab) => {
                const isActive = activeTab === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => handleTabChange(tab.value)}
                    className="whitespace-nowrap transition-all duration-200 active:scale-95"
                    style={{
                      minWidth: '92px',
                      flexShrink: 0,
                      height: '56px',
                      padding: '0 20px',
                      borderRadius: '14px',
                      fontSize: '17px',
                      fontWeight: 700,
                      lineHeight: 'normal',
                      scrollSnapAlign: 'center',
                      ...(isActive
                        ? { background: 'linear-gradient(135deg, #0D6EFD, #1E88FF)', color: '#FFFFFF', border: '1px solid transparent' }
                        : { background: '#101A2E', color: '#9FB3C8', border: '1px solid rgba(42, 60, 99, 0.55)' }),
                    }}
                    data-testid={tab.testId}
                  >
                    {t(tab.i18nKey)}
                  </button>
                );
              })}
            </div>
          </nav>
        </header>

        {/* Page Section Title */}
        <div className="max-w-7xl mx-auto px-4 pb-1" dir="rtl" style={{ paddingTop: '12px', marginBottom: '8px' }}>
          <h2
            className="text-[22px] font-black text-foreground text-right"
            data-testid="text-page-title"
          >
            {activeTab === 'home' && t('page_prayer_times')}
            {activeTab === 'qiblah' && t('page_qiblah')}
            {activeTab === 'khatm' && t('page_quran')}
            {activeTab === 'dua' && t('page_duas')}
            {activeTab === 'daily' && t('page_stories')}
          </h2>
        </div>

        {/* Main Content */}
        <main className="px-4 pb-4 pt-2 max-w-7xl mx-auto">
          <TabsContent value="home" className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-0">
            
            {/* HERO: Next Prayer Countdown with Location & Time Format */}
            {nextPrayer && (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-4xl mx-auto"
              >
                <Card className={cn(
                  "overflow-hidden border-2 shadow-lg relative",
                  isRamadan ? "border-primary/50 shadow-primary/20" :
                  nextPrayer.name === 'Fajr' ? "border-primary/50 shadow-primary/20" : 
                  nextPrayer.name === 'Maghrib' ? "border-secondary/50 shadow-secondary/20" : 
                  "border-border"
                )}>
                  <div className={cn(
                    "absolute top-0 inset-x-0 h-1.5",
                    isRamadan ? "bg-primary" :
                    nextPrayer.name === 'Fajr' ? "bg-primary" : 
                    nextPrayer.name === 'Maghrib' ? "bg-secondary" : 
                    "bg-muted-foreground"
                  )} />
                  
                  <CardContent className="flex flex-col items-center justify-center pt-3 pb-6 md:py-10 bg-gradient-to-b from-card to-background">
                    {/* Location & Time Format inside card */}
                    <div className="flex items-center justify-between w-full px-1 mb-4">
                      <div 
                        onClick={() => setIsLocationSheetOpen(true)}
                        className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
                        data-testid="button-location"
                      >
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="font-bold text-[13px] text-foreground">
                          {i18n.language === 'ar' ? selectedCity.nameAr : selectedCity.nameEn}
                        </span>
                        <ChevronDown className="w-3 h-3 text-muted-foreground/50" />
                      </div>
                      <button
                        onClick={toggleTimeFormat}
                        className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                        data-testid="button-time-format"
                      >
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[13px] font-bold text-foreground">{timeFormat === '12' ? '12H' : '24H'}</span>
                      </button>
                    </div>

                    {(() => {
                      const isPrayerNow = timeRemaining <= 0 || (hours === 0 && minutes < 1);
                      return isPrayerNow ? (
                        <div className="flex flex-col items-center gap-3 py-4">
                          <div className="text-4xl">🕌</div>
                          <div className="text-2xl font-black text-primary animate-pulse">
                            {t('prayer_time_now')}
                          </div>
                          <div className="text-lg font-bold text-muted-foreground">
                            {t(nextPrayer.name.toLowerCase())}
                          </div>
                        </div>
                      ) : (
                        <>
                          <span className="text-sm md:text-base font-bold text-muted-foreground uppercase tracking-wider mb-2">
                            {isRamadan && nextPrayer.name === "__iftar__"
                              ? t('time_until_iftar')
                              : isRamadan && nextPrayer.name === "__imsak__"
                              ? t('time_until_imsak')
                              : `${t('remaining_to')} ${t(nextPrayer.name.toLowerCase())}`}
                          </span>
                          
                          <div className="flex items-baseline justify-center gap-1 md:gap-2 mb-4" dir="ltr">
                            <div className="flex flex-col items-center">
                              <span className="text-5xl md:text-8xl font-black font-mono tracking-tighter text-foreground leading-none">
                                {String(hours).padStart(2, '0')}
                              </span>
                              <span className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">{t('hours')}</span>
                            </div>
                            <span className="text-3xl md:text-6xl font-black text-muted-foreground/30 -translate-y-4">:</span>
                            <div className="flex flex-col items-center">
                              <span className="text-5xl md:text-8xl font-black font-mono tracking-tighter text-foreground leading-none">
                                {String(minutes).padStart(2, '0')}
                              </span>
                              <span className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">{t('minutes')}</span>
                            </div>
                            <span className="text-3xl md:text-6xl font-black text-muted-foreground/30 -translate-y-4">:</span>
                            <div className="flex flex-col items-center">
                              <span className="text-5xl md:text-8xl font-black font-mono tracking-tighter text-primary leading-none">
                                {String(seconds).padStart(2, '0')}
                              </span>
                              <span className="text-[10px] md:text-xs font-bold text-primary/60 uppercase tracking-widest mt-1">{t('seconds')}</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}

                    {!isRamadan && (
                      <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 px-4 py-1.5 rounded-full">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{t('next_prayer')}: {formatTime(nextPrayer.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}))}</span>
                      </div>
                    )}

                    {isRamadan && prayerData && (
                      <div className="flex items-center gap-4 text-sm font-bold bg-muted/50 px-5 py-2 rounded-full mt-1" dir="rtl">
                        <div className="flex items-center gap-1.5">
                          <Moon className="w-3.5 h-3.5 text-primary/70" />
                          <span className="text-muted-foreground">{t('imsak_label')}</span>
                          <span className="text-foreground">{formatTime(prayerData.timings.Fajr)}</span>
                        </div>
                        <span className="text-muted-foreground/30">|</span>
                        <div className="flex items-center gap-1.5">
                          <Sunset className="w-3.5 h-3.5 text-primary/70" />
                          <span className="text-muted-foreground">{t('iftar_label')}</span>
                          <span className="text-foreground">{formatTime(prayerData.timings.Maghrib)}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Prayer Times Grid - Compact */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {prayerData && Object.entries(prayerData.timings)
                  .filter(([key]) => ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(key))
                  .map(([name, time]) => {
                    const Icon = prayerIcons[name] || Clock;
                    const isNext = isRamadan
                      ? (nextPrayer?.name === "__iftar__" && name === "Maghrib") || (nextPrayer?.name === "__imsak__" && name === "Fajr")
                      : nextPrayer?.name === name;
                    
                    return (
                      <div key={name} className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-2xl border cursor-default",
                        isNext 
                          ? "bg-primary text-primary-foreground border-primary shadow-md z-10" 
                          : "bg-card text-foreground border-border"
                      )}>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={cn("w-5 h-5", isNext ? "text-primary-foreground" : "text-muted-foreground")} />
                          <span className={cn("text-lg font-bold opacity-90", isNext ? "text-primary-foreground" : "text-foreground")}>
                            {t(name.toLowerCase())}
                          </span>
                        </div>
                        <span className="text-3xl font-black font-mono tracking-tight">{formatTime(time)}</span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Ramadan 7-Day Schedule */}
            {isRamadan && weekSchedule.length > 0 && (
              <section className="w-full max-w-4xl mx-auto" data-testid="section-ramadan-schedule">
                <button
                  onClick={() => setRamadanScheduleOpen(!ramadanScheduleOpen)}
                  className="flex items-center justify-between w-full mb-3 group"
                  data-testid="button-toggle-ramadan-schedule"
                >
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-muted-foreground">
                      {t('ramadan_next_7')}
                    </h3>
                  </div>
                  {ramadanScheduleOpen ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>

                {ramadanScheduleOpen && (
                  <>
                    {/* Desktop: compact table */}
                    <div className="hidden md:block bg-card border border-border rounded-2xl overflow-hidden">
                      <table className="w-full text-sm" dir="rtl">
                        <thead>
                          <tr className="border-b border-border bg-muted/50">
                            <th className="py-3 px-4 text-start font-bold text-muted-foreground">{t('table_day')}</th>
                            <th className="py-3 px-4 text-start font-bold text-muted-foreground">{t('table_date')}</th>
                            <th className="py-3 px-4 text-center font-bold text-muted-foreground">{t('imsak_fajr')}</th>
                            <th className="py-3 px-4 text-center font-bold text-muted-foreground">{t('iftar_maghrib')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {weekSchedule.map((day, idx) => (
                            <tr key={idx} className={cn("border-b border-border/50 last:border-0", idx === 0 ? "bg-primary/5" : "")}>
                              <td className="py-3 px-4 font-bold text-foreground">{day.dayName}</td>
                              <td className="py-3 px-4 text-muted-foreground">{day.date}</td>
                              <td className="py-3 px-4 text-center font-mono font-bold text-foreground">{formatTime(day.fajr)}</td>
                              <td className="py-3 px-4 text-center font-mono font-bold text-foreground">{formatTime(day.maghrib)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile: horizontal scroll cards */}
                    <div className="md:hidden flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }} dir="rtl">
                      {weekSchedule.map((day, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "shrink-0 w-[130px] bg-card border rounded-2xl p-3 space-y-2 text-center",
                            idx === 0 ? "border-primary/50 bg-primary/5" : "border-border"
                          )}
                        >
                          <div className="text-xs font-bold text-primary">{day.dayName}</div>
                          <div className="text-[11px] text-muted-foreground">{day.date}</div>
                          <div className="space-y-1 pt-1 border-t border-border/50">
                            <div>
                              <span className="text-[10px] text-muted-foreground block">{t('imsak')}</span>
                              <span className="text-sm font-black font-mono text-foreground">{formatTime(day.fajr)}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-muted-foreground block">{t('iftar')}</span>
                              <span className="text-sm font-black font-mono text-foreground">{formatTime(day.maghrib)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </section>
            )}

            {/* Secondary: Eid Countdown */}
             <section className="w-full max-w-4xl mx-auto">
               <div className="flex items-center gap-2 mb-3">
                 <Calendar className="w-4 h-4 text-muted-foreground" />
                 <h3 className="text-sm font-bold text-muted-foreground">{t('upcoming_events')}</h3>
               </div>
               
               <div className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                 <div className="text-center md:text-start">
                   <h4 className="text-lg font-black text-foreground">{t(nextEvent.nameKey)}</h4>
                   <p className="text-sm text-muted-foreground font-medium">{formatDate(nextEvent.date, dateLocale)}</p>
                   <p className="text-xs text-primary/70 font-bold mt-0.5">{nextEvent.hijriDate}</p>
                 </div>
                 
                 <div className="w-full md:w-auto">
                    <CountdownTimer targetDate={nextEvent.date} className="gap-2" />
                 </div>
               </div>
             </section>

            {/* Quick Services */}
            <section className="w-full max-w-4xl mx-auto" dir="rtl">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-bold text-muted-foreground">
                  {t('quick_services')}
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: t('holy_quran'), tab: 'khatm', icon: '📖', color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' },
                  { label: t('nav_duas'), tab: 'dua', icon: '🤲', color: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400' },
                  { label: t('nav_qiblah'), tab: 'qiblah', icon: '🧭', color: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400' },
                  { label: t('nav_stories'), tab: 'daily', icon: '📚', color: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400' },
                ].map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleTabChange(item.tab)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all hover:scale-[1.02] active:scale-95",
                      item.color
                    )}
                    data-testid={`service-card-${item.tab}`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-black">{item.label}</span>
                  </button>
                ))}
              </div>
            </section>

          </TabsContent>

          <TabsContent value="qiblah" className="mt-0">
            <QiblahFinder />
          </TabsContent>

          <TabsContent value="daily" className="mt-0">
            <StoriesView />
          </TabsContent>

          <TabsContent value="khatm" className="mt-0">
            <QuranKhatm />
          </TabsContent>

          <TabsContent value="dua" className="mt-0">
            <Suspense fallback={<div className="py-12 text-center text-muted-foreground animate-pulse font-bold">{t('loading')}</div>}>
              <DuaPage />
            </Suspense>
          </TabsContent>
        </main>

      </Tabs>

      {/* Footer */}
      <footer className="py-5 text-center text-muted-foreground text-xs relative z-10 border-t border-border/50 bg-card/50 mt-auto">
        <div className="container mx-auto px-4 flex flex-col items-center gap-3">
          <p className="font-medium">{t('copyright')}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-primary text-xs h-7 px-3">
                <Info className="w-3 h-3" />
                {t('about')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md text-start bg-card border-primary/10">
              <DialogHeader className="text-start space-y-4">
                <DialogTitle className="text-xl font-serif text-primary border-b border-border pb-2">
                  {t('about_app')}
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="text-sm leading-relaxed text-foreground/80 space-y-4">
                    <p>{t('about_description')}</p>
                    <ul className="list-disc list-inside space-y-1 text-foreground/70 bg-primary/5 p-3 rounded-xl border border-primary/10">
                      <li>{t('source_quran')}</li>
                      <li>{t('source_bukhari')}</li>
                      <li>{t('source_muslim')}</li>
                      <li>{t('source_tafsir')}</li>
                    </ul>
                    <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-foreground text-sm">
                      <p>{t('about_sadaqah')}</p>
                    </div>
                    <p className="text-center font-serif text-primary font-bold text-base">
                      {t('about_closing')}
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </footer>

      {/* Location Sheet */}
      <LocationSheet 
        isOpen={isLocationSheetOpen}
        onClose={() => setIsLocationSheetOpen(false)}
        selectedCountry={selectedCountry}
        selectedCity={selectedCity}
        usingExactLocation={usingExactLocation}
        onCountryChange={handleCountryChange}
        onCityChange={handleCityChange}
        onUseCurrentLocation={handleUseCurrentLocation}
        onCancelLocation={() => setUsingExactLocation(false)}
      />

      {/* Share Button - only on prayer times tab */}
      {!shareHidden && activeTab === 'home' && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
          <Button 
            onClick={handleShare}
            className="rounded-full w-12 h-12 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg flex items-center justify-center p-0"
            data-testid="button-share"
          >
            <Share2 className="w-5 h-5" />
          </Button>
          <button
            onClick={() => setShareHidden(true)}
            className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors shadow-lg"
            data-testid="button-close-share"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}

