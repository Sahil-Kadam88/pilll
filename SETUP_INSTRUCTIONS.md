# Smart Pill Dispenser Dashboard - Setup Instructions

## Overview

This is a fully responsive web dashboard for managing a smart pill dispenser. It connects to Google Sheets via Apps Script Web App endpoints to manage schedules and track medication intake logs.

## Features

✅ **Schedule Management**
- Time pickers for morning and evening doses
- Sync with Google Sheets via Apps Script
- Real-time schedule updates with success notifications

✅ **Medication Logs**
- Color-coded status tracking (Taken ✅, Missed ❌, Refill Needed ⚠️, Emergency 🚨)
- Searchable and paginated table
- Mobile-friendly responsive design

✅ **Analytics & Charts**
- Weekly compliance tracking
- Interactive Chart.js visualizations
- Compliance rate calculations and insights

✅ **Modern UI/UX**
- Dark theme with neon green accents (#00E6A8)
- Smooth animations and transitions
- Mobile-first responsive design
- Glowing effects and modern gradients

## Google Sheets Setup

### 1. Create Two Google Sheets

**Sheet 1: Schedule (for pill timing)**
- Column A: `morning` 
- Column B: `evening`
- Row 2: Your current times (e.g., "08:00", "20:00")

**Sheet 2: Logs (for intake tracking)**
- Column A: `date` (e.g., "2024-01-15")
- Column B: `time` (e.g., "08:00")
- Column C: `status` (values: "Taken", "Missed", "RefillNeeded", "EMERGENCY ALERT")
- Column D: `method` (e.g., "Automatic", "Manual", "System")

### 2. Create Apps Script Web Apps

For each sheet, go to **Extensions > Apps Script** and create these functions:

**Schedule Sheet Apps Script:**
```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  if (e.parameter.morning && e.parameter.evening) {
    // Save new schedule
    sheet.getRange('A2').setValue(e.parameter.morning);
    sheet.getRange('B2').setValue(e.parameter.evening);
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      morning: e.parameter.morning,
      evening: e.parameter.evening
    })).setMimeType(ContentService.MimeType.JSON);
  } else {
    // Return current schedule
    const morning = sheet.getRange('A2').getValue() || "08:00";
    const evening = sheet.getRange('B2').getValue() || "20:00";
    return ContentService.createTextOutput(JSON.stringify({
      morning: morning,
      evening: evening
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

**Logs Sheet Apps Script:**
```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  const logs = [];
  for (let i = 1; i < data.length; i++) {
    logs.push({
      date: data[i][0],
      time: data[i][1],
      status: data[i][2],
      method: data[i][3]
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    logs: logs
  })).setMimeType(ContentService.MimeType.JSON);
}
```

### 3. Deploy as Web Apps

1. Click **Deploy > New Deployment**
2. Choose **Web app** as type
3. Set **Execute as: Me**
4. Set **Who has access: Anyone** (or Anyone with Google account)
5. Copy the Web App URL

### 4. Update Dashboard Endpoints

In the dashboard files, replace these URLs with your actual Apps Script Web App URLs:

**In `src/components/ScheduleTab.tsx` (line 10):**
```javascript
const SCHEDULE_ENDPOINT = "YOUR_SCHEDULE_WEBAPP_URL_HERE";
```

**In `src/components/LogsTab.tsx` (line 10):**
```javascript
const LOGS_ENDPOINT = "YOUR_LOGS_WEBAPP_URL_HERE";
```

## Customization Guide

### Changing Colors

All colors are defined in `src/index.css` using CSS variables. To change the theme:

```css
:root {
  --primary: 160 100% 45%; /* Change this HSL value for different primary color */
  --destructive: 0 84% 60%; /* Alert red */
  --success: 142 76% 36%; /* Success green */
  --warning: 48 96% 53%; /* Warning yellow */
  --emergency: 25 95% 53%; /* Emergency orange */
}
```

### Adding New Status Types

In `src/components/LogsTab.tsx`, update the `getStatusBadge` function and add corresponding CSS classes in `src/index.css`.

### Modifying Charts

Charts are built with Chart.js in `src/components/AnalyticsTab.tsx`. Customize:
- Colors in chart data objects
- Chart types (Bar, Doughnut, Line, etc.)
- Options for styling and behavior

## Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to repository **Settings > Pages**
3. Select source branch (usually `main`)
4. Your app will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import your GitHub repository
2. Framework preset: **Vite**
3. Deploy with default settings

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

**CORS Issues**: Ensure your Apps Script Web Apps are deployed with "Anyone" access.

**Missing Data**: Check that your Google Sheets have the correct column headers and data format.

**Chart Not Loading**: Verify Chart.js is loading correctly and data format matches expected structure.

**Styling Issues**: All styles use CSS variables - check `src/index.css` for theme definitions.

## Security Notes

- Apps Script Web Apps with "Anyone" access are publicly accessible
- Consider using Google OAuth for production deployments
- Validate and sanitize any user inputs before processing
- Store sensitive configuration in environment variables for production

---

**Tech Stack**: React + TypeScript + Vite + Tailwind CSS + Chart.js + Google Apps Script

For support or questions, check the code comments or create an issue in the repository.