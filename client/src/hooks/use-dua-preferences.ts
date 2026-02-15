import { useState, useCallback } from "react";

export type FontScale = "small" | "medium" | "large";
export type ViewMode = "compact" | "full";

const FONT_SIZES: Record<FontScale, number> = { small: 1.0, medium: 1.15, large: 1.3 };
const LINE_HEIGHTS: Record<FontScale, number> = { small: 1.9, medium: 2.05, large: 2.2 };

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useDuaPreferences() {
  const [fontScale, setFontScaleState] = useState<FontScale>(() => load("duaFontScale", "medium" as FontScale));
  const [viewMode, setViewModeState] = useState<ViewMode>(() => load("duaViewMode", "full" as ViewMode));

  const setFontScale = useCallback((s: FontScale) => {
    setFontScaleState(s);
    localStorage.setItem("duaFontScale", JSON.stringify(s));
  }, []);

  const setViewMode = useCallback((m: ViewMode) => {
    setViewModeState(m);
    localStorage.setItem("duaViewMode", JSON.stringify(m));
  }, []);

  return {
    fontScale,
    setFontScale,
    viewMode,
    setViewMode,
    fontSize: FONT_SIZES[fontScale],
    lineHeight: LINE_HEIGHTS[fontScale],
  };
}
