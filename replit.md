# Eid Countdown Application

## Overview

A multilingual Islamic application supporting 10 languages (Arabic, English, Urdu, Farsi, Indonesian, Turkish, French, Bengali, Russian, Spanish) that provides an Eid countdown timer, prayer times, Qiblah finder, Quran reader, Duas & Adhkar, and daily Islamic content (Prophet stories and authentic Hadiths). The application is built with React and designed with RTL-first support for Arabic, Urdu, and Farsi, featuring a modern Islamic aesthetic with deep navy theming.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled with Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state, React useState for local state
- **Styling**: Tailwind CSS v4 with CSS variables for theming, using shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions and effects
- **Internationalization**: i18next with browser language detection, supporting 10 languages: Arabic (default), English, Urdu, Farsi, Indonesian, Turkish, French, Bengali, Russian, Spanish. 165 translation keys per language. RTL auto-detected for ar/ur/fa via `i18n.dir()`. All UI text uses `t()` translation calls — no hardcoded language checks for displayed text.

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Build System**: Custom build script using esbuild for server bundling and Vite for client
- **API Pattern**: RESTful routes prefixed with `/api`
- **Storage Interface**: Abstract IStorage interface with in-memory implementation (MemStorage), designed for easy swap to persistent storage

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL (schema defined but database optional)
- **Schema Validation**: Zod with drizzle-zod for type-safe schema inference
- **Current Storage**: In-memory storage for users; Islamic content (Ayahs, Hadiths, stories) stored as static TypeScript data files

### Key Design Patterns
- **Component Architecture**: Atomic design with reusable UI components in `client/src/components/ui/`
- **Custom Hooks**: Business logic extracted into hooks (`use-prayer-times`, `use-mobile`, `use-toast`, `use-ui-preferences`, `use-dua-preferences`)
- **Content Management**: Daily content rotates based on date with localStorage persistence
- **Responsive Design**: Mobile-first with RTL support, using CSS Grid and Flexbox

### Feature Modules
1. **Countdown Timer**: Tracks Ramadan, Eid al-Fitr, and Eid al-Adha with confetti celebration on completion
2. **Prayer Times**: Fetches times based on geolocation or manual city selection, displays next prayer countdown with "prayer now" detection. API endpoints: `/api/prayer-times` and `/api/next-prayer` with GPS/IP fallback, Hijri dates, sunrise times, and 10-min caching
3. **Qiblah Finder**: Uses device compass and geolocation to calculate direction to Mecca. Features accuracy indicator (high/medium/low based on heading variance), distance to Makkah display (Haversine), color-coded alignment feedback, and calibration tips
4. **Daily Content**: Rotating Islamic content with reading time estimates, sourced from static data files
5. **Quran Reader**: Full Quran with Juz-based navigation, Surah selector modal (search by name/number), global search across all 30 Juz with local caching, bookmarks, focus mode, and inline A-/A/A+ font size controls
6. **Duas & Adhkar**: Hisn Al-Muslim content with 295 authentic duas across 15 categories. Features pagination (8 mobile/12 desktop), font size controls (A-/A/A+ with 3 scales persisted in localStorage), compact/full view toggle, debounced search across title+text+source, category pills with counts, collapsible cards, copy/share with 44px touch targets, and scroll-to-top button. Uses `useDuaPreferences` hook for persisted settings.
7. **Home Quick Services**: Service shortcut cards on home page linking to Quran, Duas, Qiblah, and Stories

### Navigation (Apple-style pill bar, 5 tabs)
- المواقيت (Prayer Times) - default
- القبلة (Qiblah)
- القرآن (Quran Reader)
- الأدعية (Duas)
- القصص (Stories/Daily Content)
- Header: Two-layer design (app identity + nav pills), dark (#0B1324) background
- Pill style: Custom buttons with gradient active state, horizontally scrollable with auto-centering
- Page title section below header shows current section name in Arabic/English

### Key Data Files
- `client/src/data/quran.json` - Full Quran text (114 surahs, 6236 verses) from quran-json@3.1.2, loaded locally
- `client/src/data/surahs.json` - All 114 Surahs (number + Arabic name)
- `client/src/data/hisn-al-muslim.json` - 37 authentic duas from Hisn Al-Muslim with sources
- `client/src/data/hadith-stories.json` - 100 curated narrative hadiths (60 Bukhari + 40 Muslim) from fawazahmed0/hadith-api
- `client/src/data/prophet-stories.ts` - 25 prophet stories covering 10 prophets, bilingual (ar/en), with Quran references
- `client/src/components/stories-view.tsx` - Restructured Stories section with 4 categories: قصص الأنبياء (active), السيرة النبوية (coming soon), قصص من الأحاديث (active), مواقف من الصحابة (coming soon). Features category cards, grouped prophet stories, paginated/searchable hadith list, detail views with source attribution

## External Dependencies

### Third-Party Libraries
- **UI Components**: Radix UI primitives (dialog, tabs, select, etc.) wrapped by shadcn/ui
- **Date Handling**: date-fns for formatting and calculations
- **Confetti**: canvas-confetti for celebration effects
- **Icons**: Lucide React icon library
- **Fonts**: Google Fonts (Cairo for modern text, Amiri for classical Arabic)

### APIs and Services
- **Prayer Times API**: Aladhan API (external) for accurate prayer time calculations
- **Geolocation**: Browser Geolocation API for user location
- **Device Orientation**: DeviceOrientationEvent API for Qiblah compass

### Database
- **Configured**: PostgreSQL via Drizzle ORM
- **Current State**: Not provisioned; application runs with in-memory storage
- **Schema**: Basic users table defined in `shared/schema.ts`

### Development Tools
- **Replit Plugins**: vite-plugin-runtime-error-modal, cartographer, dev-banner
- **Meta Images**: Custom Vite plugin for OpenGraph image handling