import { motion } from "framer-motion";
import GlassPanel from "./ui/GlassPanel";

function ScoreBar({ label, value, delay = 0 }) {
  const numVal = typeof value === "number" ? value : parseInt(value) || 0;
  const pct = Math.min(100, Math.max(0, numVal));

  function getBarColor(v) {
    if (v >= 70) return "bg-[var(--color-buy)]";
    if (v >= 40) return "bg-[var(--color-watchlist)]";
    return "bg-[var(--color-avoid)]";
  }

  function getTextColor(v) {
    if (v >= 70) return "text-[var(--color-buy)]";
    if (v >= 40) return "text-[var(--color-watchlist)]";
    return "text-[var(--color-avoid)]";
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--text-secondary)]">{label}</span>
        <span className={`text-xs font-bold tabular-nums ${getTextColor(pct)}`}>{numVal}</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full ${getBarColor(pct)}`}
        />
      </div>
    </div>
  );
}

function ScoreOverview({ result }) {
  const breakdown = result.scoreBreakdown;
  const overall = typeof result.overallScore === "number"
    ? result.overallScore
    : parseInt(result.overallScore) || 0;

  return (
    <GlassPanel>
      <div className="flex items-center justify-between gap-4 mb-6 border-b border-[var(--border-color)] pb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Score Overview</p>
          <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">AI Score Breakdown</h2>
        </div>
        {/* Overall donut */}
        <div className="text-center shrink-0">
          <div className="relative h-12 w-12">
            <svg className="h-12 w-12 rotate-[-90deg]" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" strokeWidth="6" className="stroke-[var(--border-color)]" fill="none" />
              <circle
                cx="32" cy="32" r="26" strokeWidth="6"
                stroke="var(--color-accent)" fill="none"
                strokeLinecap="round"
                strokeDasharray={163.4}
                strokeDashoffset={163.4 - (overall / 100) * 163.4}
                className="score-ring"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-[var(--text-primary)]">{overall}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <ScoreBar label="Financial Health" value={breakdown.financialHealth} delay={0.1} />
        <ScoreBar label="News Sentiment" value={breakdown.newsSentiment} delay={0.15} />
        <ScoreBar label="Business Quality" value={breakdown.businessQuality} delay={0.2} />
        <ScoreBar label="Risk Adjusted" value={breakdown.riskAdjusted} delay={0.25} />
      </div>
    </GlassPanel>
  );
}

export default ScoreOverview;
