# Eid Countdown Application

## Overview

A bilingual (Arabic/English) Islamic application that provides an Eid countdown timer, prayer times, Qiblah finder, and daily Islamic content (Ayahs, Hadiths, and Prophet stories). The application is built with React and designed with RTL-first Arabic support, featuring a modern Islamic aesthetic with gold and deep navy theming.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled with Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state, React useState for local state
- **Styling**: Tailwind CSS v4 with CSS variables for theming, using shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions and effects
- **Internationalization**: i18next with browser language detection, supporting Arabic (default) and English

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
- **Custom Hooks**: Business logic extracted into hooks (`use-prayer-times`, `use-mobile`, `use-toast`)
- **Content Management**: Daily content rotates based on date with localStorage persistence
- **Responsive Design**: Mobile-first with RTL support, using CSS Grid and Flexbox

### Feature Modules
1. **Countdown Timer**: Tracks Ramadan, Eid al-Fitr, and Eid al-Adha with confetti celebration on completion
2. **Prayer Times**: Fetches times based on geolocation or manual city selection, displays next prayer countdown. API endpoints: `/api/prayer-times` and `/api/next-prayer` with GPS/IP fallback, Hijri dates, sunrise times, and 10-min caching
3. **Qiblah Finder**: Uses device compass and geolocation to calculate direction to Mecca
4. **Daily Content**: Rotating Islamic content with reading time estimates, sourced from static data files
5. **Quran Reader**: Full Quran with Juz-based navigation, Surah selector modal (search by name/number), global search across all 30 Juz with local caching, bookmarks, and focus mode
6. **Duas & Adhkar**: Hisn Al-Muslim content with 37 authentic duas across 8 categories (أذكار الصباح/المساء/النوم/الاستيقاظ, دعاء السفر/المنزل, أذكار الطعام). Features search, category filters, copy/share, expand/collapse
7. **Home Quick Services**: Service shortcut cards on home page linking to Quran, Duas, Qiblah, and Stories

### Navigation Tabs (5 tabs)
- المواقيت (Prayer Times) - default
- القبلة (Qiblah)
- القصص (Stories/Daily Content)
- القرآن (Quran Reader)
- الأدعية (Duas)

### Key Data Files
- `client/src/data/surahs.json` - All 114 Surahs (number + Arabic name)
- `client/src/data/hisn-al-muslim.json` - 37 authentic duas from Hisn Al-Muslim with sources

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