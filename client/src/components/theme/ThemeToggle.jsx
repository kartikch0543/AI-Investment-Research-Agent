import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex h-11 items-center gap-3 rounded-full border border-white/10 bg-white/70 px-4 text-sm font-medium text-slate-700 shadow-lg shadow-slate-200/50 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:shadow-none"
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full transition ${
          isDark ? "bg-cyan-400/20 text-cyan-300" : "bg-amber-100 text-amber-600"
        }`}
      >
        {isDark ? "◐" : "◑"}
      </span>
      <span>{isDark ? "Dark" : "Light"} mode</span>
    </button>
  );
}

export default ThemeToggle;
