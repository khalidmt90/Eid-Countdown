import { useEffect, useState } from "react";
import { 
  BookOpen, 
  MessageCircle, 
  Scroll, 
  Quote, 
  BookMarked,
  ExternalLink 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card";
import { getDailyContent, type DailyContent } from "@/lib/daily-content";

export function DailyContentView() {
  const [content, setContent] = useState<DailyContent | null>(null);

  useEffect(() => {
    setContent(getDailyContent());
  }, []);

  if (!content) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* 1. Quranic Verse (Ayah) */}
      <Card className="border-2 border-primary/30 shadow-xl bg-card overflow-hidden group hover:border-primary/50 transition-all">
        <div className="bg-primary/10 p-4 flex items-center gap-3 border-b border-primary/20">
          <BookOpen className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-xl font-bold text-primary font-serif">آية وقصة</h2>
            <p className="text-xs text-primary/70 font-sans">تأملات في كتاب الله</p>
          </div>
        </div>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="text-center space-y-4">
            <p className="text-2xl md:text-3xl leading-loose font-serif font-black text-foreground" style={{ lineHeight: '2' }}>
              {content.ayah.text}
            </p>
            <div className="inline-flex items-center gap-2 text-primary font-bold bg-primary/5 px-4 py-1 rounded-full text-sm md:text-base border border-primary/10">
              <span>{content.ayah.surah}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              <span>الآية {content.ayah.verseNumber}</span>
            </div>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl space-y-3 border border-border">
            <h3 className="font-bold text-xl text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
              <BookMarked className="w-5 h-5 text-secondary" />
              {content.ayah.title}
            </h3>
            <p className="text-muted-foreground leading-loose text-lg text-justify">
              {content.ayah.story}
            </p>
          </div>
          
          <div className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1 opacity-70 pt-2">
            <span>المصدر:</span>
            <a 
              href={content.ayah.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold hover:underline hover:text-primary flex items-center gap-1"
            >
              {content.ayah.source}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* 2. Hadith Story */}
      <Card className="border-2 border-secondary/30 shadow-xl bg-card overflow-hidden group hover:border-secondary/50 transition-all">
        <div className="bg-secondary/10 p-4 flex items-center gap-3 border-b border-secondary/20">
          <Quote className="w-6 h-6 text-secondary" />
          <div>
            <h2 className="text-xl font-bold text-secondary font-serif">من الهدي النبوي</h2>
            <p className="text-xs text-secondary/70 font-sans">سياق الحديث وسببه</p>
          </div>
        </div>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="relative">
            <Quote className="absolute -top-2 -right-2 w-12 h-12 text-secondary/10 rotate-180" />
            <p className="text-2xl md:text-3xl leading-relaxed font-serif font-bold text-foreground relative z-10 text-center px-4">
              "{content.hadith.text}"
            </p>
          </div>
          
          <div className="flex justify-center">
            <span className="text-secondary font-bold text-sm bg-secondary/10 px-3 py-1 rounded-md">
              الراوي: {content.hadith.narrator}
            </span>
          </div>

          <div className="bg-secondary/5 p-5 rounded-xl border border-secondary/10 space-y-3">
            <h3 className="font-bold text-secondary text-lg border-b border-secondary/10 pb-2">
              {content.hadith.title}
            </h3>
            <p className="text-foreground/80 leading-loose text-lg text-justify">
              {content.hadith.story}
            </p>
          </div>

          <div className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1 opacity-70">
            <a 
              href={content.hadith.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              {content.hadith.source}
            </a>
          </div>
        </CardContent>
      </Card>

      {/* 3. Prophet's Story */}
      <Card className="border-2 border-accent/30 shadow-xl bg-card overflow-hidden group hover:border-accent/50 transition-all">
        <div className="bg-accent/10 p-4 flex items-center gap-3 border-b border-accent/20">
          <Scroll className="w-6 h-6 text-accent" />
          <div>
            <h2 className="text-xl font-bold text-accent font-serif">قصص الأنبياء</h2>
            <p className="text-xs text-accent/70 font-sans">عبر من حياة المرسلين</p>
          </div>
        </div>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-foreground font-serif">
              {content.prophetStory.title}
            </h3>
            <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {content.prophetStory.prophet} عليه السلام
            </span>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg leading-loose text-muted-foreground text-justify">
              {content.prophetStory.story}
            </p>
          </div>

          {content.prophetStory.quranReference && (
            <div className="bg-accent/5 border-r-4 border-accent p-4 rounded-l-xl my-4">
              <h4 className="font-bold text-accent mb-2 flex items-center gap-2 text-sm">
                <MessageCircle className="w-4 h-4" />
                ذكر في القرآن الكريم
              </h4>
              <p className="text-foreground font-serif text-lg leading-relaxed">
                "{content.prophetStory.quranReference}"
              </p>
            </div>
          )}

          <div className="text-xs text-muted-foreground text-left flex items-center justify-end gap-1 opacity-70">
            <span>المصدر:</span>
            <a 
              href={content.prophetStory.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold hover:underline hover:text-accent flex items-center gap-1"
            >
              {content.prophetStory.source}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
