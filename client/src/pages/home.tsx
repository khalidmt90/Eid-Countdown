import { useEffect, useState } from "react";
import { getNextEid, getFollowingEid, formatArabicDate, type EidDate } from "@/lib/eid-dates";
import { CountdownTimer } from "@/components/countdown-timer";
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

      <main className="flex-1 flex flex-col items-center justify-center p-4 py-12 md:py-24 relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Header / Logo Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 space-y-6 flex flex-col items-center"
        >
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black font-serif text-primary drop-shadow-md tracking-wide">
              {nextEid.nameAr}
            </h1>
            <p className="text-3xl md:text-4xl text-foreground font-bold">
              {formatArabicDate(nextEid.date)}
            </p>
          </div>
        </motion.div>

        {/* Primary Countdown */}
        <div className="w-full max-w-5xl mb-16 px-4">
          <CountdownTimer 
            targetDate={nextEid.date} 
            onComplete={handleCelebration}
          />
        </div>

        {/* Secondary Info / Following Eid */}
        {followingEid && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full max-w-md mx-auto px-4"
          >
            <div className="bg-card border-2 border-primary/20 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-border">
                <div className="flex items-center gap-3 text-primary">
                  <Calendar className="w-8 h-8" />
                  <span className="font-black text-2xl">العيد القادم</span>
                </div>
                <span className="text-sm font-bold text-primary-foreground bg-primary px-4 py-2 rounded-full shadow-md">
                  بعد {nextEid.nameAr}
                </span>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-3xl font-black text-foreground">{followingEid.nameAr}</h3>
                  <p className="text-muted-foreground font-bold mt-2 text-lg">
                    {formatArabicDate(followingEid.date)}
                  </p>
                </div>
                <div className="bg-secondary p-4 rounded-full text-secondary-foreground border-2 border-secondary-foreground/10">
                  <Moon className="w-8 h-8" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground text-sm relative z-10 border-t border-border bg-card/30 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-medium">© 2025 عد تنازلي للعيد. تم التطوير بحب.</p>
          
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
                  <DialogTitle className="text-2xl font-serif text-primary border-b border-border pb-2">عن عداد العيد</DialogTitle>
                  <DialogDescription className="text-base leading-relaxed text-foreground/80">
                    تم تصميم هذا الموقع لمتابعة الوقت المتبقي لأعياد المسلمين (عيد الفطر وعيد الأضحى) بدقة وجمال.
                    <br/><br/>
                    <div className="bg-secondary/20 p-3 rounded-lg border border-secondary/20 text-secondary-foreground text-sm">
                      <strong>ملاحظة هامة:</strong> التواريخ المعروضة هي تقديرات فلكية. الموعد الفعلي يعتمد على رؤية الهلال في بلدك.
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
