import { useEffect, useState, useCallback, useRef } from "react";
import { Compass, Navigation, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

function normalize360(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function shortestSignedDelta(target: number, heading: number): number {
  const diff = normalize360(target - heading);
  return diff > 180 ? diff - 360 : diff;
}

const SMOOTHING_FACTOR = 0.15;
const ALIGNED_TOLERANCE = 5;
const STABLE_DURATION_MS = 600;

const MECCA_LAT = 21.4225;
const MECCA_LNG = 39.8262;

function calculateQiblah(lat: number, lng: number): number {
  const phiK = MECCA_LAT * Math.PI / 180.0;
  const lambdaK = MECCA_LNG * Math.PI / 180.0;
  const phi = lat * Math.PI / 180.0;
  const lambda = lng * Math.PI / 180.0;

  const psi = (180.0 / Math.PI) * Math.atan2(
    Math.sin(lambdaK - lambda),
    Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda)
  );

  return normalize360(psi);
}

export function QiblahFinder() {
  const { t, i18n } = useTranslation();
  const [rawHeading, setRawHeading] = useState<number | null>(null);
  const [smoothedHeading, setSmoothedHeading] = useState<number | null>(null);
  const [qiblahBearing, setQiblahBearing] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isStableAligned, setIsStableAligned] = useState(false);

  const prevSmoothed = useRef<number | null>(null);
  const alignedSince = useRef<number | null>(null);
  const hasVibrated = useRef(false);

  const isArabic = i18n.language === "ar" || i18n.language === "ur" || i18n.language === "fa";

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    let compass: number | null = null;

    // @ts-ignore
    if (typeof event.webkitCompassHeading === "number") {
      // @ts-ignore
      compass = event.webkitCompassHeading;
    } else if (typeof event.alpha === "number") {
      compass = normalize360(360 - event.alpha);
    }

    if (compass !== null) {
      setRawHeading(compass);
    }
  }, []);

  useEffect(() => {
    if (rawHeading === null) return;

    if (prevSmoothed.current === null) {
      prevSmoothed.current = rawHeading;
      setSmoothedHeading(rawHeading);
      return;
    }

    let diff = rawHeading - prevSmoothed.current;
    if (diff > 180) diff -= 360;
    else if (diff < -180) diff += 360;

    const newSmoothed = normalize360(prevSmoothed.current + SMOOTHING_FACTOR * diff);
    prevSmoothed.current = newSmoothed;
    setSmoothedHeading(newSmoothed);
  }, [rawHeading]);

  const startCompass = async () => {
    if (!navigator.geolocation) {
      setError(isArabic ? "الموقع الجغرافي غير مدعوم في هذا المتصفح" : t("compass_error"));
      return;
    }

    // @ts-ignore
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
      try {
        // @ts-ignore
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission !== "granted") {
          setError(isArabic ? "يرجى السماح بإذن البوصلة للاستخدام" : t("device_error"));
          return;
        }
      } catch {
        setError(isArabic ? "يرجى السماح بإذن البوصلة للاستخدام" : t("device_error"));
        return;
      }
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        const bearing = calculateQiblah(latitude, longitude);
        setQiblahBearing(bearing);

        if (window.DeviceOrientationEvent) {
          window.addEventListener("deviceorientationabsolute", handleOrientation as EventListener, { capture: true, passive: true });
          window.addEventListener("deviceorientation", handleOrientation as EventListener, { capture: true, passive: true });
          setIsListening(true);
        } else {
          setError(isArabic ? "البوصلة غير مدعومة في هذا الجهاز" : t("device_error"));
        }
      },
      () => {
        setError(isArabic ? "يرجى تفعيل الموقع الجغرافي (GPS)" : t("gps_error"));
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    return () => {
      if (isListening) {
        window.removeEventListener("deviceorientationabsolute", handleOrientation as EventListener, { capture: true });
        window.removeEventListener("deviceorientation", handleOrientation as EventListener, { capture: true });
      }
    };
  }, [isListening, handleOrientation]);

  const delta = qiblahBearing !== null && smoothedHeading !== null
    ? shortestSignedDelta(qiblahBearing, smoothedHeading)
    : 0;

  const absDelta = Math.abs(Math.round(delta));
  const isAligned = absDelta <= ALIGNED_TOLERANCE;

  useEffect(() => {
    const now = Date.now();

    if (isAligned) {
      if (alignedSince.current === null) {
        alignedSince.current = now;
      } else if (now - alignedSince.current >= STABLE_DURATION_MS) {
        if (!isStableAligned) {
          setIsStableAligned(true);
          if (!hasVibrated.current && navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
            hasVibrated.current = true;
          }
        }
      }
    } else {
      alignedSince.current = null;
      if (isStableAligned) {
        setIsStableAligned(false);
      }
      hasVibrated.current = false;
    }
  }, [isAligned, isStableAligned]);

  const RING_SIZE = 280;
  const RING_RADIUS = RING_SIZE / 2;
  const KAABA_ORBIT_RADIUS = RING_RADIUS - 8;
  const LINE_LENGTH = RING_RADIUS - 24;

  const headingDeg = smoothedHeading ?? 0;

  const kaabaDeg = qiblahBearing ?? 0;
  const kaabaRad = (kaabaDeg - 90) * (Math.PI / 180);
  const kaabaX = RING_RADIUS + KAABA_ORBIT_RADIUS * Math.cos(kaabaRad);
  const kaabaY = RING_RADIUS + KAABA_ORBIT_RADIUS * Math.sin(kaabaRad);

  const directionHint = delta > 0
    ? (isArabic ? "لف يمين ←" : "Turn Right →")
    : (isArabic ? "→ لف يسار" : "← Turn Left");

  const compassActive = smoothedHeading !== null && qiblahBearing !== null;

  return (
    <div className="flex flex-col items-center space-y-6 animate-in fade-in duration-500 pb-8" dir="rtl">
      <Card className="w-full max-w-md border-2 border-primary/20 shadow-lg overflow-hidden bg-card">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-black font-serif text-primary flex items-center justify-center gap-2">
            <Compass className="w-7 h-7" />
            {isArabic ? "اتجاه القبلة" : t("qiblah_direction")}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {location
              ? (isArabic ? "تم تحديد موقعك" : t("location_set"))
              : (isArabic ? "اضغط الزر لتحديد الاتجاه" : t("tap_to_start"))}
          </p>
        </CardHeader>

        <CardContent className="flex flex-col items-center pt-4 pb-8 space-y-6">
          {/* Compass Container */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: RING_SIZE, height: RING_SIZE }}
            data-testid="compass-container"
          >
            {/* Compass Ring */}
            <div
              className={`absolute inset-0 rounded-full border-[3px] transition-all duration-500 ${
                isStableAligned
                  ? "border-green-500 bg-green-500/5 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                  : compassActive
                  ? "border-border bg-background/30"
                  : "border-muted/30 bg-background/20"
              }`}
            />

            {/* Tick marks around ring */}
            {Array.from({ length: 72 }, (_, i) => {
              const deg = i * 5;
              const isMajor = deg % 90 === 0;
              const isMinor = deg % 45 === 0;
              return (
                <div
                  key={deg}
                  className="absolute"
                  style={{
                    width: 2,
                    height: isMajor ? 12 : isMinor ? 8 : 4,
                    background: isMajor
                      ? "hsl(var(--foreground))"
                      : "hsl(var(--muted-foreground) / 0.3)",
                    top: 0,
                    left: "50%",
                    transformOrigin: `0px ${RING_RADIUS}px`,
                    transform: `translateX(-1px) rotate(${deg}deg)`,
                  }}
                />
              );
            })}

            {/* Cardinal directions (fixed on ring) */}
            {[
              { deg: 0, label: "N", labelAr: "ش" },
              { deg: 90, label: "E", labelAr: "شر" },
              { deg: 180, label: "S", labelAr: "ج" },
              { deg: 270, label: "W", labelAr: "غ" },
            ].map(({ deg, label, labelAr }) => (
              <div
                key={deg}
                className={`absolute text-[11px] font-black pointer-events-none ${
                  deg === 0 ? "text-red-500" : "text-muted-foreground"
                }`}
                style={{
                  top: RING_RADIUS + (RING_RADIUS - 28) * Math.sin((deg - 90) * Math.PI / 180) - 7,
                  left: RING_RADIUS + (RING_RADIUS - 28) * Math.cos((deg - 90) * Math.PI / 180) - 8,
                  width: 16,
                  textAlign: "center",
                }}
              >
                {label}
              </div>
            ))}

            {/* Qiblah Marker - FIXED on ring at qiblahBearing */}
            {qiblahBearing !== null && (
              <div
                className="absolute z-20 flex flex-col items-center pointer-events-none"
                style={{
                  left: kaabaX - 18,
                  top: kaabaY - 18,
                  width: 36,
                  height: 36,
                }}
                data-testid="qiblah-marker"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isStableAligned
                    ? "bg-green-500/20 ring-2 ring-green-500 scale-110"
                    : "bg-primary/10 ring-2 ring-primary/40"
                }`}>
                  <span className="text-xl" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}>🕋</span>
                </div>
              </div>
            )}

            {/* Heading Line (red) - rotates with device heading */}
            {compassActive && (
              <div
                className="absolute z-10 pointer-events-none"
                style={{
                  width: 4,
                  height: LINE_LENGTH,
                  bottom: RING_RADIUS,
                  left: RING_RADIUS - 2,
                  transformOrigin: "2px 100%",
                  transform: `rotate(${headingDeg}deg)`,
                  transition: "transform 0.15s ease-out",
                }}
              >
                {/* Line body */}
                <div
                  className={`w-full h-full rounded-full transition-colors duration-300 ${
                    isStableAligned
                      ? "bg-gradient-to-t from-transparent to-green-500"
                      : "bg-gradient-to-t from-transparent to-red-500"
                  }`}
                />
                {/* Arrow tip */}
                <div
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-lg transition-colors duration-300 ${
                    isStableAligned ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </div>
            )}

            {/* Center dot */}
            <div className="w-3.5 h-3.5 bg-foreground rounded-full z-30 ring-3 ring-background pointer-events-none" />
          </div>

          {/* Bearing info */}
          {qiblahBearing !== null && (
            <div className="text-center text-sm text-muted-foreground">
              {isArabic ? `اتجاه القبلة: ${Math.round(qiblahBearing)}° من الشمال` : `Qiblah: ${Math.round(qiblahBearing)}° from North`}
            </div>
          )}

          {/* Direction guidance */}
          {compassActive && (
            <div className="w-full px-4 space-y-3">
              {isStableAligned ? (
                <div className="flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 font-black text-lg py-3 px-6 rounded-2xl animate-in zoom-in duration-300" data-testid="text-aligned">
                  <span className="text-xl">✅</span>
                  {isArabic ? "أنت على القبلة" : "You are facing the Qiblah"}
                </div>
              ) : (
                <div className="flex items-center justify-between bg-card border border-border rounded-2xl py-3 px-5" data-testid="text-direction-hint">
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-black ${delta > 0 ? "text-blue-500" : "text-orange-500"}`}>
                      {delta > 0 ? "↻" : "↺"}
                    </span>
                    <span className="text-base font-black text-foreground">
                      {directionHint}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-2xl font-mono font-black text-foreground">
                      {absDelta}°
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      {isArabic ? "متبقي" : "remaining"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Start Button (when compass not active) */}
          {!compassActive && !error && (
            <Button
              onClick={startCompass}
              size="lg"
              className="rounded-2xl px-8 py-6 text-lg shadow-md gap-2 font-bold"
              data-testid="button-start-compass"
            >
              <Navigation className="w-5 h-5" />
              {isArabic ? "تحديد اتجاه القبلة" : t("locate_direction")}
            </Button>
          )}

          {/* Error */}
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-xl font-bold text-center space-y-3">
              <p>{error}</p>
              <Button
                onClick={() => { setError(null); startCompass(); }}
                variant="outline"
                size="sm"
                className="rounded-xl"
              >
                {isArabic ? "إعادة المحاولة" : "Retry"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calibration tip */}
      {compassActive && !isStableAligned && (
        <div className="text-center max-w-sm text-muted-foreground text-sm px-4 bg-muted/30 p-3 rounded-xl border border-border/50">
          <div className="flex items-center justify-center gap-2 mb-1">
            <RotateCcw className="w-4 h-4" />
            <span className="font-bold">{isArabic ? "تلميح" : "Tip"}</span>
          </div>
          <p>
            {isArabic
              ? "إذا الاتجاه غير دقيق، حرّك الجوال بشكل رقم ٨ لإعادة معايرة البوصلة"
              : "If direction seems off, move your phone in a figure-8 to recalibrate the compass"}
          </p>
        </div>
      )}
    </div>
  );
}
