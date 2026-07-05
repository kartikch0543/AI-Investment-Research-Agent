import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "alphalens-theme";
const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system"
};

function applyResolvedTheme(theme) {
  const root = window.document.documentElement;

  root.classList.toggle("dark", theme === THEME_MODES.DARK);
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredThemeMode() {
  const savedTheme = window.localStorage.getItem(STORAGE_KEY);

  if (
    savedTheme === THEME_MODES.LIGHT ||
    savedTheme === THEME_MODES.DARK ||
    savedTheme === THEME_MODES.SYSTEM
  ) {
    return savedTheme;
  }

  return THEME_MODES.SYSTEM;
}

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(getStoredThemeMode);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  const resolvedTheme =
    themeMode === THEME_MODES.SYSTEM
      ? systemTheme
      : themeMode;

  useEffect(() => {
    applyResolvedTheme(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function handleThemeChange(event) {
      setSystemTheme(event.matches ? THEME_MODES.DARK : THEME_MODES.LIGHT);
    }

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    if (themeMode === THEME_MODES.SYSTEM) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, themeMode);
  }, [themeMode]);

  function toggleTheme() {
    setThemeMode((currentThemeMode) => {
      const currentResolvedTheme =
        currentThemeMode === THEME_MODES.SYSTEM ? systemTheme : currentThemeMode;

      return currentResolvedTheme === THEME_MODES.DARK
        ? THEME_MODES.LIGHT
        : THEME_MODES.DARK;
    });
  }

  function setTheme(mode) {
    setThemeMode(mode);
  }

  const value = useMemo(
    () => ({
      themeMode,
      resolvedTheme,
      systemTheme,
      isDark: resolvedTheme === THEME_MODES.DARK,
      setTheme,
      toggleTheme
    }),
    [resolvedTheme, systemTheme, themeMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const contextValue = useContext(ThemeContext);

  if (!contextValue) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return contextValue;
}

export { THEME_MODES };
