export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#e2e8f0",
        canvas: "#f8fafc",
        signal: "#0f766e",
        ember: "#b45309",
        danger: "#b91c1c"
      },
      fontFamily: {
        sans: ["Segoe UI", "system-ui", "sans-serif"]
      },
      boxShadow: {
        panel: "0 24px 60px rgba(15, 23, 42, 0.10)"
      }
    }
  },
  plugins: []
};
