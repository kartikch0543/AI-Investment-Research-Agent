import { THEME_MODES, useTheme } from "../../context/ThemeContext";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23 5.46 5.46" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 14.7A8.5 8.5 0 1 1 9.3 3.5a7 7 0 1 0 11.2 11.2Z" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="4.5" width="17" height="11" rx="2" />
      <path d="M9 19.5h6M12 15.5v4" />
    </svg>
  );
}

function ThemeToggle() {
  const { themeMode, isDark, setTheme } = useTheme();

  const modes = [
    { key: THEME_MODES.LIGHT, icon: <SunIcon />, label: "Light" },
    { key: THEME_MODES.DARK, icon: <MoonIcon />, label: "Dark" },
    { key: THEME_MODES.SYSTEM, icon: <SystemIcon />, label: "System" },
  ];

  return (
    <div className="flex items-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-1 gap-0.5">
      {modes.map(({ key, icon, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => setTheme(key)}
          title={label}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
            themeMode === key
              ? "bg-[var(--bg-surface)] text-[var(--color-accent)] shadow-sm border border-[var(--border-color)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
          style={{ cursor: "pointer" }}
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

export default ThemeToggle;
