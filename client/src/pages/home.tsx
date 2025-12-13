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
        <p className="text-xl">جاري تحميل مواعيد العيد...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground bg-pattern overflow-x-hidden relative flex flex-col">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <main className="flex-1 flex flex-col items-center justify-center p-4 py-12 md:py-24 relative z-10">
        
        {/* Header / Logo Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 space-y-6"
        >
          <div className="mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-1 shadow-2xl shadow-primary/20 flex items-center justify-center relative overflow-hidden group hover:scale-105 transition-transform duration-500">
             <img 
               src="/attached_assets/Gemini_Generated_Image_y967fby967fby967_1765655598070.png" 
               alt="شعار العيد" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-primary drop-shadow-sm">
              {nextEid.nameAr}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              {formatArabicDate(nextEid.date)}
            </p>
          </div>
        </motion.div>

        {/* Primary Countdown */}
        <div className="w-full max-w-5xl mb-16">
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
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-primary">
                  <Calendar className="w-5 h-5" />
                  <span className="font-bold text-lg">العيد القادم</span>
                </div>
                <span className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                  بعد {nextEid.nameAr}
                </span>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold">{followingEid.nameAr}</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {formatArabicDate(followingEid.date)}
                  </p>
                </div>
                <Moon className="w-8 h-8 text-primary/20" />
              </div>
            </div>
          </motion.div>
        )}

      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-muted-foreground text-sm relative z-10 border-t border-border/40 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2025 عد تنازلي للعيد. جميع الحقوق محفوظة.</p>
          
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 hover:text-primary">
                  <Info className="w-4 h-4" />
                  عن الموقع
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md text-right" dir="rtl">
                <DialogHeader className="text-right space-y-3">
                  <DialogTitle className="text-2xl font-serif text-primary">عن عداد العيد</DialogTitle>
                  <DialogDescription className="text-base leading-relaxed">
                    تم تصميم هذا الموقع لمتابعة الوقت المتبقي لأعياد المسلمين (عيد الفطر وعيد الأضحى).
                    <br/><br/>
                    <strong>ملاحظة هامة:</strong> التواريخ المعروضة هي تقديرات فلكية. الموعد الفعلي يعتمد على رؤية الهلال في بلدك.
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
