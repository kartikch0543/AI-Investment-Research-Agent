export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1120",
        mist: "#dbe4f0",
        canvas: "#f6f8fb",
        signal: "#0f766e",
        ember: "#b45309",
        danger: "#b91c1c",
        panel: "#ffffff",
        "panel-dark": "#0f172a",
        accent: "#06b6d4"
      },
      fontFamily: {
        sans: ["Segoe UI", "system-ui", "sans-serif"]
      },
      boxShadow: {
        panel: "0 24px 60px rgba(15, 23, 42, 0.10)",
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 80px rgba(8, 15, 34, 0.35)"
      }
    }
  },
  plugins: []
};
