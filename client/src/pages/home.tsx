import { useEffect, useState } from "react";
import { getNextEvent, getFollowingEvent, formatDate, type EidDate } from "@/lib/eid-dates";
import { CountdownTimer } from "@/components/countdown-timer";
import { PrayerTimesSection } from "@/components/prayer-times";
import { DailyContentView } from "@/components/daily-content-view";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Moon, Calendar, Info, Clock, BookOpen, Compass, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QiblahFinder } from "@/components/qiblah-finder";
import "@/lib/i18n"; // Import i18n config

export default function Home() {
  const { t, i18n } = useTranslation();
  const [nextEvent, setNextEvent] = useState<EidDate | null>(null);
  const [followingEvent, setFollowingEvent] = useState<EidDate | null>(null);

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

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  if (!nextEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-xl font-bold animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground bg-pattern overflow-x-hidden relative flex flex-col font-sans">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Language Switcher */}
      <div className="absolute top-4 left-4 z-50">
         <Select onValueChange={changeLanguage} defaultValue={i18n.language}>
          <SelectTrigger className="w-[120px] bg-card/80 backdrop-blur-sm border-border">
            <Languages className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ar">العربية</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ur">اردو</SelectItem>
            <SelectItem value="fa">فارسی</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <main className="flex-1 flex flex-col items-center justify-start p-4 py-16 relative z-10 w-full max-w-7xl mx-auto space-y-8">
        
        {/* Main Navigation Tabs */}
        <Tabs defaultValue="home" className="w-full">
          <div className="flex justify-center mb-8 sticky top-4 z-40">
            <TabsList className="grid w-full max-w-md grid-cols-3 h-14 bg-card/90 backdrop-blur-md border border-border shadow-lg rounded-full px-1">
              <TabsTrigger 
                value="home" 
                className="rounded-full text-sm md:text-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-12 transition-all"
              >
                <Clock className="w-4 h-4 md:w-5 md:h-5 mx-1" />
                <span className="hidden md:inline">{t('prayer_times')}</span>
                <span className="md:hidden">الصلاة</span>
              </TabsTrigger>
              <TabsTrigger 
                value="qiblah" 
                className="rounded-full text-sm md:text-lg font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground h-12 transition-all"
              >
                <Compass className="w-4 h-4 md:w-5 md:h-5 mx-1" />
                <span className="hidden md:inline">{t('qiblah')}</span>
                <span className="md:hidden">القبلة</span>
              </TabsTrigger>
              <TabsTrigger 
                value="daily" 
                className="rounded-full text-sm md:text-lg font-bold data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground h-12 transition-all"
              >
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 mx-1" />
                <span className="hidden md:inline">{t('daily_content')}</span>
                <span className="md:hidden">يوميات</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="home" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Prayer Times Section */}
            <div className="w-full">
              <PrayerTimesSection />
            </div>

            <div className="w-full h-px bg-border/50" />

            {/* Countdown Section */}
            <section className="w-full flex flex-col items-center space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-4"
              >
                <h1 className="text-4xl md:text-6xl font-black font-serif text-accent drop-shadow-md tracking-wide">
                  {t(nextEvent.nameKey)}
                </h1>
                <p className="text-2xl md:text-3xl text-foreground font-bold">
                  {formatDate(nextEvent.date, i18n.language === 'ar' ? 'ar-SA' : 'en-US')}
                </p>
              </motion.div>

              <div className="w-full max-w-5xl px-4">
                <CountdownTimer 
                  targetDate={nextEvent.date} 
                  onComplete={handleCelebration}
                />
              </div>

              {followingEvent && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="w-full max-w-md mx-auto px-4 mt-8"
                >
                  <div className="bg-card border-2 border-accent/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-3 text-accent">
                        <Calendar className="w-6 h-6" />
                        <span className="font-black text-xl">{t('next_event')}</span>
                      </div>
                      <span className="text-xs font-bold text-white bg-accent px-3 py-1.5 rounded-full shadow-sm">
                        {t('remaining_to')} {t(nextEvent.nameKey)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-black text-foreground">{t(followingEvent.nameKey)}</h3>
                        <p className="text-muted-foreground font-bold mt-1 text-base">
                          {formatDate(followingEvent.date, i18n.language === 'ar' ? 'ar-SA' : 'en-US')}
                        </p>
                      </div>
                      <div className="bg-accent/10 p-3 rounded-full text-accent border border-accent/20">
                        <Moon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </section>
          </TabsContent>

          <TabsContent value="qiblah">
            <QiblahFinder />
          </TabsContent>

          <TabsContent value="daily">
            <DailyContentView />
          </TabsContent>
        </Tabs>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground text-sm relative z-10 border-t border-border bg-card">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-medium">{t('copyright')}</p>
          
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors border-primary/20">
                  <Info className="w-4 h-4" />
                  {t('about')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md text-start bg-card border-primary/10">
                <DialogHeader className="text-start space-y-4">
                  <DialogTitle className="text-2xl font-serif text-primary border-b border-border pb-2">{t('about')}</DialogTitle>
                  <DialogDescription className="text-base leading-relaxed text-foreground/80">
                    {i18n.language === 'ar' ? 
                      "تطبيق شامل لمواقيت الصلاة، اتجاه القبلة، والعد التنازلي للأعياد، والمحتوى الإسلامي اليومي." : 
                      "Comprehensive app for prayer times, Qiblah direction, Eid countdown, and daily Islamic content."}
                    <br/><br/>
                    <div className="bg-primary/10 p-3 rounded-lg border border-primary/20 text-foreground text-sm">
                      <strong>{i18n.language === 'ar' ? "ملاحظة:" : "Note:"}</strong>
                       {i18n.language === 'ar' ? 
                       " مواقيت الصلاة تعتمد على تقويم أم القرى. جميع المحتويات الدينية مراجعة من مصادر موثوقة." : 
                       " Prayer times are based on Umm Al-Qura calendar. All religious content is verified from trusted sources."}
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </footer>
    </div>
  );
}
