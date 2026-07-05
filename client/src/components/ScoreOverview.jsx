import { motion } from "framer-motion";
import GlassPanel from "./ui/GlassPanel";

function ScoreBar({ label, value, delay = 0 }) {
  const numVal = typeof value === "number" ? value : parseInt(value) || 0;
  const pct = Math.min(100, Math.max(0, numVal));

  function getBarColor(v) {
    if (v >= 70) return "from-emerald-500 to-emerald-400";
    if (v >= 40) return "from-amber-500 to-amber-400";
    return "from-rose-500 to-rose-400";
  }

  function getTextColor(v) {
    if (v >= 70) return "text-emerald-600 dark:text-emerald-400";
    if (v >= 40) return "text-amber-600 dark:text-amber-400";
    return "text-rose-600 dark:text-rose-400";
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--text-secondary)]">{label}</span>
        <span className={`text-sm font-bold tabular-nums ${getTextColor(pct)}`}>{numVal}</span>
      </div>
      <div className="h-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${getBarColor(pct)}`}
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
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Score Overview</p>
          <h2 className="mt-1.5 text-xl font-semibold text-[var(--text-primary)]">AI Score Breakdown</h2>
        </div>
        {/* Overall donut */}
        <div className="text-center shrink-0">
          <div className="relative h-16 w-16">
            <svg className="h-16 w-16 rotate-[-90deg]" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" strokeWidth="7" className="stroke-[var(--border-color-strong)]" fill="none" />
              <circle
                cx="32" cy="32" r="26" strokeWidth="7"
                stroke="var(--color-accent)" fill="none"
                strokeLinecap="round"
                strokeDasharray={163.4}
                strokeDashoffset={163.4 - (overall / 100) * 163.4}
                className="score-ring"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-[var(--text-primary)]">{overall}</span>
            </div>
          </div>
          <p className="text-[9px] text-[var(--text-muted)] mt-1 uppercase tracking-wider">Overall</p>
        </div>
      </div>

      <div className="space-y-4">
        <ScoreBar label="Financial Health" value={breakdown.financialHealth} delay={0.1} />
        <ScoreBar label="News Sentiment" value={breakdown.newsSentiment} delay={0.2} />
        <ScoreBar label="Business Quality" value={breakdown.businessQuality} delay={0.3} />
        <ScoreBar label="Risk Adjusted" value={breakdown.riskAdjusted} delay={0.4} />
      </div>
    </GlassPanel>
  );
}

export default ScoreOverview;
