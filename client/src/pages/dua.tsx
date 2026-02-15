import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, X, Copy, Share2, ChevronDown, ChevronUp, BookOpen, ArrowUp, Minus, Plus, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDuaPreferences, type FontScale } from "@/hooks/use-dua-preferences";
import duasData from "@/data/hisn-al-muslim.json";

interface Dua {
  id: string;
  category: string;
  title: string;
  text: string;
  repeat: number;
  source: string;
}

const CATEGORIES = [
  "الكل",
  "أذكار الصباح",
  "أذكار المساء",
  "أذكار النوم",
  "أذكار الاستيقاظ",
  "أذكار الصلاة",
  "أذكار بعد الصلاة",
  "أذكار الأذان",
  "أذكار الطهارة",
  "أذكار الطعام",
  "دعاء السفر",
  "دعاء دخول المنزل",
  "دعاء الخروج من المنزل",
  "أدعية الهم والكرب",
  "دعاء المريض",
  "أدعية متنوعة",
];

const ITEMS_PER_PAGE_MOBILE = 8;
const ITEMS_PER_PAGE_DESKTOP = 12;

function normalizeArabic(text: string): string {
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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function DuaCard({
  dua,
  fontSize,
  lineHeight,
  compactMode,
}: {
  dua: Dua;
  fontSize: number;
  lineHeight: number;
  compactMode: boolean;
}) {
  const isLong = dua.text.length > 300;
  const defaultExpanded = compactMode ? false : dua.text.length < 500;
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    setExpanded(compactMode ? false : dua.text.length < 500);
  }, [compactMode, dua.text.length]);

  const handleCopy = useCallback(() => {
    const text = `${dua.title ? dua.title + "\n\n" : ""}${dua.text}\n\n${dua.source}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [dua]);

  const handleShare = useCallback(() => {
    const text = `${dua.title ? dua.title + "\n\n" : ""}${dua.text}\n\n📖 ${dua.source}\n\n— حصن المسلم`;
    if (navigator.share) {
      navigator.share({ title: dua.title || "دعاء من حصن المسلم", text });
    } else {
      navigator.clipboard.writeText(text);
    }
  }, [dua]);

  const baseFontSize = 18;
  const titleFontSize = 14;
  const textSize = baseFontSize * fontSize;
  const titleSize = titleFontSize * Math.min(fontSize, 1.15);
  const showCollapse = compactMode || isLong;

  return (
    <div
      className="bg-card border border-border rounded-2xl p-5 md:p-6 space-y-3 transition-all"
      dir="rtl"
      data-testid={`card-dua-${dua.id}`}
    >
      {dua.title && (
        <h3
          className="font-black text-primary leading-relaxed"
          style={{ fontSize: `${titleSize}px` }}
          data-testid={`text-dua-title-${dua.id}`}
        >
          {dua.title}
        </h3>
      )}

      {(!compactMode || expanded) && (
        <p
          className={cn(
            "text-foreground/90 font-medium whitespace-pre-line",
            showCollapse && !expanded ? "line-clamp-5" : ""
          )}
          style={{
            fontFamily: "'Amiri', 'Traditional Arabic', serif",
            fontSize: `${textSize}px`,
            lineHeight: `${lineHeight}`,
          }}
          data-testid={`text-dua-body-${dua.id}`}
        >
          {dua.text}
        </p>
      )}

      {compactMode && !expanded && (
        <p
          className="text-foreground/60 font-medium line-clamp-2"
          style={{
            fontFamily: "'Amiri', 'Traditional Arabic', serif",
            fontSize: `${textSize * 0.85}px`,
            lineHeight: "1.7",
          }}
        >
          {dua.text}
        </p>
      )}

      {showCollapse && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors min-h-[44px] px-2"
          data-testid={`button-expand-${dua.id}`}
        >
          {expanded ? (
            <>
              {t('show_less')}
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              {t('show_more')}
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center gap-3 flex-wrap">
          {dua.repeat > 1 && (
            <span
              className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-lg"
              data-testid={`badge-repeat-${dua.id}`}
            >
              {dua.repeat} {t('times_repeat')}
            </span>
          )}
          <span
            className="text-[11px] text-muted-foreground font-medium leading-snug"
            data-testid={`text-source-${dua.id}`}
          >
            {dua.source}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
            data-testid={`button-copy-${dua.id}`}
            aria-label={t('copy_label')}
          >
            {copied ? (
              <span className="text-sm font-bold text-green-500">✓</span>
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
            data-testid={`button-share-${dua.id}`}
            aria-label={t('share_action')}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DuaPage({ initialCategory }: { initialCategory?: string }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory || "الكل");

  useEffect(() => {
    if (initialCategory && initialCategory !== activeCategory) {
      setActiveCategory(initialCategory);
      setCurrentPage(1);
    }
  }, [initialCategory]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { fontScale, setFontScale, viewMode, setViewMode, fontSize, lineHeight } = useDuaPreferences();

  const duas = duasData as Dua[];
  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 150);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    duas.forEach((d) => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });
    return counts;
  }, [duas]);

  const filteredDuas = useMemo(() => {
    let results = duas;

    if (activeCategory !== "الكل") {
      results = results.filter((d) => d.category === activeCategory);
    }

    if (debouncedQuery.trim()) {
      const normalized = normalizeArabic(debouncedQuery);
      results = results.filter((d) => {
        const t = normalizeArabic(d.title);
        const b = normalizeArabic(d.text);
        const s = normalizeArabic(d.source);
        return t.includes(normalized) || b.includes(normalized) || s.includes(normalized);
      });
    }

    return results;
  }, [duas, activeCategory, debouncedQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredDuas.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedDuas = filteredDuas.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, debouncedQuery]);

  const goToPage = useCallback(
    (page: number) => {
      const p = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(p);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [totalPages]
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fontScales: FontScale[] = ["small", "medium", "large"];
  const currentScaleIndex = fontScales.indexOf(fontScale);

  return (
    <div className="flex flex-col space-y-4 animate-in fade-in duration-500 pb-8 max-w-[900px] mx-auto" dir="rtl" ref={topRef}>
      <div className="space-y-1">
        <h2 className="text-xl font-black text-primary font-serif flex items-center gap-2" data-testid="text-dua-header">
          <BookOpen className="w-5 h-5" />
          {t('duas_header')}
        </h2>
        <p className="text-sm text-muted-foreground font-medium" data-testid="text-dua-subtitle">
          {t('duas_subtitle')}
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-3 flex flex-wrap items-center gap-3 justify-between" data-testid="controls-reading">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => currentScaleIndex > 0 && setFontScale(fontScales[currentScaleIndex - 1])}
            disabled={currentScaleIndex === 0}
            className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center bg-muted hover:bg-muted/80 disabled:opacity-30 transition-colors"
            data-testid="button-font-decrease"
            aria-label="Decrease font"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center bg-primary/10 text-primary font-black text-sm" data-testid="text-font-scale">
            {fontScale === "small" ? "A" : fontScale === "medium" ? "A+" : "A++"}
          </span>
          <button
            onClick={() => currentScaleIndex < 2 && setFontScale(fontScales[currentScaleIndex + 1])}
            disabled={currentScaleIndex === 2}
            className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center bg-muted hover:bg-muted/80 disabled:opacity-30 transition-colors"
            data-testid="button-font-increase"
            aria-label="Increase font"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => setViewMode(viewMode === "compact" ? "full" : "compact")}
          className="min-h-[44px] px-4 rounded-xl flex items-center gap-2 bg-muted hover:bg-muted/80 transition-colors text-sm font-bold text-foreground"
          data-testid="button-toggle-view"
        >
          {viewMode === "compact" ? (
            <>
              <Eye className="w-4 h-4" />
              {t('full_view')}
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4" />
              {t('compact_view')}
            </>
          )}
        </button>
      </div>

      <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 min-h-[48px]">
        <Search className="w-4.5 h-4.5 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('search_duas')}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm py-3"
          dir="rtl"
          data-testid="input-search-dua"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="min-w-[36px] min-h-[36px] rounded-full bg-muted flex items-center justify-center shrink-0"
            data-testid="button-clear-dua-search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {debouncedQuery.trim() && (
        <p className="text-xs font-bold text-muted-foreground" data-testid="text-search-results-count">
          {t('results_count', { count: filteredDuas.length })}
        </p>
      )}

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CATEGORIES.map((cat) => {
          const count = cat === "الكل" ? duas.length : (categoryCounts[cat] || 0);
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap px-4 py-2.5 min-h-[44px] rounded-xl text-sm font-bold transition-colors shrink-0",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              )}
              data-testid={`button-category-${cat}`}
            >
              {cat} {isActive && cat !== "الكل" ? `(${count})` : ""}
            </button>
          );
        })}
      </div>

      {!debouncedQuery.trim() && (
        <p className="text-xs font-bold text-muted-foreground" data-testid="text-dua-count">
          {filteredDuas.length} {t('dua_unit')}
          {totalPages > 1 && (
            <span className="text-muted-foreground/60">
              {" "} · {t('page_x_of_y', { page: safePage, total: totalPages })}
            </span>
          )}
        </p>
      )}

      <div className="space-y-3">
        {paginatedDuas.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="font-bold">{t('no_duas_found')}</p>
            <p className="text-xs mt-1">{t('try_different_category')}</p>
          </div>
        ) : (
          paginatedDuas.map((dua) => (
            <DuaCard
              key={dua.id}
              dua={dua}
              fontSize={fontSize}
              lineHeight={lineHeight}
              compactMode={viewMode === "compact"}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4 pb-2 flex-wrap" data-testid="pagination-controls">
          <button
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage <= 1}
            className="min-h-[44px] px-5 rounded-xl bg-card border border-border text-foreground font-bold text-sm hover:bg-muted disabled:opacity-30 transition-colors"
            data-testid="button-prev-page"
          >
            {t('previous')}
          </button>

          <div className="flex items-center gap-2">
            <select
              value={safePage}
              onChange={(e) => goToPage(Number(e.target.value))}
              className="min-h-[44px] px-3 rounded-xl bg-card border border-border text-foreground font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none text-center"
              dir="ltr"
              data-testid="select-page-jump"
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="text-sm font-bold text-muted-foreground">/ {totalPages}</span>
          </div>

          <button
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage >= totalPages}
            className="min-h-[44px] px-5 rounded-xl bg-card border border-border text-foreground font-bold text-sm hover:bg-muted disabled:opacity-30 transition-colors"
            data-testid="button-next-page"
          >
            {t('next')}
          </button>
        </div>
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 left-4 z-50 min-h-[48px] min-w-[48px] rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
          data-testid="button-scroll-top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
