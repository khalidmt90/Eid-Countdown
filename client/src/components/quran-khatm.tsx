import { useState, useEffect, useCallback, useMemo } from "react";
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
  Settings,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Eye,
  EyeOff,
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

interface ReadPosition {
  page: number;
  timestamp: string;
}

const LS_KEY_START = "ramadanStartDateISO";
const LS_KEY_COMPLETION = "khatmCompletion";
const LS_KEY_JUZ_CACHE = "juzCache";
const LS_KEY_LAST_DAY = "lastSelectedDay";
const LS_KEY_FONT_SIZE = "khatmFontSize";
const LS_KEY_READ_POS = "khatmReadPosition";
const LS_KEY_READING_MODE = "khatmReadingMode";

const AYAHS_PER_PAGE = 12;

const FONT_SIZES = [
  { label: "صغير", labelEn: "S", value: 20 },
  { label: "متوسط", labelEn: "M", value: 26 },
  { label: "كبير", labelEn: "L", value: 32 },
  { label: "كبير جداً", labelEn: "XL", value: 38 },
];

const DEFAULT_FONT_SIZE = 26;

function normalizeArabicForSearch(text: string): string {
  return (text || "")
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ـ/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

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

function getReadPosition(juz: number): ReadPosition | null {
  try {
    const all = JSON.parse(localStorage.getItem(LS_KEY_READ_POS) || "{}");
    return all[juz] || null;
  } catch {
    return null;
  }
}

function saveReadPosition(juz: number, page: number) {
  try {
    const all = JSON.parse(localStorage.getItem(LS_KEY_READ_POS) || "{}");
    all[juz] = { page, timestamp: new Date().toISOString() };
    localStorage.setItem(LS_KEY_READ_POS, JSON.stringify(all));
  } catch {}
}

function computeTodayDay(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diff = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
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
  const [showDaySheet, setShowDaySheet] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [readingMode, setReadingMode] = useState(() => {
    return localStorage.getItem(LS_KEY_READING_MODE) === "true";
  });
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_FONT_SIZE);
    return saved ? parseInt(saved) : DEFAULT_FONT_SIZE;
  });

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

  useEffect(() => {
    localStorage.setItem(LS_KEY_READING_MODE, String(readingMode));
  }, [readingMode]);

  const fetchJuz = useCallback(
    async (juzNumber: number) => {
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
      } catch {
        setFetchError(
          isArabic
            ? "حدث خطأ في تحميل الجزء. تحقق من الاتصال بالإنترنت."
            : "Error loading Juz. Check your internet connection."
        );
      } finally {
        setLoading(false);
      }
    },
    [isArabic]
  );

  useEffect(() => {
    setJuzData(null);
    setCurrentPage(0);
    fetchJuz(selectedDay);
  }, [selectedDay, fetchJuz]);

  useEffect(() => {
    if (juzData) {
      const saved = getReadPosition(selectedDay);
      if (saved && saved.page > 0) {
        setCurrentPage(saved.page);
      } else {
        setCurrentPage(0);
      }
    }
  }, [juzData, selectedDay]);

  useEffect(() => {
    if (juzData && currentPage > 0) {
      saveReadPosition(selectedDay, currentPage);
    }
  }, [currentPage, selectedDay, juzData]);

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

  const indexedAyahs = useMemo(() => {
    if (!juzData) return [];
    return juzData.ayahs.map((a) => ({
      ...a,
      searchText: normalizeArabicForSearch(a.text),
    }));
  }, [juzData]);

  const normalizedQuery = useMemo(() => {
    return normalizeArabicForSearch(searchQuery);
  }, [searchQuery]);

  const filteredAyahs = useMemo(() => {
    if (!normalizedQuery) return indexedAyahs;
    const words = normalizedQuery.split(" ").filter(Boolean);
    return indexedAyahs.filter((a) =>
      words.every((w) => a.searchText.includes(w))
    );
  }, [indexedAyahs, normalizedQuery]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredAyahs.length / AYAHS_PER_PAGE);
  }, [filteredAyahs]);

  const currentPageAyahs = useMemo(() => {
    const start = currentPage * AYAHS_PER_PAGE;
    return filteredAyahs.slice(start, start + AYAHS_PER_PAGE);
  }, [filteredAyahs, currentPage]);

  const pageGroups = useMemo(() => {
    const groups: { surahNumber: number; surahName: string; ayahs: Ayah[] }[] = [];
    let currentSurah = -1;

    for (const ayah of currentPageAyahs) {
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
  }, [currentPageAyahs]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const savedPos = getReadPosition(selectedDay);
  const hasSavedPosition = savedPos !== null && savedPos.page > 0 && currentPage === 0;

  const selectDay = (day: number) => {
    setSelectedDay(day);
    setShowDaySheet(false);
    setSearchQuery("");
    setShowSearch(false);
  };

  const ayahNumberSize = Math.max(12, Math.round(fontSize * 0.55));

  const fontSizeIndex = FONT_SIZES.findIndex((f) => f.value === fontSize);

  return (
    <div className="flex flex-col space-y-3 animate-in fade-in duration-500 pb-24" dir="rtl">
      {/* === HEADER === */}
      {!readingMode && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-primary font-serif flex items-center gap-2">
              <span className="text-2xl">📖</span>
              {isArabic ? "ختم القرآن في رمضان" : "Ramadan Quran Khatm"}
            </h2>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowDatePicker(!showDatePicker);
                  setShowSettings(false);
                }}
                data-testid="button-calendar"
              >
                <Calendar className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowDatePicker(false);
                }}
                data-testid="button-settings"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Date Picker (collapsed by default) */}
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
            <CardContent className="py-3 space-y-2">
              <div className="flex items-center justify-between text-sm font-bold">
                <span>{isArabic ? "تقدم الختمة" : "Khatm Progress"}</span>
                <span className="text-primary">
                  {completedCount}/30 ({progressPercent}%)
                </span>
              </div>
              <Progress value={progressPercent} className="h-2.5" data-testid="progress-khatm" />
            </CardContent>
          </Card>

          {/* Catch-up Button */}
          {oldestMissedDay !== null && (
            <Button
              variant="outline"
              onClick={() => selectDay(oldestMissedDay)}
              className="w-full h-10 border-amber-500/50 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-bold rounded-xl text-sm"
              data-testid="button-catchup"
            >
              <AlertCircle className="w-4 h-4 ml-2" />
              {isArabic
                ? `انتقل لأقدم يوم فاتني (يوم ${oldestMissedDay})`
                : `Catch up: Day ${oldestMissedDay}`}
            </Button>
          )}
        </>
      )}

      {/* === COMPACT DAY BAR (Issue A) === */}
      <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-foreground truncate">
              {isArabic ? `الجزء ${selectedDay}` : `Juz ${selectedDay}`}
            </span>
            {isRamadanActive && todayDay === selectedDay && (
              <span className="text-[10px] bg-primary/15 text-primary font-bold px-1.5 py-0.5 rounded-md">
                {isArabic ? "اليوم" : "Today"}
              </span>
            )}
          </div>
          {startDate && (
            <div className="text-[11px] text-muted-foreground/70 truncate">
              {isArabic ? `يوم ${selectedDay} من رمضان` : `Ramadan Day ${selectedDay}`}
              {" · "}
              {getDayDate(startDate, selectedDay)}
            </div>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDaySheet(true)}
          className="rounded-lg font-bold text-xs h-9 px-3 shrink-0"
          data-testid="button-open-day-picker"
        >
          📅 {isArabic ? "تغيير اليوم" : "Change Day"}
        </Button>

        <Button
          onClick={() => toggleComplete(selectedDay)}
          variant={completion[selectedDay]?.completed ? "secondary" : "outline"}
          size="sm"
          className="rounded-lg font-bold text-xs h-9 px-3 shrink-0"
          data-testid="button-mark-selected"
        >
          {completion[selectedDay]?.completed ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <Circle className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* === BOTTOM SHEET DAY PICKER (Issue A) === */}
      {showDaySheet && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200"
          onClick={() => setShowDaySheet(false)}
        >
          <div
            className="bg-card w-full max-w-lg rounded-t-3xl p-5 pb-8 space-y-4 animate-in slide-in-from-bottom-8 duration-400"
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="flex justify-center">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-foreground">
                {isArabic ? "اختر اليوم" : "Select Day"}
              </h3>
              <button
                onClick={() => setShowDaySheet(false)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                data-testid="button-close-day-sheet"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Today quick action */}
            {isRamadanActive && todayDay !== null && (
              <Button
                onClick={() => selectDay(todayDay)}
                className="w-full h-11 font-bold rounded-xl"
                variant={selectedDay === todayDay ? "default" : "outline"}
                data-testid="button-read-today"
              >
                <BookOpen className="w-4 h-4 ml-2" />
                {isArabic ? `اقرأ جزء اليوم (${todayDay})` : `Read Today's Juz (${todayDay})`}
              </Button>
            )}

            {/* Day chips grid */}
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                const status = getDayStatus(day);
                const isSelected = selectedDay === day;
                const isToday = todayDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => selectDay(day)}
                    className={`
                      relative h-12 rounded-xl text-sm font-black transition-all duration-200 border-2 active:scale-95
                      ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-lg"
                          : status === "completed"
                          ? "bg-green-500/15 text-green-600 border-green-500/30 dark:text-green-400"
                          : status === "missed"
                          ? "bg-red-500/10 text-red-500 border-red-500/20"
                          : isToday
                          ? "bg-primary/10 text-primary border-primary/40"
                          : "bg-background text-foreground border-border"
                      }
                    `}
                    data-testid={`button-day-${day}`}
                  >
                    {day}
                    {status === "completed" && !isSelected && (
                      <span className="absolute -top-1.5 -left-1.5 text-[11px]">✅</span>
                    )}
                    {status === "missed" && !isSelected && (
                      <span className="absolute -top-1.5 -left-1.5 text-[11px]">❗</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* === STICKY TOOLBAR: Font + Search + Reading Mode (Issue C) === */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border pb-2 pt-1 -mx-1 px-1">
        <div className="flex items-center gap-2">
          {/* Font Size Control */}
          <div className="flex items-center bg-card border border-border rounded-xl overflow-hidden">
            {FONT_SIZES.map((f, i) => (
              <button
                key={f.value}
                onClick={() => setFontSize(f.value)}
                className={`h-10 px-3 text-xs font-bold transition-colors
                  ${fontSize === f.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                  }
                  ${i < FONT_SIZES.length - 1 ? "border-l border-border" : ""}
                `}
                data-testid={`button-font-${f.labelEn}`}
              >
                {isArabic ? f.label : f.labelEn}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Reading Mode Toggle */}
          <button
            onClick={() => setReadingMode(!readingMode)}
            className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-colors ${
              readingMode
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:bg-muted"
            }`}
            title={isArabic ? "وضع القراءة" : "Reading Mode"}
            data-testid="button-reading-mode"
          >
            {readingMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          {/* Search Toggle */}
          <button
            onClick={() => {
              setShowSearch(!showSearch);
              if (showSearch) setSearchQuery("");
            }}
            className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-colors ${
              showSearch
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:bg-muted"
            }`}
            data-testid="button-search"
          >
            {showSearch ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>
        </div>

        {/* Search Input (expandable) */}
        {showSearch && (
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(0);
                }}
                placeholder={isArabic ? "اكتب بدون تشكيل — البحث ذكي" : "Type without diacritics — smart search"}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
                dir="rtl"
                autoFocus
                data-testid="input-search-juz"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setCurrentPage(0); }}
                  className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0"
                  data-testid="button-clear-search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            {normalizedQuery && (
              <div className="text-xs font-bold text-muted-foreground px-1" data-testid="text-search-count">
                {filteredAyahs.length > 0
                  ? (isArabic
                    ? `${filteredAyahs.length} نتيجة`
                    : `${filteredAyahs.length} results`)
                  : (isArabic ? "لا توجد نتائج" : "No results")}
              </div>
            )}
          </div>
        )}
      </div>

      {/* === CONTINUE READING BUTTON (Issue B) === */}
      {hasSavedPosition && !searchQuery && (
        <Button
          onClick={() => {
            const saved = getReadPosition(selectedDay);
            if (saved) {
              setCurrentPage(saved.page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          variant="outline"
          className="w-full h-11 rounded-xl font-bold border-primary/40 text-primary"
          data-testid="button-continue-reading"
        >
          <Bookmark className="w-4 h-4 ml-2" />
          {isArabic
            ? `تابع من آخر مكان (صفحة ${(savedPos?.page || 0) + 1})`
            : `Continue reading (page ${(savedPos?.page || 0) + 1})`}
        </Button>
      )}

      {/* === QURAN TEXT (Issue D: no nested scroll) === */}
      {loading ? (
        <div className="space-y-4 py-4">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-8 w-48 mx-auto mt-4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/5" />
        </div>
      ) : fetchError ? (
        <div className="py-8 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <p className="text-destructive font-bold">{fetchError}</p>
          <Button
            onClick={() => fetchJuz(selectedDay)}
            variant="outline"
            data-testid="button-retry"
          >
            {isArabic ? "إعادة المحاولة" : "Retry"}
          </Button>
        </div>
      ) : filteredAyahs.length === 0 && normalizedQuery ? (
        <div className="py-8 text-center text-muted-foreground">
          {isArabic ? "لا توجد نتائج" : "No results found"}
        </div>
      ) : (
        <>
          {/* Page indicator */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground font-bold">
              <span>
                {isArabic
                  ? `صفحة ${currentPage + 1} من ${totalPages}`
                  : `Page ${currentPage + 1} of ${totalPages}`}
              </span>
            </div>
          )}

          {/* Ayahs - flowing naturally in page (no scroll container) */}
          <div
            className={`space-y-4 ${readingMode ? "py-4" : ""}`}
            data-testid="quran-text-container"
          >
            {pageGroups.map((group) => (
              <div key={`${selectedDay}-${group.surahNumber}-${currentPage}`} className="space-y-3">
                <div className="bg-primary/10 border border-primary/20 rounded-xl py-3 px-4 text-center">
                  <h3 className="text-lg font-black text-primary font-serif">
                    سورة {group.surahName}
                  </h3>
                </div>

                <div
                  className="text-foreground px-1"
                  style={{
                    fontFamily: "'Amiri', 'Traditional Arabic', serif",
                    fontSize: `${fontSize}px`,
                    lineHeight: readingMode ? "3.2" : "2.8",
                    ...(readingMode ? { padding: "0 4px" } : {}),
                  }}
                  dir="rtl"
                >
                  {group.ayahs.map((ayah, idx) => {
                    const isMatch = normalizedQuery && (ayah as any).searchText?.includes(normalizedQuery);
                    const isFirstOnPage = idx === 0 && group === pageGroups[0];
                    return (
                      <span
                        key={ayah.number}
                        className={`
                          ${isMatch ? "bg-yellow-300/30 dark:bg-yellow-600/20 rounded-sm" : ""}
                          ${isFirstOnPage && !normalizedQuery ? "text-primary" : ""}
                        `}
                      >
                        {ayah.text}{" "}
                        <span
                          className="inline-flex items-center justify-center font-bold text-primary/70 mx-0.5 select-none"
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
          </div>

          {/* === PAGINATION CONTROLS (Issue B) === */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between gap-3 pt-2">
              <Button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0}
                variant="outline"
                className="flex-1 h-12 rounded-xl font-bold text-base gap-2"
                data-testid="button-prev-page"
              >
                <ChevronRight className="w-5 h-5" />
                {isArabic ? "السابق" : "Previous"}
              </Button>

              <span className="text-sm font-black text-muted-foreground whitespace-nowrap">
                {currentPage + 1}/{totalPages}
              </span>

              <Button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                variant="outline"
                className="flex-1 h-12 rounded-xl font-bold text-base gap-2"
                data-testid="button-next-page"
              >
                {isArabic ? "التالي" : "Next"}
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* End of Juz - shown on last page */}
          {currentPage === totalPages - 1 && !searchQuery && totalPages > 0 && (
            <div className="text-center py-6 space-y-3 border-t border-border/50">
              <div className="text-2xl">🤲</div>
              <p className="text-muted-foreground font-bold text-lg">
                {isArabic ? `انتهى الجزء ${selectedDay}` : `End of Juz ${selectedDay}`}
              </p>
              {!completion[selectedDay]?.completed && (
                <Button
                  onClick={() => toggleComplete(selectedDay)}
                  className="rounded-xl font-bold h-12 px-8"
                  data-testid="button-mark-end"
                >
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                  {isArabic ? "وضع علامة تم" : "Mark Complete"}
                </Button>
              )}
              {selectedDay < 30 && (
                <Button
                  onClick={() => selectDay(selectedDay + 1)}
                  variant="outline"
                  className="rounded-xl font-bold"
                  data-testid="button-next-juz"
                >
                  {isArabic
                    ? `الانتقال للجزء ${selectedDay + 1}`
                    : `Go to Juz ${selectedDay + 1}`}
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
