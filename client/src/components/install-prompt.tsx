import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Download, X, Share, ArrowDown, Plus } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSOverlay, setShowIOSOverlay] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem("installDismissed") === "true";
  });
  const [installed, setInstalled] = useState(false);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches
    || (window.navigator as any).standalone === true;

  useEffect(() => {
    if (isInStandaloneMode) {
      setInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const installedHandler = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, [isInStandaloneMode]);

  const handleInstallClick = useCallback(async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSOverlay(true);
    }
  }, [deferredPrompt, isIOS]);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("installDismissed", "true");
  };

  if (installed || isInStandaloneMode) return null;
  if (dismissed && !showIOSOverlay) return null;
  if (!deferredPrompt && !isIOS) return null;

  return (
    <>
      {/* Install Button - fixed at bottom */}
      {!showIOSOverlay && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="relative flex items-center gap-2 bg-card/95 backdrop-blur-md border border-border shadow-xl rounded-full px-1.5 py-1.5">
            <Button
              onClick={handleInstallClick}
              className="rounded-full px-5 py-3 h-auto shadow-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base gap-2"
              data-testid="button-install-app"
            >
              <Download className="w-5 h-5" />
              {isArabic ? "تثبيت التطبيق" : "Install App"}
            </Button>
            <button
              onClick={handleDismiss}
              className="w-10 h-10 rounded-full bg-muted hover:bg-destructive/20 text-muted-foreground hover:text-destructive flex items-center justify-center transition-colors"
              data-testid="button-dismiss-install"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* iOS Instruction Overlay */}
      {showIOSOverlay && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-300"
          onClick={() => setShowIOSOverlay(false)}
        >
          <div
            className="bg-card w-full max-w-md rounded-t-3xl p-6 pb-10 space-y-5 animate-in slide-in-from-bottom-8 duration-500"
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-foreground">
                {isArabic ? "إضافة للشاشة الرئيسية" : "Add to Home Screen"}
              </h3>
              <button
                onClick={() => setShowIOSOverlay(false)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                data-testid="button-close-ios-overlay"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black text-lg">1</span>
                </div>
                <div className="flex-1 pt-1.5">
                  <p className="text-base font-bold text-foreground flex items-center gap-2 flex-wrap">
                    {isArabic ? "اضغط على زر المشاركة" : "Tap the Share button"}
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-lg">
                      <Share className="w-4 h-4" />
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isArabic ? "في أسفل الشاشة (سفاري)" : "At the bottom of Safari"}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black text-lg">2</span>
                </div>
                <div className="flex-1 pt-1.5">
                  <p className="text-base font-bold text-foreground flex items-center gap-2 flex-wrap">
                    {isArabic ? 'اختر "إضافة إلى الشاشة الرئيسية"' : 'Select "Add to Home Screen"'}
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-muted text-foreground rounded-lg border border-border">
                      <Plus className="w-4 h-4" />
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isArabic ? "مرر للأسفل في القائمة لتجدها" : "Scroll down in the menu to find it"}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black text-lg">3</span>
                </div>
                <div className="flex-1 pt-1.5">
                  <p className="text-base font-bold text-foreground">
                    {isArabic ? 'اضغط "إضافة" للتأكيد' : 'Tap "Add" to confirm'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isArabic ? "سيظهر التطبيق على شاشتك الرئيسية" : "The app will appear on your home screen"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => setShowIOSOverlay(false)}
                className="w-full h-12 rounded-xl font-bold text-base"
                variant="outline"
              >
                {isArabic ? "فهمت" : "Got it"}
              </Button>
            </div>

            {/* Arrow pointing down to share button */}
            <div className="flex justify-center">
              <ArrowDown className="w-6 h-6 text-muted-foreground animate-bounce" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
