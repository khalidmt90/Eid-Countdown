import { useState, useMemo, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Search, X, Copy, Share2, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import duasData from "@/data/hisn-al-muslim.json";

interface Dua {
  id: number;
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
  "دعاء السفر",
  "دعاء دخول المنزل",
  "دعاء الخروج من المنزل",
  "أذكار الطعام",
];

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

function DuaCard({ dua }: { dua: Dua }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isLong = dua.text.length > 200;

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

  return (
    <div
      className="bg-card border border-border rounded-2xl p-4 space-y-3 transition-all"
      dir="rtl"
      data-testid={`card-dua-${dua.id}`}
    >
      {dua.title && (
        <h3 className="text-sm font-black text-primary" data-testid={`text-dua-title-${dua.id}`}>
          {dua.title}
        </h3>
      )}

      <p
        className={cn(
          "text-foreground/90 font-medium",
          isLong && !expanded ? "line-clamp-4" : ""
        )}
        style={{
          fontFamily: "'Amiri', 'Traditional Arabic', serif",
          fontSize: "18px",
          lineHeight: "1.9",
        }}
        data-testid={`text-dua-body-${dua.id}`}
      >
        {dua.text}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          data-testid={`button-expand-${dua.id}`}
        >
          {expanded ? (
            <>
              {isArabic ? "عرض أقل" : "Show less"}
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              {isArabic ? "عرض المزيد" : "Show more"}
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      )}

      <div className="flex items-center justify-between pt-1 border-t border-border/50">
        <div className="flex items-center gap-3">
          {dua.repeat > 1 && (
            <span
              className="text-[11px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-lg"
              data-testid={`badge-repeat-${dua.id}`}
            >
              {dua.repeat} {isArabic ? "مرات" : "times"}
            </span>
          )}
          <span className="text-[11px] text-muted-foreground font-medium" data-testid={`text-source-${dua.id}`}>
            {dua.source}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
            data-testid={`button-copy-${dua.id}`}
          >
            {copied ? (
              <span className="text-xs font-bold text-green-500">✓</span>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
            data-testid={`button-share-${dua.id}`}
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DuaPage() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("الكل");
  const scrollRef = useRef<HTMLDivElement>(null);

  const duas = duasData as Dua[];

  const filteredDuas = useMemo(() => {
    let results = duas;

    if (activeCategory !== "الكل") {
      results = results.filter((d) => d.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const normalized = normalizeArabic(searchQuery);
      results = results.filter((d) => {
        const searchTitle = normalizeArabic(d.title);
        const searchText = normalizeArabic(d.text);
        return searchTitle.includes(normalized) || searchText.includes(normalized);
      });
    }

    return results;
  }, [duas, activeCategory, searchQuery]);

  return (
    <div className="flex flex-col space-y-4 animate-in fade-in duration-500 pb-8" dir="rtl">
      <div className="space-y-1">
        <h2 className="text-xl font-black text-primary font-serif flex items-center gap-2" data-testid="text-dua-header">
          <BookOpen className="w-5 h-5" />
          {isArabic ? "الأدعية والأذكار" : "Duas & Adhkar"}
        </h2>
        <p className="text-sm text-muted-foreground font-medium" data-testid="text-dua-subtitle">
          {isArabic ? "أدعية وأذكار من حصن المسلم" : "Duas and Adhkar from Hisn Al-Muslim"}
        </p>
      </div>

      <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2.5">
        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isArabic ? "ابحث داخل الأدعية" : "Search duas..."}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
          dir="rtl"
          data-testid="input-search-dua"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0"
            data-testid="button-clear-dua-search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-colors shrink-0",
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-muted"
            )}
            data-testid={`button-category-${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredDuas.length > 0 && (
        <p className="text-xs font-bold text-muted-foreground" data-testid="text-dua-count">
          {filteredDuas.length} {isArabic ? "دعاء" : "duas"}
        </p>
      )}

      <div className="space-y-3">
        {filteredDuas.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="font-bold">{isArabic ? "لا توجد نتائج" : "No results found"}</p>
            <p className="text-xs mt-1">{isArabic ? "جرّب كلمات مختلفة أو فئة أخرى" : "Try different words or another category"}</p>
          </div>
        ) : (
          filteredDuas.map((dua) => <DuaCard key={dua.id} dua={dua} />)
        )}
      </div>
    </div>
  );
}