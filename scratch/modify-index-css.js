const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'client', 'src', 'index.css');
let content = fs.readFileSync(targetPath, 'utf8');

// Replace light theme colors
const lightThemeOld = `:root {
  color-scheme: light;
  --bg-primary:   #F7F8FA;
  --bg-secondary: #EDEEF2;
  --bg-surface:   #FFFFFF;
  --bg-elevated:  #FFFFFF;
  --text-primary:   #0D0F14;
  --text-secondary: #3D4656;
  --text-muted:     #7A8499;
  --text-inverse:   #FFFFFF;
  --border-color:        #DFE2EA;
  --border-color-strong: #C5CAD8;
  --border-color-glow:   rgba(59,130,246,0.08);
  --color-accent:        #3B82F6;
  --color-accent-hover:  #2563EB;
  --color-accent-light:  rgba(59,130,246,0.08);
  --color-accent-medium: rgba(59,130,246,0.16);
  --color-buy:            #10B981;
  --color-buy-bg:         rgba(16,185,129,0.08);
  --color-buy-border:     rgba(16,185,129,0.20);
  --color-watchlist:        #F59E0B;
  --color-watchlist-bg:     rgba(245,158,11,0.08);
  --color-watchlist-border: rgba(245,158,11,0.20);
  --color-avoid:        #EF4444;
  --color-avoid-bg:     rgba(239,68,68,0.08);
  --color-avoid-border: rgba(239,68,68,0.20);
  --app-grid: rgba(15,23,42,0.035);
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg: 0 12px 28px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04);
  --shadow-xl: 0 24px 48px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.06);
}`;

const lightThemeNew = `:root {
  color-scheme: light;
  --bg-primary:   #F8FAFC;
  --bg-secondary: #F1F5F9;
  --bg-surface:   #FFFFFF;
  --bg-elevated:  #FFFFFF;
  --text-primary:   #0F172A;
  --text-secondary: #475569;
  --text-muted:     #64748B;
  --text-inverse:   #FFFFFF;
  --border-color:        #E2E8F0;
  --border-color-strong: #CBD5E1;
  --border-color-glow:   rgba(59, 130, 246, 0.08);
  --color-accent:        #3B82F6;
  --color-accent-hover:  #2563EB;
  --color-accent-light:  rgba(59, 130, 246, 0.08);
  --color-accent-medium: rgba(59, 130, 246, 0.16);
  --color-buy:            #22C55E;
  --color-buy-bg:         rgba(34, 197, 94, 0.08);
  --color-buy-border:     rgba(34, 197, 94, 0.20);
  --color-watchlist:        #F59E0B;
  --color-watchlist-bg:     rgba(245, 158, 11, 0.08);
  --color-watchlist-border: rgba(245, 158, 11, 0.20);
  --color-avoid:        #EF4444;
  --color-avoid-bg:     rgba(239, 68, 68, 0.08);
  --color-avoid-border: rgba(239, 68, 68, 0.20);
  --app-grid: rgba(15, 23, 42, 0.035);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.03);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 12px 28px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 24px 48px rgba(0, 0, 0, 0.10), 0 8px 16px rgba(0, 0, 0, 0.06);
}`;

// Replace dark theme colors
const darkThemeOld = `:root.dark {
  color-scheme: dark;
  --bg-primary:   #09090B;
  --bg-secondary: #111114;
  --bg-surface:   #18181B;
  --bg-elevated:  #1C1C21;
  --text-primary:   #FAFAFA;
  --text-secondary: #A1A1AA;
  --text-muted:     #71717A;
  --text-inverse:   #09090B;
  --border-color:        rgba(255,255,255,0.08);
  --border-color-strong: rgba(255,255,255,0.15);
  --border-color-glow:   rgba(96,165,250,0.12);
  --color-accent:        #60A5FA;
  --color-accent-hover:  #93C5FD;
  --color-accent-light:  rgba(96,165,250,0.10);
  --color-accent-medium: rgba(96,165,250,0.20);
  --color-buy:            #34D399;
  --color-buy-bg:         rgba(52,211,153,0.10);
  --color-buy-border:     rgba(52,211,153,0.25);
  --color-watchlist:        #FCD34D;
  --color-watchlist-bg:     rgba(252,211,77,0.10);
  --color-watchlist-border: rgba(252,211,77,0.25);
  --color-avoid:        #F87171;
  --color-avoid-bg:     rgba(248,113,113,0.10);
  --color-avoid-border: rgba(248,113,113,0.25);
  --app-grid: rgba(255,255,255,0.018);
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.35);
  --shadow-md: 0 8px 24px rgba(0,0,0,0.45);
  --shadow-lg: 0 16px 40px rgba(0,0,0,0.55);
  --shadow-xl: 0 24px 64px rgba(0,0,0,0.65);
}`;

const darkThemeNew = `:root.dark {
  color-scheme: dark;
  --bg-primary:   #0B1220;
  --bg-secondary: #0F172A;
  --bg-surface:   #111827;
  --bg-elevated:  #1E293B;
  --text-primary:   #F8FAFC;
  --text-secondary: #94A3B8;
  --text-muted:     #64748B;
  --text-inverse:   #0B1220;
  --border-color:        #1F2937;
  --border-color-strong: #334155;
  --border-color-glow:   rgba(59, 130, 246, 0.12);
  --color-accent:        #3B82F6;
  --color-accent-hover:  #2563EB;
  --color-accent-light:  rgba(59, 130, 246, 0.10);
  --color-accent-medium: rgba(59, 130, 246, 0.20);
  --color-buy:            #22C55E;
  --color-buy-bg:         rgba(34, 197, 94, 0.10);
  --color-buy-border:     rgba(34, 197, 94, 0.25);
  --color-watchlist:        #F59E0B;
  --color-watchlist-bg:     rgba(245, 158, 11, 0.10);
  --color-watchlist-border: rgba(245, 158, 11, 0.25);
  --color-avoid:        #EF4444;
  --color-avoid-bg:     rgba(239, 68, 68, 0.10);
  --color-avoid-border: rgba(239, 68, 68, 0.25);
  --app-grid: rgba(255, 255, 255, 0.015);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.35);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.45);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.55);
  --shadow-xl: 0 24px 64px rgba(0, 0, 0, 0.65);
}`;

// Helper to normalize line endings
const normalize = str => str.replace(/\r\n/g, '\n').trim();

let normalizedContent = normalize(content);
let normalizedLightOld = normalize(lightThemeOld);
let normalizedLightNew = normalize(lightThemeNew);
let normalizedDarkOld = normalize(darkThemeOld);
let normalizedDarkNew = normalize(darkThemeNew);

if (normalizedContent.includes(normalizedLightOld)) {
  normalizedContent = normalizedContent.replace(normalizedLightOld, normalizedLightNew);
  console.log("Replaced light theme successfully.");
} else {
  console.log("Light theme match not found. Trying simpler replace...");
  // Try replacement of partial blocks
}

if (normalizedContent.includes(normalizedDarkOld)) {
  normalizedContent = normalizedContent.replace(normalizedDarkOld, normalizedDarkNew);
  console.log("Replaced dark theme successfully.");
} else {
  console.log("Dark theme match not found.");
}

// Write back
fs.writeFileSync(targetPath, normalizedContent, 'utf8');
console.log("Done modifying index.css");
