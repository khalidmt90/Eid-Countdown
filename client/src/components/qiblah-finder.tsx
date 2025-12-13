import { useEffect, useState, useCallback, useRef } from "react";
import { Compass, Navigation } from "lucide-react";
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

export function QiblahFinder() {
  const { t, i18n } = useTranslation();
  const [heading, setHeading] = useState<number | null>(null);
  const [qiblahBearing, setQiblahBearing] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isListening, setIsListening] = useState(false);
  
  const cumulativeRotation = useRef(0);
  const lastDelta = useRef<number | null>(null);

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
      setHeading(compass);
    }
  }, []);

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

  const delta = qiblahBearing !== null && heading !== null 
    ? shortestSignedDelta(qiblahBearing, heading)
    : 0;

  useEffect(() => {
    if (heading === null || qiblahBearing === null) return;
    
    const newDelta = shortestSignedDelta(qiblahBearing, heading);
    
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
  }, [heading, qiblahBearing]);

  const arrowRotation = cumulativeRotation.current;
  const degreesRemaining = Math.abs(Math.round(delta));
  
  const isArabic = i18n.language === 'ar' || i18n.language === 'ur' || i18n.language === 'fa';
  const directionText = delta > 0 
    ? (isArabic ? 'يمين' : t('turn_right')) 
    : (isArabic ? 'يسار' : t('turn_left'));

  const TOLERANCE = 15;
  const NEAR_THRESHOLD = 45;
  
  const isAligned = degreesRemaining <= TOLERANCE;
  const isNear = degreesRemaining > TOLERANCE && degreesRemaining <= NEAR_THRESHOLD;
  const isFar = degreesRemaining > NEAR_THRESHOLD;

  const getColorClass = () => {
    if (isAligned) return 'green';
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

  const kaabaColors = {
    green: 'bg-green-600 border-green-400',
    yellow: 'bg-yellow-600 border-yellow-400',
    red: 'bg-red-600 border-red-400'
  };

  const kaabaInnerColors = {
    green: 'bg-green-200',
    yellow: 'bg-yellow-200',
    red: 'bg-red-200'
  };

  const textColors = {
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500'
  };

  useEffect(() => {
    if (isAligned && navigator.vibrate) {
      navigator.vibrate(200);
    }
  }, [isAligned]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
      <Card className="w-full max-w-md border-2 border-primary/20 shadow-lg overflow-hidden bg-card relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        
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
                heading !== null ? ringColors[colorState] : 'border-muted/30 bg-background/50'
              }`} 
            />
            
            {[0, 90, 180, 270].map((deg) => (
              <div 
                key={deg} 
                className="absolute text-xs font-bold text-muted-foreground"
                style={{ 
                  transform: `rotate(${deg}deg) translate(0, -110px) rotate(-${deg}deg)` 
                }}
              >
                {deg === 0 ? 'N' : deg === 90 ? 'E' : deg === 180 ? 'S' : 'W'}
              </div>
            ))}

            {qiblahBearing !== null && heading !== null && (
              <motion.div 
                className="absolute w-full h-full flex items-center justify-center z-20"
                animate={{ rotate: arrowRotation }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
              >
                <div 
                  className={`w-2 h-32 rounded-full absolute -top-4 origin-bottom transition-colors duration-300 bg-gradient-to-t ${arrowGradients[colorState]}`} 
                />
                <div 
                  className={`w-4 h-4 rounded-full absolute top-0 shadow-lg transition-colors duration-300 ${dotColors[colorState]}`} 
                />
                
                <div 
                  className={`absolute top-[-30px] text-white p-1 rounded-sm shadow-md border transform -translate-x-1/2 left-1/2 w-8 h-8 flex items-center justify-center transition-colors duration-300 ${kaabaColors[colorState]}`}
                >
                  <div className={`w-full h-1 absolute top-2 transition-colors duration-300 ${kaabaInnerColors[colorState]}`} />
                </div>
              </motion.div>
            )}

            <div className="w-4 h-4 bg-foreground rounded-full z-30 ring-4 ring-background" />
          </div>

          <div className="text-center space-y-3">
            {qiblahBearing !== null ? (
              <>
                <div className={`text-4xl font-mono font-black transition-colors duration-300 ${
                  heading !== null ? textColors[colorState] : 'text-foreground'
                }`}>
                  {Math.round(qiblahBearing)}°
                </div>
                
                {heading !== null && (
                  isAligned ? (
                    <div className="text-lg font-bold text-green-500 animate-pulse flex items-center justify-center gap-2 bg-green-500/10 px-4 py-2 rounded-full">
                      ✓ {t('qiblah_aligned')}
                    </div>
                  ) : (
                    <div className={`text-xl font-bold transition-colors duration-300 ${textColors[colorState]} bg-${colorState === 'yellow' ? 'yellow' : colorState}-500/10 px-4 py-2 rounded-full`}>
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
                
                {heading === null && (
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
      <div className="text-center max-w-sm text-muted-foreground text-sm px-4">
        <p className="text-[20px]">{t('accuracy_tip')}</p>
      </div>
    </div>
  );
}
