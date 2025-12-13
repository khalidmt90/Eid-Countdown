# عد تنازلي للعيد (Eid Countdown)

A beautiful, responsive Eid Countdown application built with React, Tailwind CSS, and Framer Motion.

## Features

- 🌙 **Dual Countdown**: Tracks both Eid al-Fitr and Eid al-Adha.
- 🎨 **Modern Islamic Design**: Elegant gold and deep blue theme with geometric patterns.
- 📱 **Fully Responsive**: Works perfectly on mobile, tablet, and desktop.
- 🌍 **RTL Support**: Built natively for Arabic users.
- ✨ **Animations**: Smooth transitions and confetti celebration.

## Setup & Running on Replit

1. **Fork/Clone** this project on Replit.
2. Click the **Run** button.
3. The application will start automatically.

## Customization

### Changing the Logo
1. Upload your image to the `attached_assets` folder (or any folder in `client/public`).
2. Open `client/src/pages/home.tsx`.
3. Locate the `img` tag inside the `Header` section.
4. Update the `src` attribute to your image path.

### Updating Eid Dates
The dates are currently estimated based on astronomical calculations. To update them:

1. Open `client/src/lib/eid-dates.ts`.
2. Edit the `EID_DATES` array with the confirmed dates for your region.
3. The format must be `YYYY-MM-DD`.

```typescript
export const EID_DATES: EidDate[] = [
  {
    year: 2025,
    name: "Eid al-Fitr",
    nameAr: "عيد الفطر",
    date: "2025-03-31", // Update this line
  },
  // ...
];
```

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Fonts**: Cairo (UI), Amiri (Headings)

## License

MIT
