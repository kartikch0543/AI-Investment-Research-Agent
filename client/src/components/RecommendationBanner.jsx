import { motion } from "framer-motion";

const DECISION_CONFIG = {
  BUY: {
    label: "BUY",
    emoji: "🚀",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/20",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20",
    text: "text-emerald-900 dark:text-emerald-100",
    accent: "bg-emerald-500",
    bar: "bg-emerald-500"
  },
  WATCHLIST: {
    label: "WATCHLIST",
    emoji: "👀",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/20",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border-amber-200 dark:border-amber-500/20",
    text: "text-amber-900 dark:text-amber-100",
    accent: "bg-amber-500",
    bar: "bg-amber-500"
  },
  AVOID: {
    label: "AVOID",
    emoji: "⚠️",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-200 dark:border-rose-500/20",
    badge: "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 border-rose-200 dark:border-rose-500/20",
    text: "text-rose-900 dark:text-rose-100",
    accent: "bg-rose-500",
    bar: "bg-rose-500"
  }
};

function getConfig(decision) {
  return DECISION_CONFIG[decision] || DECISION_CONFIG.AVOID;
}

// Parse confidence string like "85%" into number
function parsePercent(val) {
  if (typeof val === "number") return Math.min(100, Math.max(0, val));
  const match = String(val).match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function ScoreRing({ value, size = 64, strokeWidth = 5, colorClass }) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const num = parsePercent(value);
  const offset = circumference - (num / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-[var(--border-color-strong)]"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          className={`score-ring ${colorClass}`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-[var(--text-primary)]">{num}</span>
      </div>
    </div>
  );
}

function RecommendationBanner({ decision, confidence, overallScore, reasoning }) {
  const config = getConfig(decision);
  const confidenceNum = parsePercent(confidence);
  const scoreNum = parsePercent(overallScore);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl border p-6 ${config.bg} ${config.border} relative overflow-hidden`}
    >
      {/* Accent glow line */}
      <div className={`absolute inset-x-0 top-0 h-[2px] ${config.accent} opacity-60`} />

      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Left — Badge + Reasoning */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold tracking-wide ${config.badge}`}>
              <span>{config.emoji}</span>
              <span>{config.label}</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">AI Recommendation</span>
          </div>

          <h2 className={`text-3xl font-bold tracking-tight leading-tight ${config.text}`}>
            {decision === "BUY" ? "Strong Investment Signal" : decision === "WATCHLIST" ? "Monitor This Stock" : "Exercise Caution"}
          </h2>

          <p className={`mt-3 text-sm leading-relaxed opacity-85 max-w-2xl ${config.text}`}>
            {reasoning}
          </p>
        </div>

        {/* Right — Metrics */}
        <div className="flex flex-row lg:flex-col gap-4 lg:gap-3 shrink-0">
          {/* Confidence */}
          <div className="flex items-center gap-4 rounded-xl bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 px-4 py-3 min-w-[160px]">
            <ScoreRing value={confidenceNum} size={52} strokeWidth={5} colorClass={config.text} />
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-wider opacity-70 ${config.text}`}>Confidence</p>
              <p className={`text-xl font-bold ${config.text}`}>{confidence}</p>
            </div>
          </div>

          {/* Overall Score */}
          <div className="flex items-center gap-4 rounded-xl bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 px-4 py-3 min-w-[160px]">
            <ScoreRing value={scoreNum} size={52} strokeWidth={5} colorClass={config.text} />
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-wider opacity-70 ${config.text}`}>Score</p>
              <p className={`text-xl font-bold ${config.text}`}>{overallScore}</p>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="rounded-xl bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 px-4 py-3 min-w-[160px]">
            <p className={`text-[10px] font-bold uppercase tracking-wider opacity-70 mb-2 ${config.text}`}>Conviction</p>
            <div className="h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidenceNum}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`h-full rounded-full ${config.bar}`}
              />
            </div>
            <p className={`text-xs font-semibold mt-1 ${config.text}`}>{confidenceNum}%</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default RecommendationBanner;
