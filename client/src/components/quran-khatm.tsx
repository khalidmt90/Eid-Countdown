import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  AlertCircle,
  Calendar,
  Search,
  X,
  ArrowUp,
  Settings,
  Plus,
  Minus,
  Type,
} from "lucide-react";

interface Ayah {
  number: number;
  text: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
    numberOfAyahs: number;
  };
  numberInSurah: number;
  juz: number;
}

interface JuzData {
  ayahs: Ayah[];
  fetchedAt: string;
}

interface DayCompletion {
  completed: boolean;
  completedAt?: string;
}

type CompletionMap = Record<number, DayCompletion>;

const LS_KEY_START = "ramadanStartDateISO";
const LS_KEY_COMPLETION = "khatmCompletion";
const LS_KEY_JUZ_CACHE = "juzCache";
const LS_KEY_LAST_DAY = "lastSelectedDay";
const LS_KEY_FONT_SIZE = "khatmFontSize";

const FONT_SIZES = [
  { label: "صغير", labelEn: "Small", value: 20 },
  { label: "متوسط", labelEn: "Medium", value: 26 },
  { label: "كبير", labelEn: "Large", value: 32 },
  { label: "كبير جداً", labelEn: "X-Large", value: 38 },
  { label: "ضخم", labelEn: "Huge", value: 44 },
];

const DEFAULT_FONT_SIZE = 26;

function getCompletion(): CompletionMap {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY_COMPLETION) || "{}");
  } catch {
    return {};
  }
}

function setCompletion(map: CompletionMap) {
  localStorage.setItem(LS_KEY_COMPLETION, JSON.stringify(map));
}

function getCachedJuz(juz: number): JuzData | null {
  try {
    const cache = JSON.parse(localStorage.getItem(LS_KEY_JUZ_CACHE) || "{}");
    return cache[juz] || null;
  } catch {
    return null;
  }
}

function setCachedJuz(juz: number, data: JuzData) {
  try {
    const cache = JSON.parse(localStorage.getItem(LS_KEY_JUZ_CACHE) || "{}");
    cache[juz] = data;
    localStorage.setItem(LS_KEY_JUZ_CACHE, JSON.stringify(cache));
  } catch {
    localStorage.setItem(LS_KEY_JUZ_CACHE, JSON.stringify({ [juz]: data }));
  }
}

function computeTodayDay(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff + 1;
}

function getDayDate(startDate: string, day: number): string {
  const d = new Date(startDate);
  d.setDate(d.getDate() + (day - 1));
  return d.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const SURAH_NAMES_AR: Record<number, string> = {
  1: "الفاتحة", 2: "البقرة", 3: "آل عمران", 4: "النساء", 5: "المائدة",
  6: "الأنعام", 7: "الأعراف", 8: "الأنفال", 9: "التوبة", 10: "يونس",
  11: "هود", 12: "يوسف", 13: "الرعد", 14: "إبراهيم", 15: "الحجر",
  16: "النحل", 17: "الإسراء", 18: "الكهف", 19: "مريم", 20: "طه",
  21: "الأنبياء", 22: "الحج", 23: "المؤمنون", 24: "النور", 25: "الفرقان",
  26: "الشعراء", 27: "النمل", 28: "القصص", 29: "العنكبوت", 30: "الروم",
  31: "لقمان", 32: "السجدة", 33: "الأحزاب", 34: "سبأ", 35: "فاطر",
  36: "يس", 37: "الصافات", 38: "ص", 39: "الزمر", 40: "غافر",
  41: "فصلت", 42: "الشورى", 43: "الزخرف", 44: "الدخان", 45: "الجاثية",
  46: "الأحقاف", 47: "محمد", 48: "الفتح", 49: "الحجرات", 50: "ق",
  51: "الذاريات", 52: "الطور", 53: "النجم", 54: "القمر", 55: "الرحمن",
  56: "الواقعة", 57: "الحديد", 58: "المجادلة", 59: "الحشر", 60: "الممتحنة",
  61: "الصف", 62: "الجمعة", 63: "المنافقون", 64: "التغابن", 65: "الطلاق",
  66: "التحريم", 67: "الملك", 68: "القلم", 69: "الحاقة", 70: "المعارج",
  71: "نوح", 72: "الجن", 73: "المزمل", 74: "المدثر", 75: "القيامة",
  76: "الإنسان", 77: "المرسلات", 78: "النبأ", 79: "النازعات", 80: "عبس",
  81: "التكوير", 82: "الانفطار", 83: "المطففين", 84: "الانشقاق", 85: "البروج",
  86: "الطارق", 87: "الأعلى", 88: "الغاشية", 89: "الفجر", 90: "البلد",
  91: "الشمس", 92: "الليل", 93: "الضحى", 94: "الشرح", 95: "التين",
  96: "العلق", 97: "القدر", 98: "البينة", 99: "الزلزلة", 100: "العاديات",
  101: "القارعة", 102: "التكاثر", 103: "العصر", 104: "الهمزة", 105: "الفيل",
  106: "قريش", 107: "الماعون", 108: "الكوثر", 109: "الكافرون", 110: "النصر",
  111: "المسد", 112: "الإخلاص", 113: "الفلق", 114: "الناس",
};

export function QuranKhatm() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const savedStart = localStorage.getItem(LS_KEY_START);

  const [startDate, setStartDate] = useState<string | null>(savedStart);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateInput, setDateInput] = useState(savedStart || "");
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [completion, setCompletionState] = useState<CompletionMap>(getCompletion());
  const [juzData, setJuzData] = useState<JuzData | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_FONT_SIZE);
    return saved ? parseInt(saved) : DEFAULT_FONT_SIZE;
  });

  const textContainerRef = useRef<HTMLDivElement>(null);

  const todayDay = startDate ? computeTodayDay(startDate) : null;
  const isRamadanActive = todayDay !== null && todayDay >= 1 && todayDay <= 30;

  useEffect(() => {
    if (startDate && todayDay !== null) {
      const saved = localStorage.getItem(LS_KEY_LAST_DAY);
      if (saved) {
        setSelectedDay(Math.max(1, Math.min(parseInt(saved), 30)));
      } else if (isRamadanActive) {
        setSelectedDay(todayDay);
      } else {
        setSelectedDay(1);
      }
    } else {
      const saved = localStorage.getItem(LS_KEY_LAST_DAY);
      setSelectedDay(saved ? Math.max(1, Math.min(parseInt(saved), 30)) : 1);
    }
  }, [startDate]);

  useEffect(() => {
    if (selectedDay) {
      localStorage.setItem(LS_KEY_LAST_DAY, String(selectedDay));
    }
  }, [selectedDay]);

  useEffect(() => {
    localStorage.setItem(LS_KEY_FONT_SIZE, String(fontSize));
  }, [fontSize]);

  const fetchJuz = useCallback(async (juzNumber: number) => {
    const cached = getCachedJuz(juzNumber);
    if (cached) {
      setJuzData(cached);
      setLoading(false);
      return;
    }

    setLoading(true);
    setFetchError(null);

    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/juz/${juzNumber}/quran-uthmani`
      );
      if (!res.ok) throw new Error("API error");
      const json = await res.json();
      const data: JuzData = {
        ayahs: json.data.ayahs.map((a: any) => ({
          number: a.number,
          text: a.text,
          surah: {
            number: a.surah.number,
            name: a.surah.name,
            englishName: a.surah.englishName,
            numberOfAyahs: a.surah.numberOfAyahs,
          },
          numberInSurah: a.numberInSurah,
          juz: a.juz,
        })),
        fetchedAt: new Date().toISOString(),
      };
      setCachedJuz(juzNumber, data);
      setJuzData(data);
    } catch (err) {
      setFetchError(isArabic ? "حدث خطأ في تحميل الجزء. تحقق من الاتصال بالإنترنت." : "Error loading Juz. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  }, [isArabic]);

  useEffect(() => {
    setJuzData(null);
    fetchJuz(selectedDay);
  }, [selectedDay, fetchJuz]);

  const handleSaveDate = () => {
    if (dateInput) {
      localStorage.setItem(LS_KEY_START, dateInput);
      setStartDate(dateInput);
      const today = computeTodayDay(dateInput);
      if (today >= 1 && today <= 30) {
        setSelectedDay(today);
      }
      setShowDatePicker(false);
    }
  };

  const handleResetDate = () => {
    localStorage.removeItem(LS_KEY_START);
    setStartDate(null);
    setDateInput("");
    setShowSettings(false);
  };

  const toggleComplete = (day: number) => {
    const updated = { ...completion };
    if (updated[day]?.completed) {
      updated[day] = { completed: false };
    } else {
      updated[day] = { completed: true, completedAt: new Date().toISOString() };
    }
    setCompletionState(updated);
    setCompletion(updated);
  };

  const completedCount = Object.values(completion).filter((c) => c.completed).length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  const oldestMissedDay = useMemo(() => {
    if (!todayDay) return null;
    for (let d = 1; d < Math.min(todayDay, 31); d++) {
      if (!completion[d]?.completed) return d;
    }
    return null;
  }, [completion, todayDay]);

  const getDayStatus = (day: number): "completed" | "missed" | "pending" | "future" => {
    if (completion[day]?.completed) return "completed";
    if (todayDay !== null && day < todayDay && day <= 30) return "missed";
    if (todayDay !== null && day === todayDay) return "pending";
    return "future";
  };

  const groupedAyahs = useMemo(() => {
    if (!juzData) return [];
    const groups: { surahNumber: number; surahName: string; ayahs: Ayah[] }[] = [];
    let currentSurah = -1;

    for (const ayah of juzData.ayahs) {
      if (ayah.surah.number !== currentSurah) {
        currentSurah = ayah.surah.number;
        groups.push({
          surahNumber: ayah.surah.number,
          surahName: SURAH_NAMES_AR[ayah.surah.number] || ayah.surah.name,
          ayahs: [],
        });
      }
      groups[groups.length - 1].ayahs.push(ayah);
    }
    return groups;
  }, [juzData]);

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groupedAyahs;
    return groupedAyahs
      .map((g) => ({
        ...g,
        ayahs: g.ayahs.filter((a) => a.text.includes(searchQuery.trim())),
      }))
      .filter((g) => g.ayahs.length > 0);
  }, [groupedAyahs, searchQuery]);

  const scrollToTop = () => {
    textContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const increaseFontSize = () => {
    const currentIdx = FONT_SIZES.findIndex((f) => f.value <= fontSize);
    const nextIdx = Math.max(0, (FONT_SIZES.findIndex((f) => f.value >= fontSize) || 0) - 1);
    const idx = FONT_SIZES.findIndex((f) => f.value === fontSize);
    if (idx < FONT_SIZES.length - 1) {
      setFontSize(FONT_SIZES[idx + 1].value);
    } else if (idx === -1) {
      const closest = FONT_SIZES.reduce((prev, curr) =>
        Math.abs(curr.value - fontSize) < Math.abs(prev.value - fontSize) ? curr : prev
      );
      const ci = FONT_SIZES.indexOf(closest);
      if (ci < FONT_SIZES.length - 1) setFontSize(FONT_SIZES[ci + 1].value);
    }
  };

  const decreaseFontSize = () => {
    const idx = FONT_SIZES.findIndex((f) => f.value === fontSize);
    if (idx > 0) {
      setFontSize(FONT_SIZES[idx - 1].value);
    } else if (idx === -1) {
      const closest = FONT_SIZES.reduce((prev, curr) =>
        Math.abs(curr.value - fontSize) < Math.abs(prev.value - fontSize) ? curr : prev
      );
      const ci = FONT_SIZES.indexOf(closest);
      if (ci > 0) setFontSize(FONT_SIZES[ci - 1].value);
    }
  };

  const currentFontLabel = () => {
    const match = FONT_SIZES.find((f) => f.value === fontSize);
    if (match) return isArabic ? match.label : match.labelEn;
    return `${fontSize}px`;
  };

  const ayahNumberSize = Math.max(12, Math.round(fontSize * 0.55));

  return (
    <div className="flex flex-col space-y-4 animate-in fade-in duration-500 pb-8" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-primary font-serif flex items-center gap-2">
          <span className="text-3xl">📖</span>
          ختم القرآن في رمضان
        </h2>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDatePicker(!showDatePicker)}
            data-testid="button-calendar"
            title={isArabic ? "تغيير تاريخ رمضان" : "Change Ramadan date"}
          >
            <Calendar className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            data-testid="button-settings"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Date Picker Panel */}
      {showDatePicker && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="py-4 space-y-3">
            <p className="text-sm font-bold text-foreground">
              {isArabic ? "حدد تاريخ أول يوم رمضان:" : "Set first day of Ramadan:"}
            </p>
            <div className="flex gap-2">
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="flex-1 rounded-xl border-2 border-border bg-background px-3 py-2 text-base text-foreground focus:border-primary focus:outline-none"
                data-testid="input-ramadan-date"
              />
              <Button
                onClick={handleSaveDate}
                disabled={!dateInput}
                className="rounded-xl font-bold px-6"
                data-testid="button-save-date"
              >
                {isArabic ? "حفظ" : "Save"}
              </Button>
            </div>
            {startDate && (
              <p className="text-xs text-muted-foreground">
                {isArabic
                  ? `التاريخ الحالي: ${new Date(startDate).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}`
                  : `Current: ${new Date(startDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {showSettings && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="py-4 flex items-center justify-between">
            <span className="text-sm font-bold">
              {isArabic ? "إعادة تعيين تاريخ رمضان" : "Reset Ramadan date"}
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleResetDate}
              data-testid="button-reset-date"
            >
              {isArabic ? "إعادة تعيين" : "Reset"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Progress Bar */}
      <Card className="border-primary/20">
        <CardContent className="py-4 space-y-3">
          <div className="flex items-center justify-between text-sm font-bold">
            <span>{isArabic ? "تقدم الختمة" : "Khatm Progress"}</span>
            <span className="text-primary">{completedCount}/30 ({progressPercent}%)</span>
          </div>
          <Progress value={progressPercent} className="h-3" data-testid="progress-khatm" />
        </CardContent>
      </Card>

      {/* Today Card - only shown during Ramadan */}
      {isRamadanActive && todayDay !== null && (
        <Card className="border-2 border-primary/40 bg-primary/5 shadow-md">
          <CardContent className="py-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-muted-foreground">
                  {isArabic ? `اليوم ${todayDay} من رمضان` : `Ramadan Day ${todayDay}`}
                </div>
                {startDate && (
                  <div className="text-xs text-muted-foreground/70 mt-0.5">
                    {getDayDate(startDate, todayDay)}
                  </div>
                )}
              </div>
              <div className="text-xl font-black text-primary">
                {isArabic ? `جزء اليوم: ${todayDay}` : `Today's Juz: ${todayDay}`}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setSelectedDay(todayDay);
                  setTimeout(scrollToTop, 100);
                }}
                className="flex-1 h-12 font-bold rounded-xl"
                variant={selectedDay === todayDay ? "default" : "outline"}
                data-testid="button-read-today"
              >
                <BookOpen className="w-4 h-4 ml-2" />
                {isArabic ? "اقرأ الآن" : "Read Now"}
              </Button>
              <Button
                onClick={() => toggleComplete(todayDay)}
                variant={completion[todayDay]?.completed ? "secondary" : "outline"}
                className="flex-1 h-12 font-bold rounded-xl"
                data-testid="button-mark-today"
              >
                {completion[todayDay]?.completed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 ml-2 text-green-500" />
                    {isArabic ? "تم ✓" : "Done ✓"}
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 ml-2" />
                    {isArabic ? "وضع علامة تم" : "Mark Complete"}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Catch-up Button */}
      {oldestMissedDay !== null && (
        <Button
          variant="outline"
          onClick={() => setSelectedDay(oldestMissedDay)}
          className="w-full h-11 border-amber-500/50 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-bold rounded-xl"
          data-testid="button-catchup"
        >
          <AlertCircle className="w-4 h-4 ml-2" />
          {isArabic
            ? `انتقل لأقدم يوم فاتني (يوم ${oldestMissedDay})`
            : `Catch up: Day ${oldestMissedDay}`}
        </Button>
      )}

      {/* Day Picker */}
      <div className="space-y-2">
        <span className="text-sm font-bold text-muted-foreground">
          {isArabic ? "اختر اليوم:" : "Select Day:"}
        </span>
        <div className="grid grid-cols-6 gap-1.5">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const status = getDayStatus(day);
            const isSelected = selectedDay === day;
            const isToday = todayDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`
                  relative h-11 rounded-lg text-sm font-black transition-all duration-200 border
                  ${isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                    : status === "completed"
                    ? "bg-green-500/15 text-green-600 border-green-500/30 dark:text-green-400"
                    : status === "missed"
                    ? "bg-red-500/10 text-red-500 border-red-500/20"
                    : isToday
                    ? "bg-primary/10 text-primary border-primary/40 ring-2 ring-primary/30"
                    : "bg-card text-foreground border-border hover:border-primary/50"
                  }
                `}
                data-testid={`button-day-${day}`}
              >
                {day}
                {status === "completed" && !isSelected && (
                  <span className="absolute -top-1 -left-1 text-green-500 text-[10px]">✅</span>
                )}
                {status === "missed" && !isSelected && (
                  <span className="absolute -top-1 -left-1 text-red-500 text-[10px]">❗</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Info */}
      <Card className="border-border">
        <CardContent className="py-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-black text-foreground">
              {isArabic ? `الجزء ${selectedDay}` : `Juz ${selectedDay}`}
            </div>
            {juzData && (
              <div className="text-xs text-muted-foreground">
                {juzData.ayahs.length} {isArabic ? "آية" : "ayahs"}
              </div>
            )}
            {startDate && (
              <div className="text-xs text-muted-foreground/70">
                {getDayDate(startDate, selectedDay)}
              </div>
            )}
          </div>
          <Button
            onClick={() => toggleComplete(selectedDay)}
            variant={completion[selectedDay]?.completed ? "secondary" : "outline"}
            size="sm"
            className="font-bold rounded-lg"
            data-testid="button-mark-selected"
          >
            {completion[selectedDay]?.completed ? (
              <>
                <CheckCircle2 className="w-4 h-4 ml-1 text-green-500" />
                {isArabic ? "تراجع" : "Undo"}
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 ml-1" />
                {isArabic ? "تم" : "Done"}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Font Size Controls + Search */}
      <div className="flex gap-2 items-center flex-wrap">
        {/* Font Size */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-xl px-2 py-1.5">
          <Type className="w-4 h-4 text-muted-foreground" />
          <button
            onClick={decreaseFontSize}
            disabled={fontSize <= FONT_SIZES[0].value}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted disabled:opacity-30 transition-colors"
            data-testid="button-font-decrease"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-foreground min-w-[60px] text-center">
            {currentFontLabel()}
          </span>
          <button
            onClick={increaseFontSize}
            disabled={fontSize >= FONT_SIZES[FONT_SIZES.length - 1].value}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted disabled:opacity-30 transition-colors"
            data-testid="button-font-increase"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        {showSearch ? (
          <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isArabic ? "ابحث داخل الجزء..." : "Search in Juz..."}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
              dir="rtl"
              autoFocus
              data-testid="input-search-juz"
            />
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchQuery("");
              }}
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSearch(true)}
            className="rounded-xl"
            data-testid="button-search"
          >
            <Search className="w-4 h-4 ml-1" />
            {isArabic ? "بحث" : "Search"}
          </Button>
        )}
      </div>

      {/* Quran Text Area */}
      <div
        ref={textContainerRef}
        className="relative bg-card border-2 border-border rounded-2xl overflow-y-auto shadow-inner"
        style={{ maxHeight: "70vh" }}
        data-testid="quran-text-container"
      >
        {loading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-8 w-48 mx-auto mt-6" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ) : fetchError ? (
          <div className="p-8 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
            <p className="text-destructive font-bold">{fetchError}</p>
            <Button onClick={() => fetchJuz(selectedDay)} variant="outline" data-testid="button-retry">
              {isArabic ? "إعادة المحاولة" : "Retry"}
            </Button>
          </div>
        ) : filteredGroups.length === 0 && searchQuery ? (
          <div className="p-8 text-center text-muted-foreground">
            {isArabic ? "لا توجد نتائج" : "No results found"}
          </div>
        ) : (
          <div className="p-4 md:p-6 space-y-6">
            {filteredGroups.map((group) => (
              <div key={`${selectedDay}-${group.surahNumber}`} className="space-y-3">
                {/* Surah Header */}
                <div className="sticky top-0 z-10 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl py-3 px-4 text-center shadow-sm">
                  <h3 className="text-xl font-black text-primary font-serif">
                    سورة {group.surahName}
                  </h3>
                </div>

                {/* Ayahs - flowing text style */}
                <div
                  className="text-foreground px-2"
                  style={{
                    fontFamily: "'Amiri', 'Traditional Arabic', serif",
                    fontSize: `${fontSize}px`,
                    lineHeight: "2.8",
                  }}
                  dir="rtl"
                >
                  {group.ayahs.map((ayah) => {
                    const highlighted =
                      searchQuery && ayah.text.includes(searchQuery.trim());
                    return (
                      <span
                        key={ayah.number}
                        className={highlighted ? "bg-yellow-300/40 dark:bg-yellow-600/30 rounded px-1" : ""}
                      >
                        {ayah.text}{" "}
                        <span
                          className="inline-flex items-center justify-center font-bold text-primary/70 mx-1 select-none"
                          style={{ fontSize: `${ayahNumberSize}px` }}
                        >
                          ﴿{ayah.numberInSurah.toLocaleString("ar-SA")}﴾
                        </span>{" "}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* End of Juz */}
            {filteredGroups.length > 0 && !searchQuery && (
              <div className="text-center py-6 space-y-3 border-t border-border/50">
                <div className="text-2xl">🤲</div>
                <p className="text-muted-foreground font-bold text-lg">
                  {isArabic
                    ? `انتهى الجزء ${selectedDay}`
                    : `End of Juz ${selectedDay}`}
                </p>
                {!completion[selectedDay]?.completed && (
                  <Button
                    onClick={() => toggleComplete(selectedDay)}
                    className="rounded-xl font-bold"
                    data-testid="button-mark-end"
                  >
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                    {isArabic ? "وضع علامة تم" : "Mark Complete"}
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Scroll to top FAB */}
        <button
          onClick={scrollToTop}
          className="sticky bottom-4 float-left ml-4 bg-primary text-primary-foreground w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-20"
          data-testid="button-scroll-top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
