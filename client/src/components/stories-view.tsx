import { useState, useEffect, useMemo, useCallback } from "react";
import {
  BookOpen,
  Star,
  Quote,
  Users,
  ArrowRight,
  ArrowLeft,
  Clock,
  Search,
  ExternalLink,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { PROPHET_STORIES, PROPHET_GROUPS } from "@/data/prophet-stories";
import hadithData from "@/data/hadith-stories.json";
import { getReadingTimeMinutes } from "@/lib/reading-time";

type ViewState = "categories" | "prophets" | "hadiths" | "prophet-detail";

const ITEMS_PER_PAGE_MOBILE = 8;
const ITEMS_PER_PAGE_DESKTOP = 12;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

export function StoriesView() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const lang = isAr ? "ar" : "en";
  const isMobile = useIsMobile();

  const [storyFontSize, setStoryFontSize] = useState(() => {
    try {
      const saved = localStorage.getItem('storyFontScale');
      return saved ? parseInt(saved) : 18;
    } catch { return 18; }
  });

  const storyFontUp = () => {
    const next = Math.min(storyFontSize + 2, 28);
    setStoryFontSize(next);
    localStorage.setItem('storyFontScale', String(next));
  };

  const storyFontDown = () => {
    const next = Math.max(storyFontSize - 2, 14);
    setStoryFontSize(next);
    localStorage.setItem('storyFontScale', String(next));
  };

  const [view, setView] = useState<ViewState>(() => {
    const saved = localStorage.getItem("stories_last_view");
    if (saved === "prophets" || saved === "hadiths") return saved;
    return "categories";
  });
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [hadithPage, setHadithPage] = useState(1);
  const [hadithSearch, setHadithSearch] = useState("");
  const [expandedHadith, setExpandedHadith] = useState<string | null>(null);
  const [searchDebounced, setSearchDebounced] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSearchDebounced(hadithSearch), 300);
    return () => clearTimeout(timer);
  }, [hadithSearch]);

  useEffect(() => {
    if (view === "prophets" || view === "hadiths" || view === "categories") {
      localStorage.setItem("stories_last_view", view);
    }
  }, [view]);

  const navigateTo = useCallback((newView: ViewState) => {
    setView(newView);
    if (newView === "hadiths") {
      setHadithPage(1);
      setHadithSearch("");
      setExpandedHadith(null);
    }
  }, []);

  const filteredHadiths = useMemo(() => {
    if (!searchDebounced.trim()) return hadithData;
    const q = searchDebounced.toLowerCase();
    return hadithData.filter((h: any) => h.text.toLowerCase().includes(q));
  }, [searchDebounced]);

  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;
  const totalHadithPages = Math.ceil(filteredHadiths.length / itemsPerPage);
  const paginatedHadiths = filteredHadiths.slice(
    (hadithPage - 1) * itemsPerPage,
    hadithPage * itemsPerPage
  );

  const openProphetDetail = (index: number) => {
    setSelectedStoryIndex(index);
    setView("prophet-detail");
  };

  return (
    <div className="space-y-4 pb-20 w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {view === "categories" && (
          <CategoriesView
            key="categories"
            t={t}
            lang={lang}
            onNavigate={navigateTo}
          />
        )}
        {view === "prophets" && (
          <ProphetListView
            key="prophets"
            t={t}
            lang={lang}
            onBack={() => navigateTo("categories")}
            onSelectStory={openProphetDetail}
          />
        )}
        {view === "hadiths" && (
          <HadithListView
            key="hadiths"
            t={t}
            lang={lang}
            isAr={isAr}
            hadiths={paginatedHadiths}
            totalCount={filteredHadiths.length}
            page={hadithPage}
            totalPages={totalHadithPages}
            search={hadithSearch}
            expandedId={expandedHadith}
            onSearchChange={setHadithSearch}
            onPageChange={setHadithPage}
            onToggleExpand={(id) => setExpandedHadith(expandedHadith === id ? null : id)}
            onBack={() => navigateTo("categories")}
            fontSize={storyFontSize}
            onFontUp={storyFontUp}
            onFontDown={storyFontDown}
          />
        )}
        {view === "prophet-detail" && (
          <ProphetDetailView
            key="prophet-detail"
            t={t}
            lang={lang}
            storyIndex={selectedStoryIndex}
            onBack={() => navigateTo("prophets")}
            onNavigate={setSelectedStoryIndex}
            fontSize={storyFontSize}
            onFontUp={storyFontUp}
            onFontDown={storyFontDown}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoriesView({
  t,
  lang,
  onNavigate,
}: {
  t: any;
  lang: string;
  onNavigate: (view: ViewState) => void;
}) {
  const categories = [
    {
      id: "prophets",
      titleKey: "prophet_stories_title",
      titleAr: "قصص الأنبياء",
      subtitleEn: "Stories of the Prophets",
      icon: BookOpen,
      count: PROPHET_STORIES.length,
      color: "border-amber-500/40 bg-amber-500/5",
      iconColor: "text-amber-500",
      badgeColor: "bg-amber-500/10 text-amber-500",
      enabled: true,
    },
    {
      id: "seerah",
      titleKey: "seerah_title",
      titleAr: "السيرة النبوية",
      subtitleEn: "Prophet's Biography",
      icon: Star,
      count: 0,
      color: "border-emerald-500/30 bg-emerald-500/5 opacity-60",
      iconColor: "text-emerald-500/60",
      badgeColor: "bg-emerald-500/10 text-emerald-500/60",
      enabled: false,
    },
    {
      id: "hadiths",
      titleKey: "hadith_stories_title",
      titleAr: "قصص من الأحاديث",
      subtitleEn: "Stories from Authentic Hadiths",
      icon: Quote,
      count: hadithData.length,
      color: "border-blue-500/40 bg-blue-500/5",
      iconColor: "text-blue-500",
      badgeColor: "bg-blue-500/10 text-blue-500",
      enabled: true,
    },
    {
      id: "companions",
      titleKey: "companions_title",
      titleAr: "مواقف من الصحابة",
      subtitleEn: "Companions' Stories",
      icon: Users,
      count: 0,
      color: "border-purple-500/30 bg-purple-500/5 opacity-60",
      iconColor: "text-purple-500/60",
      badgeColor: "bg-purple-500/10 text-purple-500/60",
      enabled: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.id}
              whileHover={cat.enabled ? { scale: 1.02 } : undefined}
              whileTap={cat.enabled ? { scale: 0.98 } : undefined}
            >
              <Card
                className={`border-2 ${cat.color} rounded-2xl overflow-hidden transition-all ${
                  cat.enabled ? "cursor-pointer hover:shadow-lg" : "cursor-default"
                }`}
                onClick={() => {
                  if (cat.id === "prophets") onNavigate("prophets");
                  if (cat.id === "hadiths") onNavigate("hadiths");
                }}
                data-testid={`category-card-${cat.id}`}
              >
                <CardContent className="p-5 md:p-6 flex flex-col items-center text-center gap-3">
                  <div className={`p-3 rounded-2xl ${cat.badgeColor}`}>
                    <Icon className={`w-7 h-7 ${cat.iconColor}`} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base md:text-lg font-black text-foreground leading-tight">
                      {cat.titleAr}
                    </h3>
                    <p className="text-[11px] md:text-xs text-muted-foreground font-medium">
                      {cat.subtitleEn}
                    </p>
                  </div>
                  {cat.enabled ? (
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${cat.badgeColor}`} data-testid={`count-${cat.id}`}>
                      {t("story_count", { count: cat.count })}
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-muted/50 text-muted-foreground">
                      {t("coming_soon")}
                    </span>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function ProphetListView({
  t,
  lang,
  onBack,
  onSelectStory,
}: {
  t: any;
  lang: string;
  onBack: () => void;
  onSelectStory: (index: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-1.5 rounded-full text-xs font-bold"
          data-testid="button-back-to-categories"
        >
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          {t("back_to_categories")}
        </Button>
      </div>

      <div className="flex items-center gap-3 px-1">
        <div className="bg-amber-500/20 p-2 rounded-full">
          <BookOpen className="w-5 h-5 text-amber-500" />
        </div>
        <h2 className="text-xl font-black text-foreground">{t("prophet_stories_title")}</h2>
      </div>

      {PROPHET_GROUPS.map((group) => (
        <div key={group.prophetAr} className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {lang === "ar" ? group.prophetAr : group.prophetEn}
            </span>
            <div className="flex-1 h-px bg-border/50" />
          </div>
          <div className="space-y-2">
            {group.storyIndices.map((storyIdx) => {
              const story = PROPHET_STORIES[storyIdx];
              const s = lang === "ar" ? story.ar : story.en;
              const readingTime = getReadingTimeMinutes(s.story);
              const preview = s.story.slice(0, 100) + (s.story.length > 100 ? "..." : "");

              return (
                <Card
                  key={story.id}
                  className="border border-border/50 rounded-2xl overflow-hidden cursor-pointer hover:border-amber-500/30 hover:shadow-md transition-all"
                  onClick={() => onSelectStory(storyIdx)}
                  data-testid={`prophet-story-card-${story.id}`}
                >
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-base font-black text-foreground leading-snug flex-1">
                        {s.title}
                      </h4>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground/60 bg-muted/30 px-2 py-0.5 rounded-full shrink-0">
                        <Clock className="w-3 h-3" />
                        {readingTime} {t("min_read")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {preview}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function HadithListView({
  t,
  lang,
  isAr,
  hadiths,
  totalCount,
  page,
  totalPages,
  search,
  expandedId,
  onSearchChange,
  onPageChange,
  onToggleExpand,
  onBack,
}: {
  t: any;
  lang: string;
  isAr: boolean;
  hadiths: any[];
  totalCount: number;
  page: number;
  totalPages: number;
  search: string;
  expandedId: string | null;
  onSearchChange: (v: string) => void;
  onPageChange: (p: number) => void;
  onToggleExpand: (id: string) => void;
  onBack: () => void;
  fontSize: number;
  onFontUp: () => void;
  onFontDown: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-1.5 rounded-full text-xs font-bold"
          data-testid="button-back-to-categories-hadiths"
        >
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          {t("back_to_categories")}
        </Button>
      </div>

      <div className="flex items-center gap-3 px-1">
        <div className="bg-blue-500/20 p-2 rounded-full">
          <Quote className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl font-black text-foreground">{t("hadith_stories_title")}</h2>
          <p className="text-xs text-muted-foreground font-medium">
            {t("story_count", { count: totalCount })}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 py-1">
        <button
          onClick={onFontDown}
          disabled={fontSize <= 14}
          className="h-8 px-3 rounded-lg text-sm font-bold text-muted-foreground hover:bg-muted disabled:opacity-30 transition-all active:scale-95"
          data-testid="button-hadith-font-down"
        >
          A-
        </button>
        <button
          onClick={() => {}}
          className="h-8 px-3 rounded-lg text-sm font-bold text-muted-foreground hover:bg-muted transition-all active:scale-95 cursor-default"
          data-testid="button-hadith-font-indicator"
        >
          A
        </button>
        <button
          onClick={onFontUp}
          disabled={fontSize >= 28}
          className="h-8 px-3 rounded-lg text-sm font-bold text-muted-foreground hover:bg-muted disabled:opacity-30 transition-all active:scale-95"
          data-testid="button-hadith-font-up"
        >
          A+
        </button>
        <span className="text-xs text-muted-foreground/50 mr-2">{fontSize}px</span>
      </div>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            onSearchChange(e.target.value);
            onPageChange(1);
          }}
          placeholder={t("search_hadiths")}
          className="w-full bg-muted/30 border border-border/50 rounded-xl py-2.5 px-4 pe-10 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors"
          data-testid="input-search-hadiths"
        />
      </div>

      <div className="space-y-2">
        {hadiths.map((hadith: any) => {
          const isExpanded = expandedId === hadith.id;
          const preview = hadith.text.slice(0, 150) + (hadith.text.length > 150 ? "..." : "");
          const collectionLabel =
            hadith.collection === "البخاري" ? t("sahih_bukhari") : t("sahih_muslim");
          const sourceText = isAr
            ? `${collectionLabel}، ${t("hadith_number")} ${hadith.hadithnumber}`
            : `${collectionLabel}, ${t("hadith_number")}${hadith.hadithnumber}`;

          return (
            <Card
              key={hadith.id}
              className="border border-border/50 rounded-2xl overflow-hidden transition-all"
              data-testid={`hadith-card-${hadith.id}`}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => onToggleExpand(hadith.id)}
                  className="w-full text-start p-4 space-y-2"
                  data-testid={`hadith-toggle-${hadith.id}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">
                        #{hadith.hadithnumber}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          hadith.collection === "البخاري"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-purple-500/10 text-purple-500"
                        }`}
                      >
                        {hadith.collection === "البخاري" ? t('sahih_bukhari') : t('sahih_muslim')}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                    )}
                  </div>
                  {!isExpanded && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 font-medium">
                      {preview}
                    </p>
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3">
                        <div className="bg-blue-500/5 p-4 rounded-xl border border-blue-500/10">
                          <p className="leading-[2] font-serif font-medium text-foreground whitespace-pre-line" style={{ fontSize }}>
                            {hadith.text}
                          </p>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground/70 text-center">
                          {sourceText}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="rounded-full text-xs font-bold"
            data-testid="button-hadith-prev"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
          <span className="text-sm font-bold text-muted-foreground px-3" data-testid="text-hadith-page">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="rounded-full text-xs font-bold"
            data-testid="button-hadith-next"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}

function ProphetDetailView({
  t,
  lang,
  storyIndex,
  onBack,
  onNavigate,
  fontSize,
  onFontUp,
  onFontDown,
}: {
  t: any;
  lang: string;
  storyIndex: number;
  onBack: () => void;
  onNavigate: (index: number) => void;
  fontSize: number;
  onFontUp: () => void;
  onFontDown: () => void;
}) {
  const story = PROPHET_STORIES[storyIndex];
  const s = lang === "ar" ? story.ar : story.en;
  const readingTime = getReadingTimeMinutes(s.story);
  const hasPrev = storyIndex > 0;
  const hasNext = storyIndex < PROPHET_STORIES.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-1.5 rounded-full text-xs font-bold"
          data-testid="button-back-to-prophets"
        >
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          {t("prophet_stories_title")}
        </Button>
      </div>

      <Card className="border border-amber-500/20 shadow-sm bg-card overflow-hidden rounded-2xl">
        <div className="bg-amber-500/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/20 p-2 rounded-full">
              <BookOpen className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="text-2xl font-black text-amber-500 font-serif">{t("prophet_stories_title")}</h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500/60 bg-amber-500/5 px-3 py-1.5 rounded-full border border-amber-500/10">
            <Clock className="w-3.5 h-3.5" />
            <span>{readingTime} {t("min_read")}</span>
          </div>
        </div>

        <CardContent className="p-6 md:p-10 space-y-8">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <h3 className="text-3xl font-black text-foreground font-serif">
              {s.title}
            </h3>
            <span className="bg-amber-500 text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
              {s.prophet}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 py-1">
            <button
              onClick={onFontDown}
              disabled={fontSize <= 14}
              className="h-8 px-3 rounded-lg text-sm font-bold text-muted-foreground hover:bg-muted disabled:opacity-30 transition-all active:scale-95"
              data-testid="button-prophet-font-down"
            >
              A-
            </button>
            <button
              onClick={() => {}}
              className="h-8 px-3 rounded-lg text-sm font-bold text-muted-foreground hover:bg-muted transition-all active:scale-95 cursor-default"
              data-testid="button-prophet-font-indicator"
            >
              A
            </button>
            <button
              onClick={onFontUp}
              disabled={fontSize >= 28}
              className="h-8 px-3 rounded-lg text-sm font-bold text-muted-foreground hover:bg-muted disabled:opacity-30 transition-all active:scale-95"
              data-testid="button-prophet-font-up"
            >
              A+
            </button>
            <span className="text-xs text-muted-foreground/50 mr-2">{fontSize}px</span>
          </div>

          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-justify whitespace-pre-line font-medium" style={{ fontSize }}>
              {s.story}
            </p>
          </div>

          {s.quranReference && (
            <div className="bg-amber-500/5 border-r-4 border-amber-500 p-6 rounded-l-2xl my-6 shadow-sm">
              <h4 className="font-bold text-amber-500 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                <MessageCircle className="w-4 h-4" />
                {t("ayah_story")}
              </h4>
              <p className="text-foreground font-serif text-xl md:text-2xl leading-relaxed">
                "{s.quranReference}"
              </p>
              {s.quranCitation && (
                <div className="text-amber-500/80 text-sm font-bold mt-2 text-left w-full flex items-center justify-end gap-1 opacity-80">
                  <span className="bg-amber-500/10 px-2 py-0.5 rounded-md">
                    {s.quranCitation}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center pt-4 border-t border-border/50">
            <a
              href={s.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-500 transition-colors bg-muted/30 px-4 py-2 rounded-full hover:bg-amber-500/5"
              data-testid="link-prophet-source"
            >
              <span className="font-medium">{t("read_more")}:</span>
              <span className="font-bold border-b border-transparent group-hover:border-amber-500 transition-all">
                {s.source}
              </span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate(storyIndex - 1)}
              disabled={!hasPrev}
              className="gap-1.5 rounded-full text-xs font-bold"
              data-testid="button-prev-story"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              {t("previous_story")}
            </Button>
            <span className="text-xs font-bold text-muted-foreground" data-testid="text-story-counter">
              {storyIndex + 1} / {PROPHET_STORIES.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate(storyIndex + 1)}
              disabled={!hasNext}
              className="gap-1.5 rounded-full text-xs font-bold"
              data-testid="button-next-story"
            >
              {t("next_story")}
              <ArrowLeft className="w-3.5 h-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
