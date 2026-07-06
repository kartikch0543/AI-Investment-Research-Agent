/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        sidebar: "var(--bg-secondary)",
        card: "var(--bg-surface)",
        border: "var(--border-color)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        buy: "var(--color-buy)",
        watchlist: "var(--color-watchlist)",
        avoid: "var(--color-avoid)"
      },
      fontFamily: {
        sans: ["Geist", "Inter", "Segoe UI", "system-ui", "sans-serif"]
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)"
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px"
      }
    }
  },
  plugins: []
};
