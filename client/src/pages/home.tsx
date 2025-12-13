import { useEffect, useState } from "react";
import { getNextEid, getFollowingEid, formatArabicDate, type EidDate } from "@/lib/eid-dates";
import { CountdownTimer } from "@/components/countdown-timer";
import { PrayerTimesSection } from "@/components/prayer-times";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Moon, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Home() {
  const [nextEid, setNextEid] = useState<EidDate | null>(null);
  const [followingEid, setFollowingEid] = useState<EidDate | null>(null);

  useEffect(() => {
    const next = getNextEid();
    setNextEid(next);
    if (next) {
      setFollowingEid(getFollowingEid(next.date));
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

  if (!nextEid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-xl font-bold animate-pulse">جاري تحميل مواعيد العيد...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground bg-pattern overflow-x-hidden relative flex flex-col font-sans" dir="rtl">
      {/* Decorative Elements - made darker for visibility */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-start p-4 py-8 relative z-10 w-full max-w-7xl mx-auto space-y-12">
        
        {/* Prayer Times Section - Top Priority */}
        <div className="w-full">
          <PrayerTimesSection />
        </div>

        <div className="w-full h-px bg-border/50" />

        {/* Eid Countdown Section */}
        <section className="w-full flex flex-col items-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-black font-serif text-accent drop-shadow-md tracking-wide">
              {nextEid.nameAr}
            </h1>
            <p className="text-2xl md:text-3xl text-foreground font-bold">
              {formatArabicDate(nextEid.date)}
            </p>
          </motion.div>

          <div className="w-full max-w-5xl px-4">
            <CountdownTimer 
              targetDate={nextEid.date} 
              onComplete={handleCelebration}
            />
          </div>

          {followingEid && (
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
                    <span className="font-black text-xl">العيد القادم</span>
                  </div>
                  <span className="text-xs font-bold text-white bg-accent px-3 py-1.5 rounded-full shadow-sm">
                    بعد {nextEid.nameAr}
                  </span>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-black text-foreground">{followingEid.nameAr}</h3>
                    <p className="text-muted-foreground font-bold mt-1 text-base">
                      {formatArabicDate(followingEid.date)}
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

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground text-sm relative z-10 border-t border-border bg-card">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-medium">© 2025 مواقيت الصلاة وعداد العيد.</p>
          
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors border-primary/20">
                  <Info className="w-4 h-4" />
                  عن الموقع
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md text-right bg-card border-primary/10" dir="rtl">
                <DialogHeader className="text-right space-y-4">
                  <DialogTitle className="text-2xl font-serif text-primary border-b border-border pb-2">عن الموقع</DialogTitle>
                  <DialogDescription className="text-base leading-relaxed text-foreground/80">
                    تطبيق شامل لمواقيت الصلاة، اتجاه القبلة، والعد التنازلي للأعياد.
                    <br/><br/>
                    <div className="bg-primary/10 p-3 rounded-lg border border-primary/20 text-foreground text-sm">
                      <strong>ملاحظة:</strong> مواقيت الصلاة تعتمد على تقويم أم القرى. تواريخ الأعياد فلكية وقد تختلف حسب رؤية الهلال.
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
