import { THEME_MODES, useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { themeMode, resolvedTheme, toggleTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === THEME_MODES.DARK;
  const isSystem = themeMode === THEME_MODES.SYSTEM;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 p-1.5 shadow-lg shadow-slate-200/50 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-none">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle between light and dark mode"
        className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
      >
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full transition ${
            isDark ? "bg-cyan-400/20 text-cyan-300" : "bg-amber-100 text-amber-600"
          }`}
        >
          {isDark ? "Moon" : "Sun"}
        </span>
        <span>{isDark ? "Dark" : "Light"}</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme(THEME_MODES.SYSTEM)}
        aria-pressed={isSystem}
        className={`inline-flex h-10 items-center rounded-full px-3 text-sm font-medium transition ${
          isSystem
            ? "bg-slate-900 text-white dark:bg-cyan-400 dark:text-slate-950"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-200"
        }`}
      >
        System
      </button>
    </div>
  );
}

export default ThemeToggle;
