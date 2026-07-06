import { motion } from "framer-motion";

const DECISION_CONFIG = {
  BUY: {
    label: "BUY SIGNAL",
    emoji: "▲",
    bg: "bg-[var(--color-buy-bg)]",
    border: "border-[var(--color-buy-border)]",
    badge: "bg-[var(--color-buy-bg)] text-[var(--color-buy)] border-[var(--color-buy-border)]",
    text: "text-[var(--text-primary)]",
    mutedText: "text-[var(--text-secondary)]",
    accent: "bg-[var(--color-buy)]",
    bar: "bg-[var(--color-buy)]"
  },
  WATCHLIST: {
    label: "WATCHLIST",
    emoji: "◆",
    bg: "bg-[var(--color-watchlist-bg)]",
    border: "border-[var(--color-watchlist-border)]",
    badge: "bg-[var(--color-watchlist-bg)] text-[var(--color-watchlist)] border-[var(--color-watchlist-border)]",
    text: "text-[var(--text-primary)]",
    mutedText: "text-[var(--text-secondary)]",
    accent: "bg-[var(--color-watchlist)]",
    bar: "bg-[var(--color-watchlist)]"
  },
  AVOID: {
    label: "AVOID SIGNAL",
    emoji: "▼",
    bg: "bg-[var(--color-avoid-bg)]",
    border: "border-[var(--color-avoid-border)]",
    badge: "bg-[var(--color-avoid-bg)] text-[var(--color-avoid)] border-[var(--color-avoid-border)]",
    text: "text-[var(--text-primary)]",
    mutedText: "text-[var(--text-secondary)]",
    accent: "bg-[var(--color-avoid)]",
    bar: "bg-[var(--color-avoid)]"
  }
};

function getConfig(decision) {
  return DECISION_CONFIG[decision] || DECISION_CONFIG.AVOID;
}

function parsePercent(val) {
  if (typeof val === "number") return Math.min(100, Math.max(0, val));
  const match = String(val).match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function ScoreRing({ value, size = 48, strokeWidth = 4, colorClass }) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const num = parsePercent(value);
  const offset = circumference - (num / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-[var(--border-color)]"
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
        <span className="text-xs font-semibold text-[var(--text-primary)]">{num}</span>
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl border p-5 ${config.bg} ${config.border} relative overflow-hidden`}
    >
      {/* Accent indicator line */}
      <div className={`absolute inset-y-0 left-0 w-[3px] ${config.accent}`} />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pl-1">
        {/* Left — Badge + Reasoning */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 text-[10px] font-bold ${config.badge}`}>
              <span>{config.emoji}</span>
              <span>{config.label}</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">AI Recommendation</span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            {decision === "BUY" ? "High Conviction Investment Signal" : decision === "WATCHLIST" ? "Hold & Monitor Performance" : "High Risk Assessment Detected"}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] max-w-3xl">
            {reasoning}
          </p>
        </div>

        {/* Right — Metrics Block */}
        <div className="flex flex-wrap gap-4 shrink-0">
          {/* Confidence */}
          <div className="flex items-center gap-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] px-4 py-2.5 min-w-[140px]">
            <ScoreRing value={confidenceNum} size={42} strokeWidth={4} colorClass={config.text} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Confidence</p>
              <p className="text-base font-bold text-[var(--text-primary)]">{confidenceNum}%</p>
            </div>
          </div>

          {/* Overall Score */}
          <div className="flex items-center gap-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] px-4 py-2.5 min-w-[140px]">
            <ScoreRing value={scoreNum} size={42} strokeWidth={4} colorClass={config.text} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Overall Score</p>
              <p className="text-base font-bold text-[var(--text-primary)]">{scoreNum}/100</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default RecommendationBanner;
