import { THEME_MODES, useTheme } from "../../context/ThemeContext";

function SunIcon({ active }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition duration-300 ${active ? "rotate-0 scale-100" : "-rotate-45 scale-90"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23 5.46 5.46" />
    </svg>
  );
}

function MoonIcon({ active }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition duration-300 ${active ? "rotate-0 scale-100" : "rotate-45 scale-90"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.5 14.7A8.5 8.5 0 1 1 9.3 3.5a7 7 0 1 0 11.2 11.2Z" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="4.5" width="17" height="11" rx="2" />
      <path d="M9 19.5h6M12 15.5v4" />
    </svg>
  );
}

function ThemeToggle() {
  const { themeMode, isDark, toggleTheme, setTheme } = useTheme();
  const isSystem = themeMode === THEME_MODES.SYSTEM;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 p-1.5 shadow-lg shadow-slate-200/50 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-slate-900/80 dark:shadow-none">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle between light and dark mode"
        className="group inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 pr-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
      >
        <span className="relative flex h-7 w-14 items-center rounded-full bg-slate-200 p-1 transition-colors dark:bg-slate-800">
          <span
            className={`absolute h-5 w-5 rounded-full bg-white shadow-sm ring-1 ring-slate-300 transition-all duration-300 dark:bg-cyan-400 dark:ring-cyan-300/40 ${
              isDark ? "translate-x-7" : "translate-x-0"
            }`}
          />
          <span className="relative z-10 flex w-full items-center justify-between px-0.5">
            <span className={`transition ${isDark ? "text-slate-400 opacity-60" : "text-amber-500 opacity-100"}`}>
              <SunIcon active={!isDark} />
            </span>
            <span className={`transition ${isDark ? "text-slate-950 opacity-100" : "text-slate-400 opacity-60"}`}>
              <MoonIcon active={isDark} />
            </span>
          </span>
        </span>
        <span className="hidden pr-1 sm:inline">{isDark ? "Dark mode" : "Light mode"}</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme(THEME_MODES.SYSTEM)}
        aria-pressed={isSystem}
        className={`inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold transition ${
          isSystem
            ? "bg-slate-900 text-white shadow-sm dark:bg-cyan-400 dark:text-slate-950"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        }`}
      >
        <DesktopIcon />
        System
      </button>
    </div>
  );
}

export default ThemeToggle;
