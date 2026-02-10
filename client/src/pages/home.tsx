import { useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { getNextEvent, getFollowingEvent, formatDate, type EidDate } from "@/lib/eid-dates";
import { CountdownTimer } from "@/components/countdown-timer";
import { DailyContentView } from "@/components/daily-content-view";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Moon, Calendar, Info, Clock, BookOpen, Compass, Globe, MapPin, ChevronDown, Sunrise, Sun, Sunset, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QiblahFinder } from "@/components/qiblah-finder";
import { QuranKhatm } from "@/components/quran-khatm";
import { usePrayerTimes } from "@/hooks/use-prayer-times";
import { LocationSheet } from "@/components/location-sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import "@/lib/i18n";

const ROUTE_TO_TAB: Record<string, string> = {
  "/": "home",
  "/prayer-times": "home",
  "/qiblah": "qiblah",
  "/daily-content": "daily",
  "/quran-khatm": "khatm",
};

const TAB_TO_ROUTE: Record<string, string> = {
  home: "/prayer-times",
  qiblah: "/qiblah",
  daily: "/daily-content",
  khatm: "/quran-khatm",
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
};

export default function Home() {
  const { t, i18n } = useTranslation();
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

  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('12');
  const [shareHidden, setShareHidden] = useState(false);

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
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <Select onValueChange={changeLanguage} defaultValue={i18n.language}>
              <SelectTrigger className="w-9 h-9 p-0 bg-transparent border-none shadow-none hover:bg-muted/50 rounded-lg flex items-center justify-center" data-testid="select-language">
                <Globe className="w-5 h-5 text-muted-foreground" />
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

            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Logo" className="w-9 h-9 rounded-lg shrink-0" data-testid="img-logo" />
              <span className="text-base font-black text-primary font-serif leading-tight">
                {i18n.language === 'ar' ? "مواقيت الصلاة" : "Prayer Times"}
              </span>
            </div>

            {prayerData ? (
              <span className="text-xs font-bold text-muted-foreground/80 leading-tight">
                {prayerData.date.hijri.day} {prayerData.date.hijri.month.ar} {prayerData.date.hijri.year}هـ
              </span>
            ) : (
              <div className="w-9" />
            )}
          </div>

          <div className="px-3 pb-2">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-4 h-11 bg-muted/80 border border-border/50 rounded-xl p-0.5" data-testid="tabs-nav">
              <TabsTrigger 
                value="home" 
                className="rounded-lg text-[13px] md:text-sm font-black data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-9 transition-all"
                data-testid="tab-prayer-times"
              >
                {t('prayer_times')}
              </TabsTrigger>
              <TabsTrigger 
                value="qiblah" 
                className="rounded-lg text-[13px] md:text-sm font-black data-[state=active]:bg-accent data-[state=active]:text-accent-foreground h-9 transition-all"
                data-testid="tab-qiblah"
              >
                {t('qiblah')}
              </TabsTrigger>
              <TabsTrigger 
                value="daily" 
                className="rounded-lg text-[13px] md:text-sm font-black data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground h-9 transition-all"
                data-testid="tab-daily-content"
              >
                {t('daily_content')}
              </TabsTrigger>
              <TabsTrigger 
                value="khatm" 
                className="rounded-lg text-[13px] md:text-sm font-black data-[state=active]:bg-emerald-600 data-[state=active]:text-white h-9 transition-all"
                data-testid="tab-quran-khatm"
              >
                {i18n.language === 'ar' ? 'الختمة' : 'Khatm'}
              </TabsTrigger>
            </TabsList>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 max-w-7xl mx-auto">
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
                  nextPrayer.name === 'Fajr' ? "border-primary/50 shadow-primary/20" : 
                  nextPrayer.name === 'Maghrib' ? "border-secondary/50 shadow-secondary/20" : 
                  "border-border"
                )}>
                  <div className={cn(
                    "absolute top-0 inset-x-0 h-1.5",
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

                    <span className="text-sm md:text-base font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      {t('remaining_to')} {t(nextPrayer.name.toLowerCase())}
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

                    <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 px-4 py-1.5 rounded-full">
                       <Clock className="w-4 h-4 text-muted-foreground" />
                       <span>{t('next_prayer')}: {formatTime(nextPrayer.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}))}</span>
                    </div>
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
                    const isNext = nextPrayer?.name === name;
                    
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

            {/* Secondary: Eid Countdown */}
             <section className="w-full max-w-4xl mx-auto">
               <div className="flex items-center gap-2 mb-3">
                 <Calendar className="w-4 h-4 text-muted-foreground" />
                 <h3 className="text-sm font-bold text-muted-foreground">{t('upcoming_events')}</h3>
               </div>
               
               <div className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                 <div className="text-center md:text-start">
                   <h4 className="text-lg font-black text-foreground">{t(nextEvent.nameKey)}</h4>
                   <p className="text-sm text-muted-foreground font-medium">{formatDate(nextEvent.date, i18n.language === 'ar' ? 'ar-SA' : 'en-US')}</p>
                 </div>
                 
                 <div className="w-full md:w-auto">
                    <CountdownTimer targetDate={nextEvent.date} className="gap-2" />
                 </div>
               </div>
             </section>

          </TabsContent>

          <TabsContent value="qiblah" className="mt-0">
            <QiblahFinder />
          </TabsContent>

          <TabsContent value="daily" className="mt-0">
            <DailyContentView />
          </TabsContent>

          <TabsContent value="khatm" className="mt-0">
            <QuranKhatm />
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
                  {i18n.language === 'ar' ? "تنبيه مهم" : "Important Disclaimer"}
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="text-sm leading-relaxed text-foreground/80 space-y-4">
                    <p>
                      {i18n.language === 'ar' 
                        ? "تم إعداد محتوى القصص باستخدام تقنيات الذكاء الاصطناعي، بالاعتماد على مصادر إسلامية موثوقة مثل القرآن الكريم وتفاسير العلماء."
                        : "Story content was prepared using AI technologies, based on trusted Islamic sources such as the Holy Quran and scholarly Tafsir."}
                    </p>
                    <p>
                      {i18n.language === 'ar'
                        ? "ورغم الحرص على الدقة، قد ترد بعض الأخطاء غير المقصودة. في حال وجود أي تعارض أو إشكال في المحتوى، يُرجى الرجوع إلى المصادر الشرعية الأصلية مثل:"
                        : "Despite efforts for accuracy, some unintentional errors may occur. In case of any conflict, please refer to the original sources such as:"}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-foreground/70 bg-primary/5 p-3 rounded-xl border border-primary/10">
                      <li>{i18n.language === 'ar' ? "القرآن الكريم" : "The Holy Quran"}</li>
                      <li>{i18n.language === 'ar' ? "تفسير ابن كثير" : "Tafsir Ibn Kathir"}</li>
                      <li>{i18n.language === 'ar' ? "التفاسير المعتمدة لدى أهل العلم" : "Approved Tafsir by scholars"}</li>
                    </ul>
                    <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-foreground text-sm">
                      <p>
                        {i18n.language === 'ar'
                          ? "هذا العمل صدقة جارية عني وعن جميع المسلمين، وأسأل الله أن ينفع به ويجعله خالصًا لوجهه الكريم."
                          : "This work is an ongoing charity (Sadaqah Jariyah) for me and all Muslims. I ask Allah to make it beneficial and sincere for His sake."}
                      </p>
                    </div>
                    <p className="text-center font-serif text-primary font-bold text-base">
                      {i18n.language === 'ar' ? "اللهم تقبّل منا ومنكم." : "May Allah accept from us and from you."}
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

