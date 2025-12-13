import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate, className, onComplete }: CountdownTimerProps) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        if (onComplete) onComplete();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (!isMounted) return null;

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto", className)}>
      <TimeUnit value={timeLeft.days} label={t('days')} delay={0} />
      <TimeUnit value={timeLeft.hours} label={t('hours')} delay={0.1} />
      <TimeUnit value={timeLeft.minutes} label={t('minutes')} delay={0.2} />
      <TimeUnit value={timeLeft.seconds} label={t('seconds')} delay={0.3} />
    </div>
  );
}

function TimeUnit({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="flex flex-col items-center justify-center p-6 bg-card border-2 border-primary/20 shadow-md">
        <span className="text-4xl md:text-6xl font-black text-primary font-mono tabular-nums tracking-tight">
          {String(value).padStart(2, '0')}
        </span>
        <span className="text-foreground font-bold mt-2 text-xl">
          {label}
        </span>
      </Card>
    </motion.div>
  );
}
