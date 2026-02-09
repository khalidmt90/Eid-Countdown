import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
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
  Maximize2,
  Minimize2,
  Minus,
  Plus,
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
const LS_KEY_FOCUS = "khatmFocusMode";

const AYAHS_PER_PAGE = 12;

const FONT_STEPS = [18, 22, 26, 30, 34, 38, 44];
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

function getLineHeight(fs: number): string {
  if (fs <= 22) return "2.4";
  if (fs <= 26) return "2.6";
  if (fs <= 30) return "2.8";
  if (fs <= 34) return "3.0";
  return "3.2";
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

const SURAH_AYAH_COUNTS: Record<number, number> = {
  1:7,2:286,3:200,4:176,5:120,6:165,7:206,8:75,9:129,10:109,
  11:123,12:111,13:43,14:52,15:99,16:128,17:111,18:110,19:98,20:135,
  21:112,22:78,23:118,24:64,25:77,26:227,27:93,28:88,29:69,30:60,
  31:34,32:30,33:73,34:54,35:45,36:83,37:182,38:88,39:75,40:85,
  41:54,42:53,43:89,44:59,45:37,46:35,47:38,48:29,49:18,50:45,
  51:60,52:49,53:62,54:55,55:78,56:96,57:29,58:22,59:24,60:13,
  61:14,62:11,63:11,64:18,65:12,66:12,67:30,68:52,69:52,70:44,
  71:28,72:28,73:20,74:56,75:40,76:31,77:50,78:40,79:46,80:42,
  81:29,82:19,83:36,84:25,85:22,86:17,87:19,88:26,89:30,90:20,
  91:15,92:21,93:11,94:8,95:8,96:19,97:5,98:8,99:8,100:11,
  101:11,102:8,103:3,104:9,105:5,106:4,107:7,108:3,109:6,110:3,
  111:5,112:4,113:5,114:6,
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
  const [showFontSheet, setShowFontSheet] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [focusMode, setFocusMode] = useState(() => {
    return localStorage.getItem(LS_KEY_FOCUS) === "true";
  });
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_FONT_SIZE);
    return saved ? parseInt(saved) : DEFAULT_FONT_SIZE;
  });
  const [controlsHidden, setControlsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = 80;

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
    localStorage.setItem(LS_KEY_FOCUS, String(focusMode));
  }, [focusMode]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current + scrollThreshold && currentY > 200) {
        setControlsHidden(true);
      } else if (currentY < lastScrollY.current - 30 || currentY < 100) {
        setControlsHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  const remaining = 30 - completedCount;

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
    const groups: { surahNumber: number; surahName: string; surahAyahCount: number; ayahs: Ayah[] }[] = [];
    let currentSurah = -1;

    for (const ayah of currentPageAyahs) {
      if (ayah.surah.number !== currentSurah) {
        currentSurah = ayah.surah.number;
        groups.push({
          surahNumber: ayah.surah.number,
          surahName: SURAH_NAMES_AR[ayah.surah.number] || ayah.surah.name,
          surahAyahCount: SURAH_AYAH_COUNTS[ayah.surah.number] || ayah.surah.numberOfAyahs,
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

  const fontUp = () => {
    const idx = FONT_STEPS.indexOf(fontSize);
    if (idx < FONT_STEPS.length - 1) setFontSize(FONT_STEPS[idx + 1]);
    else if (idx === -1) {
      const next = FONT_STEPS.find((s) => s > fontSize);
      if (next) setFontSize(next);
    }
  };

  const fontDown = () => {
    const idx = FONT_STEPS.indexOf(fontSize);
    if (idx > 0) setFontSize(FONT_STEPS[idx - 1]);
    else if (idx === -1) {
      const prev = [...FONT_STEPS].reverse().find((s) => s < fontSize);
      if (prev) setFontSize(prev);
    }
  };

  const ayahNumberSize = Math.max(12, Math.round(fontSize * 0.55));
  const pageProgressPercent = totalPages > 0 ? Math.round(((currentPage + 1) / totalPages) * 100) : 0;

  const showTopControls = !focusMode && !controlsHidden;

  return (
    <div className="flex flex-col space-y-3 animate-in fade-in duration-500 pb-28" dir="rtl">

      {/* === TOP CONTROLS (hide on scroll / focus mode) === */}
      <div
        className={`transition-all duration-300 space-y-3 overflow-hidden ${
          showTopControls ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-primary font-serif flex items-center gap-2">
            <span className="text-2xl">📖</span>
            {isArabic ? "ختم القرآن في رمضان" : "Ramadan Quran Khatm"}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFocusMode(true)}
              className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
              title={isArabic ? "وضع التركيز" : "Focus Mode"}
              data-testid="button-focus-on"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setShowDatePicker(!showDatePicker); setShowSettings(false); }}
              className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
              data-testid="button-calendar"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setShowSettings(!showSettings); setShowDatePicker(false); }}
              className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
              data-testid="button-settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Date Picker */}
        {showDatePicker && (
          <div className="border border-primary/30 bg-primary/5 rounded-xl p-4 space-y-3">
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
              <Button onClick={handleSaveDate} disabled={!dateInput} className="rounded-xl font-bold px-6" data-testid="button-save-date">
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
          </div>
        )}

        {showSettings && (
          <div className="border border-destructive/30 bg-destructive/5 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm font-bold">
              {isArabic ? "إعادة تعيين تاريخ رمضان" : "Reset Ramadan date"}
            </span>
            <Button variant="destructive" size="sm" onClick={handleResetDate} data-testid="button-reset-date">
              {isArabic ? "إعادة تعيين" : "Reset"}
            </Button>
          </div>
        )}

        {/* Motivation Progress */}
        <div className="bg-card border border-border rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-black text-foreground">
              {isArabic ? `اليوم ${completedCount} من 30` : `Day ${completedCount} of 30`}
            </span>
            <span className="text-muted-foreground font-bold text-xs">
              {remaining > 0
                ? (isArabic ? `تبقى ${remaining} يومًا لإتمام الختمة` : `${remaining} days remaining`)
                : (isArabic ? "🎉 أتممت الختمة!" : "🎉 Khatm Complete!")}
            </span>
          </div>
          <Progress value={Math.round((completedCount / 30) * 100)} className="h-2" data-testid="progress-khatm" />
        </div>

        {/* Catch-up */}
        {oldestMissedDay !== null && (
          <button
            onClick={() => selectDay(oldestMissedDay)}
            className="w-full h-9 rounded-xl text-xs font-bold border border-amber-500/50 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 flex items-center justify-center gap-2"
            data-testid="button-catchup"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {isArabic ? `انتقل لأقدم يوم فاتني (يوم ${oldestMissedDay})` : `Catch up: Day ${oldestMissedDay}`}
          </button>
        )}
      </div>

      {/* === DAY NAVIGATION (quick prev/next) === */}
      <div className="flex items-center gap-1.5 bg-card border border-border rounded-xl px-2 py-1.5">
        <button
          onClick={() => selectedDay > 1 && selectDay(selectedDay - 1)}
          disabled={selectedDay <= 1}
          className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-muted disabled:opacity-30 transition-colors shrink-0"
          data-testid="button-prev-day"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => setShowDaySheet(true)}
          className="flex-1 min-w-0 text-center py-1"
          data-testid="button-open-day-picker"
        >
          <div className="text-sm font-black text-foreground truncate">
            {isArabic ? `الجزء ${selectedDay}` : `Juz ${selectedDay}`}
            {isRamadanActive && todayDay === selectedDay && (
              <span className="text-[10px] bg-primary/15 text-primary font-bold px-1.5 py-0.5 rounded-md mr-1.5">
                {isArabic ? "اليوم" : "Today"}
              </span>
            )}
          </div>
          {startDate && (
            <div className="text-[10px] text-muted-foreground/70 truncate">
              {isArabic ? `يوم ${selectedDay} من رمضان` : `Ramadan Day ${selectedDay}`}
            </div>
          )}
        </button>

        <button
          onClick={() => selectedDay < 30 && selectDay(selectedDay + 1)}
          disabled={selectedDay >= 30}
          className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-muted disabled:opacity-30 transition-colors shrink-0"
          data-testid="button-next-day"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="w-px h-7 bg-border mx-0.5" />

        <button
          onClick={() => toggleComplete(selectedDay)}
          className={`h-9 px-2.5 rounded-lg flex items-center justify-center gap-1 text-xs font-bold transition-colors shrink-0 ${
            completion[selectedDay]?.completed
              ? "bg-green-500/10 text-green-600"
              : "hover:bg-muted text-muted-foreground"
          }`}
          data-testid="button-mark-selected"
        >
          {completion[selectedDay]?.completed ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <Circle className="w-4 h-4" />
          )}
          {isArabic ? (completion[selectedDay]?.completed ? "تم" : "إتمام") : (completion[selectedDay]?.completed ? "Done" : "Done")}
        </button>
      </div>

      {/* === STICKY MINI HEADER with page progress === */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50 pb-1.5 pt-1 -mx-1 px-1">
        <div className="flex items-center justify-between text-xs font-bold text-muted-foreground px-1 mb-1">
          <span>
            {isArabic ? `الجزء ${selectedDay}` : `Juz ${selectedDay}`}
            {totalPages > 1 && (
              <span className="text-foreground mr-1">
                {" • "}
                {isArabic ? `صفحة ${currentPage + 1} / ${totalPages}` : `Page ${currentPage + 1}/${totalPages}`}
              </span>
            )}
          </span>
          {focusMode && (
            <button
              onClick={() => setFocusMode(false)}
              className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
              data-testid="button-focus-off"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {totalPages > 1 && (
          <div className="h-1 bg-muted rounded-full overflow-hidden mx-1">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${pageProgressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* === SEARCH PANEL (expandable) === */}
      {showSearch && (
        <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(0); }}
              placeholder={isArabic ? "اكتب بدون تشكيل — البحث ذكي" : "Type without diacritics — smart search"}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
              dir="rtl"
              autoFocus
              data-testid="input-search-juz"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setCurrentPage(0); }}
                className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0"
                data-testid="button-clear-search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {normalizedQuery && (
            <div className="text-xs font-bold text-muted-foreground px-1" data-testid="text-search-count">
              {filteredAyahs.length > 0
                ? (isArabic ? `${filteredAyahs.length} نتيجة` : `${filteredAyahs.length} results`)
                : (isArabic ? "لا توجد نتائج" : "No results")}
            </div>
          )}
        </div>
      )}

      {/* === FONT SIZE BOTTOM SHEET === */}
      {showFontSheet && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200"
          onClick={() => setShowFontSheet(false)}
        >
          <div
            className="bg-card w-full max-w-lg rounded-t-3xl p-5 pb-8 space-y-5 animate-in slide-in-from-bottom-8 duration-400"
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-foreground">
                {isArabic ? "حجم الخط" : "Font Size"}
              </h3>
              <button onClick={() => setShowFontSheet(false)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-6">
              <button
                onClick={fontDown}
                disabled={fontSize <= FONT_STEPS[0]}
                className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center disabled:opacity-30 active:scale-95 transition-transform"
                data-testid="button-font-decrease"
              >
                <span className="text-xl font-black">A-</span>
              </button>

              <div className="text-center">
                <div className="text-3xl font-black text-foreground">{fontSize}</div>
                <div className="text-xs text-muted-foreground">{isArabic ? "بكسل" : "px"}</div>
              </div>

              <button
                onClick={fontUp}
                disabled={fontSize >= FONT_STEPS[FONT_STEPS.length - 1]}
                className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center disabled:opacity-30 active:scale-95 transition-transform"
                data-testid="button-font-increase"
              >
                <span className="text-xl font-black">A+</span>
              </button>
            </div>

            <div
              className="border border-border rounded-xl p-4 text-center"
              style={{
                fontFamily: "'Amiri', 'Traditional Arabic', serif",
                fontSize: `${fontSize}px`,
                lineHeight: getLineHeight(fontSize),
                color: "hsl(var(--foreground) / 0.85)",
              }}
              dir="rtl"
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </div>
          </div>
        </div>
      )}

      {/* === CONTINUE READING === */}
      {hasSavedPosition && !searchQuery && (
        <button
          onClick={() => {
            const saved = getReadPosition(selectedDay);
            if (saved) {
              setCurrentPage(saved.page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="w-full h-10 rounded-xl font-bold text-sm border border-primary/40 text-primary flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
          data-testid="button-continue-reading"
        >
          <Bookmark className="w-4 h-4" />
          {isArabic
            ? `تابع من حيث توقفت (صفحة ${(savedPos?.page || 0) + 1})`
            : `Continue where you stopped (page ${(savedPos?.page || 0) + 1})`}
        </button>
      )}

      {/* === QURAN TEXT === */}
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
          <Button onClick={() => fetchJuz(selectedDay)} variant="outline" data-testid="button-retry">
            {isArabic ? "إعادة المحاولة" : "Retry"}
          </Button>
        </div>
      ) : filteredAyahs.length === 0 && normalizedQuery ? (
        <div className="py-8 text-center text-muted-foreground">
          {isArabic ? "لا توجد نتائج" : "No results found"}
        </div>
      ) : (
        <>
          <div className="space-y-5" data-testid="quran-text-container">
            {pageGroups.map((group) => (
              <div key={`${selectedDay}-${group.surahNumber}-${currentPage}`} className="space-y-3">
                {/* Decorative Surah Header */}
                <div className="relative py-4 px-5 text-center">
                  <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <div className="bg-primary/8 border border-primary/15 rounded-2xl py-4 px-5 space-y-1">
                    <h3 className="text-lg font-black text-primary font-serif">
                      سورة {group.surahName}
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-bold">
                      {group.surahAyahCount} {isArabic ? "آية" : "verses"}
                    </p>
                  </div>
                  <div className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                </div>

                {/* Ayah Text */}
                <div
                  className="px-2"
                  style={{
                    fontFamily: "'Amiri', 'Traditional Arabic', serif",
                    fontSize: `${fontSize}px`,
                    lineHeight: getLineHeight(fontSize),
                    color: "hsl(var(--foreground) / 0.85)",
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
                          className="inline-flex items-center justify-center font-bold text-primary/60 mx-0.5 select-none"
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

          {/* Bottom Pagination */}
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

          {/* End of Juz */}
          {currentPage === totalPages - 1 && !searchQuery && totalPages > 0 && (
            <div className="text-center py-6 space-y-3 border-t border-border/50">
              <div className="text-2xl">🤲</div>
              <p className="text-muted-foreground font-bold text-lg">
                {isArabic ? `انتهى الجزء ${selectedDay}` : `End of Juz ${selectedDay}`}
              </p>
              {!completion[selectedDay]?.completed && (
                <Button onClick={() => toggleComplete(selectedDay)} className="rounded-xl font-bold h-12 px-8" data-testid="button-mark-end">
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                  {isArabic ? "وضع علامة تم" : "Mark Complete"}
                </Button>
              )}
              {selectedDay < 30 && (
                <Button onClick={() => selectDay(selectedDay + 1)} variant="outline" className="rounded-xl font-bold" data-testid="button-next-juz">
                  {isArabic ? `الانتقال للجزء ${selectedDay + 1}` : `Go to Juz ${selectedDay + 1}`}
                </Button>
              )}
            </div>
          )}
        </>
      )}

      {/* === FLOATING BOTTOM TOOLBAR === */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 bg-card/95 backdrop-blur-md border border-border shadow-xl rounded-2xl px-2 py-1.5 animate-in slide-in-from-bottom-2 duration-300">
        <button
          onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearchQuery(""); setShowFontSheet(false); }}
          className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
            showSearch ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
          data-testid="button-search-fab"
        >
          <Search className="w-4.5 h-4.5" />
        </button>

        <button
          onClick={() => { setShowFontSheet(!showFontSheet); setShowSearch(false); }}
          className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
            showFontSheet ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
          data-testid="button-font-fab"
        >
          <Type className="w-4.5 h-4.5" />
        </button>

        <button
          onClick={() => setShowDaySheet(true)}
          className="h-10 w-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
          data-testid="button-day-fab"
        >
          <Calendar className="w-4.5 h-4.5" />
        </button>

        <button
          onClick={() => setFocusMode(!focusMode)}
          className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
            focusMode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
          data-testid="button-focus-fab"
        >
          {focusMode ? <Minimize2 className="w-4.5 h-4.5" /> : <Maximize2 className="w-4.5 h-4.5" />}
        </button>
      </div>

      {/* === DAY PICKER BOTTOM SHEET === */}
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
            <div className="flex justify-center">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-foreground">
                {isArabic ? "اختر اليوم" : "Select Day"}
              </h3>
              <button onClick={() => setShowDaySheet(false)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center" data-testid="button-close-day-sheet">
                <X className="w-4 h-4" />
              </button>
            </div>

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
    </div>
  );
}
