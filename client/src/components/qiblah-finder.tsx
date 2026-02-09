import { useEffect, useState, useCallback, useRef } from "react";
import { Compass, Navigation, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
const NEAR_THRESHOLD = 20;
const STABLE_DURATION_MS = 800;

export function QiblahFinder() {
  const { t, i18n } = useTranslation();
  const [rawHeading, setRawHeading] = useState<number | null>(null);
  const [smoothedHeading, setSmoothedHeading] = useState<number | null>(null);
  const [qiblahBearing, setQiblahBearing] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isStableAligned, setIsStableAligned] = useState(false);
  
  const cumulativeRotation = useRef(0);
  const lastDelta = useRef<number | null>(null);
  const prevSmoothed = useRef<number | null>(null);
  const alignedSince = useRef<number | null>(null);
  const hasVibrated = useRef(false);

  const MECCA_LAT = 21.4225;
  const MECCA_LNG = 39.8262;

  const calculateQiblah = (lat: number, lng: number) => {
    const phiK = MECCA_LAT * Math.PI / 180.0;
    const lambdaK = MECCA_LNG * Math.PI / 180.0;
    const phi = lat * Math.PI / 180.0;
    const lambda = lng * Math.PI / 180.0;
    
    const psi = 180.0 / Math.PI * Math.atan2(
      Math.sin(lambdaK - lambda),
      Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda)
    );
    
    return Math.round(normalize360(psi));
  };

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    let compass: number | null = null;
    
    // @ts-ignore - webkitCompassHeading is non-standard but common on iOS
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
      setError(t('compass_error'));
      return;
    }

    // @ts-ignore - requestPermission is iOS-specific
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        // @ts-ignore
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission !== 'granted') {
          setError(t('device_error'));
          return;
        }
      } catch (err) {
        setError(t('device_error'));
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
          setError(t('device_error'));
        }
      },
      (err) => {
        setError(t('gps_error'));
        console.error(err);
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

  const degreesRemaining = Math.abs(Math.round(delta));
  const isWithinAlignedRange = degreesRemaining <= ALIGNED_TOLERANCE;

  useEffect(() => {
    const now = Date.now();
    
    if (isWithinAlignedRange) {
      if (alignedSince.current === null) {
        alignedSince.current = now;
      } else if (now - alignedSince.current >= STABLE_DURATION_MS) {
        if (!isStableAligned) {
          setIsStableAligned(true);
          if (!hasVibrated.current && navigator.vibrate) {
            navigator.vibrate(200);
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
  }, [isWithinAlignedRange, isStableAligned]);

  useEffect(() => {
    if (smoothedHeading === null || qiblahBearing === null) return;
    
    const newDelta = shortestSignedDelta(qiblahBearing, smoothedHeading);
    
    if (lastDelta.current === null) {
      cumulativeRotation.current = newDelta;
    } else {
      const change = newDelta - lastDelta.current;
      let shortChange = change;
      if (change > 180) shortChange = change - 360;
      else if (change < -180) shortChange = change + 360;
      cumulativeRotation.current += shortChange;
    }
    lastDelta.current = newDelta;
  }, [smoothedHeading, qiblahBearing]);

  const arrowRotation = cumulativeRotation.current;
  
  const isArabic = i18n.language === 'ar' || i18n.language === 'ur' || i18n.language === 'fa';
  const directionText = delta > 0 
    ? (isArabic ? 'يمين' : t('turn_right')) 
    : (isArabic ? 'يسار' : t('turn_left'));

  const isNear = degreesRemaining > ALIGNED_TOLERANCE && degreesRemaining <= NEAR_THRESHOLD;

  const getColorClass = () => {
    if (isWithinAlignedRange) return 'green';
    if (isNear) return 'yellow';
    return 'red';
  };
  
  const colorState = getColorClass();

  const ringColors = {
    green: 'border-green-500 bg-green-500/10',
    yellow: 'border-yellow-500 bg-yellow-500/10',
    red: 'border-red-500 bg-red-500/10'
  };

  const arrowGradients = {
    green: 'from-transparent to-green-500',
    yellow: 'from-transparent to-yellow-500',
    red: 'from-transparent to-red-500'
  };

  const dotColors = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  };

  const textColors = {
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500'
  };

  const calibrationTip = isArabic 
    ? "إذا الاتجاه غير دقيق، حرّك الجوال بشكل رقم ٨ لإعادة معايرة البوصلة"
    : t('accuracy_tip');

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
      <Card className="w-full max-w-md border-2 border-primary/20 shadow-lg overflow-hidden bg-card relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 pointer-events-none" />
        
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-[38px] tracking-tight font-black font-serif text-primary flex items-center justify-center gap-2">
            <Compass className="w-8 h-8" />
            {t('qiblah_direction')}
          </CardTitle>
          <p className="text-muted-foreground text-[23px]">
            {location ? t('location_set') : t('tap_to_start')}
          </p>
        </CardHeader>

        <CardContent className="flex flex-col items-center pt-8 pb-12 space-y-8 relative">
          
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div 
              className={`absolute inset-0 rounded-full border-4 shadow-inner transition-colors duration-300 ${
                smoothedHeading !== null ? ringColors[colorState] : 'border-muted/30 bg-background/50'
              }`} 
            />
            
            {[0, 90, 180, 270].map((deg) => (
              <div 
                key={deg} 
                className="absolute text-xs font-bold text-muted-foreground pointer-events-none"
                style={{ 
                  transform: `rotate(${deg}deg) translate(0, -110px) rotate(-${deg}deg)` 
                }}
              >
                {deg === 0 ? 'N' : deg === 90 ? 'E' : deg === 180 ? 'S' : 'W'}
              </div>
            ))}

            {qiblahBearing !== null && smoothedHeading !== null && (
              <motion.div 
                className="absolute w-full h-full flex items-center justify-center z-20 pointer-events-none"
                animate={{ rotate: arrowRotation }}
                transition={{ type: "spring", damping: 30, stiffness: 150 }}
              >
                <div 
                  className={`w-2 h-32 rounded-full absolute -top-4 origin-bottom transition-colors duration-300 bg-gradient-to-t ${arrowGradients[colorState]}`} 
                />
                <div 
                  className={`w-4 h-4 rounded-full absolute top-0 shadow-lg transition-colors duration-300 ${dotColors[colorState]}`} 
                />
                
                <div 
                  className="absolute top-[-40px] flex flex-col items-center pointer-events-none"
                >
                  <span className="text-3xl drop-shadow-lg" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>🕋</span>
                </div>
              </motion.div>
            )}

            <div className="w-4 h-4 bg-foreground rounded-full z-30 ring-4 ring-background pointer-events-none" />
          </div>

          <div className="text-center space-y-3">
            {qiblahBearing !== null ? (
              <>
                <div className={`text-4xl font-mono font-black transition-colors duration-300 ${
                  smoothedHeading !== null ? textColors[colorState] : 'text-foreground'
                }`}>
                  {Math.round(qiblahBearing)}°
                </div>
                
                {smoothedHeading !== null && (
                  isStableAligned ? (
                    <div className="text-lg font-bold text-green-500 animate-pulse flex items-center justify-center gap-2 bg-green-500/10 px-4 py-2 rounded-full">
                      ✓ {t('qiblah_aligned')}
                    </div>
                  ) : (
                    <div className={`text-xl font-bold transition-colors duration-300 ${textColors[colorState]} px-4 py-2 rounded-full`}
                      style={{ backgroundColor: colorState === 'yellow' ? 'rgba(234, 179, 8, 0.1)' : colorState === 'red' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)' }}
                    >
                      <span dir="rtl">
                        {isArabic ? (
                          <>باقي {degreesRemaining}° {directionText}</>
                        ) : (
                          <>{degreesRemaining}° {directionText}</>
                        )}
                      </span>
                    </div>
                  )
                )}
                
                {smoothedHeading === null && (
                  <p className="text-sm text-muted-foreground font-medium">
                    {t('degree_from_north')}
                  </p>
                )}
              </>
            ) : (
              <Button 
                onClick={startCompass} 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg shadow-md gap-2"
              >
                <Navigation className="w-5 h-5" />
                {t('locate_direction')}
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg font-bold">
              {error}
            </div>
          )}
          
        </CardContent>
      </Card>
      
      {smoothedHeading !== null && !isStableAligned && (
        <div className="text-center max-w-sm text-muted-foreground text-sm px-4 bg-muted/30 p-3 rounded-xl border border-border/50">
          <div className="flex items-center justify-center gap-2 mb-1">
            <RotateCcw className="w-4 h-4" />
            <span className="font-bold">{isArabic ? "تلميح" : "Tip"}</span>
          </div>
          <p className="text-[18px]">{calibrationTip}</p>
        </div>
      )}
      
      {(!smoothedHeading || isStableAligned) && (
        <div className="text-center max-w-sm text-muted-foreground text-sm px-4">
          <p className="text-[20px]">{t('accuracy_tip')}</p>
        </div>
      )}
    </div>
  );
}
