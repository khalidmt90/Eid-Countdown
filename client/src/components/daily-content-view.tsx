import { useEffect, useState } from "react";
import { 
  BookOpen, 
  MessageCircle, 
  Scroll, 
  Quote, 
  BookMarked,
  ExternalLink,
  Clock,
  RefreshCw
} from "lucide-react";
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDailyContent, getRandomContent, type DailyContentBundle } from "@/lib/daily-content";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export function DailyContentView() {
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState<DailyContentBundle | null>(null);
  const [activeTab, setActiveTab] = useState("ayah");
  const [contentKey, setContentKey] = useState(0);

  useEffect(() => {
    setContent(getDailyContent(i18n.language));
  }, [i18n.language]);

  const handleGenerateNew = () => {
    // Clear the stored index first to ensure we get a fresh random selection
    localStorage.removeItem('dailyContentIndex');
    
    // Get new content
    const newContent = getRandomContent(i18n.language);
    setContent(newContent);
    setContentKey(prev => prev + 1);
  };

  if (!content) return null;

  return (
    <div className="space-y-6 pb-20 w-full max-w-4xl mx-auto">
      {/* Sub-navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50 rounded-2xl mb-6">
          <TabsTrigger 
            value="ayah" 
            className="rounded-xl py-3 md:text-base font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors text-[16px]"
          >
            {t('ayah_story')}
          </TabsTrigger>
          <TabsTrigger 
            value="hadith" 
            className="rounded-xl py-3 md:text-base font-bold data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-colors text-[16px]"
          >
            {t('hadith_guidance')}
          </TabsTrigger>
          <TabsTrigger 
            value="prophet" 
            className="rounded-xl py-3 md:text-base font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-colors text-[16px]"
          >
            {t('prophet_stories')}
          </TabsTrigger>
        </TabsList>

        <div className="flex justify-end mb-4">
          <Button 
            onClick={handleGenerateNew} 
            variant="outline" 
            size="sm" 
            className="gap-2 rounded-full hover:bg-muted font-bold text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t('another_story')}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${contentKey}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            
            {/* 1. Ayah & Story Content */}
            <TabsContent value="ayah" className="mt-0">
              <Card className="border-2 border-primary/20 shadow-md bg-card overflow-hidden rounded-3xl">
                <div className="bg-primary/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-primary font-serif">{t('ayah_story')}</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-primary/60 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
                    <Clock className="w-3.5 h-3.5" />
                    <span>⏱ {content.ayah.readingTime || 1} {t('min_read')}</span>
                  </div>
                </div>
                
                <CardContent className="p-6 md:p-10 space-y-8">
                  <div className="text-center space-y-6 bg-background/50 p-6 rounded-2xl border border-border/50 shadow-sm">
                    <p className="text-3xl md:text-4xl leading-[2.2] font-serif font-black text-foreground drop-shadow-sm">
                      {content.ayah.text}
                    </p>
                    <div className="inline-flex items-center gap-2 text-primary font-bold bg-primary/5 px-4 py-1.5 rounded-full text-sm md:text-base border border-primary/10 shadow-sm">
                      <span>{content.ayah.surah}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      <span>{content.ayah.verseNumber}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-black text-2xl text-foreground flex items-center gap-3 border-r-4 border-primary px-4 py-1">
                      <BookMarked className="w-6 h-6 text-primary" />
                      {content.ayah.title}
                    </h3>
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                      <p className="md:text-xl text-muted-foreground text-justify whitespace-pre-line font-medium text-[22px]">
                        {content.ayah.story}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center pt-4 border-t border-border/50">
                    <a 
                      href={content.ayah.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors bg-muted/30 px-4 py-2 rounded-full hover:bg-primary/5"
                    >
                      <span className="font-medium">{t('read_more')}:</span>
                      <span className="font-bold border-b border-transparent group-hover:border-primary transition-all">{content.ayah.source}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 2. Hadith Content */}
            <TabsContent value="hadith" className="mt-0">
              <Card className="border-2 border-secondary/20 shadow-xl bg-card overflow-hidden rounded-3xl">
                <div className="bg-secondary/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-secondary/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary/20 p-2 rounded-full">
                      <Quote className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-secondary font-serif">{t('hadith_guidance')}</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-secondary/60 bg-secondary/5 px-3 py-1.5 rounded-full border border-secondary/10">
                    <Clock className="w-3.5 h-3.5" />
                    <span>⏱ {content.hadith.readingTime || 1} {t('min_read')}</span>
                  </div>
                </div>

                <CardContent className="p-6 md:p-10 space-y-8">
                  <div className="relative bg-secondary/5 p-8 rounded-3xl border border-secondary/10">
                    <Quote className="absolute top-4 right-4 w-12 h-12 text-secondary/10 rotate-180" />
                    <div className="relative z-10 space-y-4 text-center">
                      <p className="text-2xl md:text-3xl leading-[2] font-serif font-bold text-foreground">
                        "{content.hadith.text}"
                      </p>
                      <span className="inline-block text-secondary font-bold text-sm bg-background/80 px-4 py-1 rounded-full shadow-sm border border-secondary/10">
                        {content.hadith.narrator}
                      </span>
                    </div>
                    <Quote className="absolute bottom-4 left-4 w-12 h-12 text-secondary/10" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-black text-2xl text-foreground flex items-center gap-3 border-r-4 border-secondary px-4 py-1">
                      {content.hadith.title}
                    </h3>
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                      <p className="md:text-xl text-muted-foreground text-justify whitespace-pre-line font-medium text-[22px]">
                        {content.hadith.story}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center pt-4 border-t border-border/50">
                    <a 
                      href={content.hadith.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors bg-muted/30 px-4 py-2 rounded-full hover:bg-secondary/5"
                    >
                      <span className="font-medium">{t('read_more')}:</span>
                      <span className="font-bold border-b border-transparent group-hover:border-secondary transition-all">{content.hadith.source}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 3. Prophet Story Content */}
            <TabsContent value="prophet" className="mt-0">
              <Card className="border-2 border-accent/20 shadow-xl bg-card overflow-hidden rounded-3xl">
                <div className="bg-accent/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-accent/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/20 p-2 rounded-full">
                      <Scroll className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-accent font-serif">{t('prophet_stories')}</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-accent/60 bg-accent/5 px-3 py-1.5 rounded-full border border-accent/10">
                    <Clock className="w-3.5 h-3.5" />
                    <span>⏱ {content.prophetStory.readingTime || 1} {t('min_read')}</span>
                  </div>
                </div>

                <CardContent className="p-6 md:p-10 space-y-8">
                  <div className="flex items-center justify-between border-b border-border/50 pb-4">
                    <h3 className="text-3xl font-black text-foreground font-serif">
                      {content.prophetStory.title}
                    </h3>
                    <span className="bg-accent text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                      {content.prophetStory.prophet}
                    </span>
                  </div>

                  <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                    <p className="md:text-xl text-muted-foreground text-justify whitespace-pre-line font-medium text-[22px]">
                      {content.prophetStory.story}
                    </p>
                  </div>

                  {content.prophetStory.quranReference && (
                    <div className="bg-accent/5 border-r-4 border-accent p-6 rounded-l-2xl my-6 shadow-sm">
                      <h4 className="font-bold text-accent mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <MessageCircle className="w-4 h-4" />
                        {t('ayah_story')}
                      </h4>
                      <p className="text-foreground font-serif text-xl md:text-2xl leading-relaxed">
                        "{content.prophetStory.quranReference}"
                      </p>
                      {content.prophetStory.quranCitation && (
                        <div className="text-accent/80 text-sm font-bold mt-2 text-left w-full flex items-center justify-end gap-1 opacity-80">
                          <span className="bg-accent/10 px-2 py-0.5 rounded-md">
                            {content.prophetStory.quranCitation}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-center pt-4 border-t border-border/50">
                    <a 
                      href={content.prophetStory.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors bg-muted/30 px-4 py-2 rounded-full hover:bg-accent/5"
                    >
                      <span className="font-medium">{t('read_more')}:</span>
                      <span className="font-bold border-b border-transparent group-hover:border-accent transition-all">{content.prophetStory.source}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
