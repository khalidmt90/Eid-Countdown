import { useTranslation } from "react-i18next";
import { MapPin, Navigation, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES, type Country, type City } from "@/lib/prayer-data";

interface LocationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: Country;
  selectedCity: City;
  usingExactLocation: boolean;
  onCountryChange: (val: string) => void;
  onCityChange: (val: string) => void;
  onUseCurrentLocation: () => void;
  onCancelLocation: () => void;
}

export function LocationSheet({
  isOpen,
  onClose,
  selectedCountry,
  selectedCity,
  usingExactLocation,
  onCountryChange,
  onCityChange,
  onUseCurrentLocation,
  onCancelLocation
}: LocationSheetProps) {
  const { t, i18n } = useTranslation();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl h-auto max-h-[80vh]">
        <SheetHeader className="mb-6 text-start">
          <SheetTitle>{t('select_city')}</SheetTitle>
          <SheetDescription>
            {t('location_set')}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 pb-8">
          {/* Country Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {t('select_country')}
            </label>
            <Select
              onValueChange={(val) => {
                onCancelLocation();
                onCountryChange(val);
              }}
              value={usingExactLocation ? undefined : selectedCountry.nameEn}
              disabled={usingExactLocation}
            >
              <SelectTrigger className="w-full h-12 bg-background border-border text-foreground font-bold text-lg">
                <SelectValue placeholder={t('select_country')} />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map(country => (
                  <SelectItem key={country.nameEn} value={country.nameEn}>
                    {i18n.language === 'ar' ? country.nameAr : country.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {t('select_city')}
            </label>
            <Select
              onValueChange={(val) => {
                onCancelLocation();
                onCityChange(val);
              }}
              value={usingExactLocation ? undefined : selectedCity.nameEn}
              disabled={usingExactLocation}
            >
              <SelectTrigger className="w-full h-12 bg-background border-border text-foreground font-bold text-lg">
                <SelectValue placeholder={t('select_city')} />
              </SelectTrigger>
              <SelectContent>
                {selectedCountry.cities.map(city => (
                  <SelectItem key={city.nameEn} value={city.nameEn}>
                    {i18n.language === 'ar' ? city.nameAr : city.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Current Location Button */}
          {!usingExactLocation ? (
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                onUseCurrentLocation();
                onClose();
              }}
              className="w-full gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary h-12 text-base font-bold"
            >
              <Navigation className="w-4 h-4" />
              {t('use_current_location')}
            </Button>
          ) : (
            <Button
              variant="destructive"
              size="lg"
              onClick={onCancelLocation}
              className="w-full gap-2 h-12 text-base font-bold"
            >
              {t('cancel_location')}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
