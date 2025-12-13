import { useEffect, useState } from "react";
import { Compass, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function QiblahFinder() {
  const { t } = useTranslation();
  const [heading, setHeading] = useState<number | null>(null);
  const [qiblahBearing, setQiblahBearing] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  // Mecca Coordinates
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
    
    return Math.round(psi < 0 ? psi + 360 : psi);
  };

  const startCompass = () => {
    if (!navigator.geolocation) {
      setError(t('compass_error'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        const bearing = calculateQiblah(latitude, longitude);
        setQiblahBearing(bearing);

        // Request device orientation if available (mobile)
        if (window.DeviceOrientationEvent) {
          window.addEventListener("deviceorientationabsolute", handleOrientation as any, true);
          // Fallback for some browsers
          window.addEventListener("deviceorientation", handleOrientation, true);
        } else {
          setError(t('device_error'));
        }
      },
      (err) => {
        setError(t('gps_error'));
        console.error(err);
      }
    );
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    let compass = 0;
    // @ts-ignore - webkitCompassHeading is non-standard but common on iOS
    if (event.webkitCompassHeading) {
      // @ts-ignore
      compass = event.webkitCompassHeading;
    } else if (event.alpha) {
      compass = 360 - event.alpha;
    }
    setHeading(compass);
  };

  // Clean up
  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation as any);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  // Calculate rotation for the Qiblah arrow
  // If we have heading (compass), arrow points to Qiblah relative to North
  // Rotation = Qiblah Bearing - Current Heading
  const arrowRotation = (qiblahBearing || 0) - (heading || 0);

  // Check if phone is pointing toward Qiblah (within tolerance)
  const TOLERANCE = 15; // degrees
  const isAligned = heading !== null && qiblahBearing !== null && 
    Math.abs(arrowRotation) <= TOLERANCE || 
    Math.abs(arrowRotation) >= (360 - TOLERANCE);

  // Haptic feedback when aligned
  useEffect(() => {
    if (isAligned && navigator.vibrate) {
      navigator.vibrate(200);
    }
  }, [isAligned]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
      <Card className="w-full max-w-md border-2 border-primary/20 shadow-2xl overflow-hidden bg-card/50 backdrop-blur-sm relative">
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
          
          {/* Compass Visualization */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer Ring - Glows when aligned */}
            <div 
              className={`absolute inset-0 rounded-full border-4 shadow-inner transition-all duration-500 ${
                isAligned 
                  ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.6)] bg-green-500/10' 
                  : 'border-muted/30 bg-background/50'
              }`} 
            />
            
            {/* Degree Marks */}
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

            {/* Qiblah Arrow (Kaaba Direction) */}
            {qiblahBearing !== null && (
              <motion.div 
                className="absolute w-full h-full flex items-center justify-center z-20"
                animate={{ rotate: arrowRotation }}
                transition={{ type: "spring", damping: 20 }}
              >
                <div 
                  className={`w-2 h-32 rounded-full absolute -top-4 origin-bottom transition-all duration-500 ${
                    isAligned 
                      ? 'bg-gradient-to-t from-transparent to-green-500 shadow-[0_0_25px_rgba(34,197,94,0.8)]' 
                      : 'bg-gradient-to-t from-transparent to-primary shadow-[0_0_15px_rgba(var(--primary),0.6)]'
                  }`} 
                />
                <div 
                  className={`w-4 h-4 rounded-full absolute top-0 shadow-lg transition-all duration-500 ${
                    isAligned ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'bg-primary'
                  }`} 
                />
                
                {/* Kaaba Icon at tip */}
                <div 
                  className={`absolute top-[-30px] text-white p-1 rounded-sm shadow-md border transform -translate-x-1/2 left-1/2 w-8 h-8 flex items-center justify-center transition-all duration-500 ${
                    isAligned 
                      ? 'bg-green-600 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.8)]' 
                      : 'bg-black border-[#D4AF37]'
                  }`}
                >
                  <div className={`w-full h-1 absolute top-2 transition-colors duration-500 ${
                    isAligned ? 'bg-green-200' : 'bg-[#D4AF37]'
                  }`} />
                </div>
              </motion.div>
            )}

            {/* Center Point */}
            <div className="w-4 h-4 bg-foreground rounded-full z-30 ring-4 ring-background" />
          </div>

          <div className="text-center space-y-2">
            {qiblahBearing !== null ? (
              <>
                <div className={`text-4xl font-mono font-black transition-colors duration-500 ${
                  isAligned ? 'text-green-500' : 'text-foreground'
                }`}>
                  {Math.round(qiblahBearing)}°
                </div>
                {isAligned ? (
                  <div className="text-sm font-bold text-green-500 animate-pulse flex items-center justify-center gap-2 bg-green-500/10 px-4 py-2 rounded-full">
                    ✓ {t('qiblah_aligned')}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground font-medium">
                    {heading !== null 
                      ? t('rotate_phone') 
                      : t('degree_from_north')}
                  </p>
                )}
              </>
            ) : (
              <Button 
                onClick={startCompass} 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-primary/20 transition-all gap-2"
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
