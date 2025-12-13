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
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { getDailyContent, type DailyContent } from "@/lib/daily-content";
import { cn } from "@/lib/utils";

export function DailyContentView() {
  const [content, setContent] = useState<DailyContent | null>(null);

  useEffect(() => {
    setContent(getDailyContent());
  }, []);

  if (!content) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Quranic Verse (Ayah) */}
      <Card className="border-2 border-primary/30 shadow-xl bg-card overflow-hidden group hover:border-primary/50 transition-all">
        <div className="bg-primary/10 p-4 flex items-center gap-3 border-b border-primary/20">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-primary font-serif">آية وتفسير</h2>
        </div>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="text-center space-y-4">
            <p className="text-3xl md:text-4xl leading-loose font-serif font-black text-foreground" style={{ lineHeight: '2' }}>
              {content.ayah.text}
            </p>
            <div className="inline-flex items-center gap-2 text-primary font-bold bg-primary/5 px-4 py-1 rounded-full text-sm md:text-base border border-primary/10">
              <span>{content.ayah.surah}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              <span>الآية {content.ayah.verseNumber}</span>
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-xl space-y-2 border border-border">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-secondary" />
              التفسير الميسر:
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {content.ayah.tafsir}
            </p>
          </div>
          
          <div className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1 opacity-70">
            <span>المصدر:</span>
            <span className="font-bold">{content.ayah.source}</span>
          </div>
        </CardContent>
      </Card>

      {/* 2. Hadith Story */}
      <Card className="border-2 border-secondary/30 shadow-xl bg-card overflow-hidden group hover:border-secondary/50 transition-all">
        <div className="bg-secondary/10 p-4 flex items-center gap-3 border-b border-secondary/20">
          <Quote className="w-6 h-6 text-secondary" />
          <h2 className="text-xl font-bold text-secondary font-serif">من الهدي النبوي</h2>
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
              الراوي: {content.hadith.narrator} | {content.hadith.source}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-muted/30 p-4 rounded-xl border border-border">
              <h3 className="font-bold text-secondary mb-2 text-lg">سياق الحديث</h3>
              <p className="text-muted-foreground leading-relaxed">
                {content.hadith.context}
              </p>
            </div>
            <div className="bg-secondary/5 p-4 rounded-xl border border-secondary/10">
              <h3 className="font-bold text-secondary mb-2 text-lg">درس مستفاد</h3>
              <p className="text-foreground/80 leading-relaxed font-medium">
                {content.hadith.lesson}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Prophet's Story */}
      <Card className="border-2 border-accent/30 shadow-xl bg-card overflow-hidden group hover:border-accent/50 transition-all">
        <div className="bg-accent/10 p-4 flex items-center gap-3 border-b border-accent/20">
          <Scroll className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-bold text-accent font-serif">قصص الأنبياء</h2>
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

          <div className="bg-accent/5 border-r-4 border-accent p-4 rounded-l-xl">
            <h4 className="font-bold text-accent mb-1 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              العبرة من القصة
            </h4>
            <p className="text-foreground font-medium text-lg">
              {content.prophetStory.lesson}
            </p>
          </div>

          <div className="text-xs text-muted-foreground text-left flex items-center justify-end gap-1 opacity-70">
            <ExternalLink className="w-3 h-3" />
            <span>المصدر: {content.prophetStory.source}</span>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
