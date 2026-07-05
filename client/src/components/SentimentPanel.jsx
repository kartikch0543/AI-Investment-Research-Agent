import GlassPanel from "./ui/GlassPanel";
import { motion } from "framer-motion";

function SentimentMeter({ score }) {
  const num = typeof score === "number" ? score : parseFloat(score) || 50;
  const pct = Math.min(100, Math.max(0, num));
  
  function getColor(v) {
    if (v >= 60) return "from-emerald-500 to-emerald-400";
    if (v >= 35) return "from-amber-500 to-amber-400";
    return "from-rose-500 to-rose-400";
  }

  function getLabel(v) {
    if (v >= 65) return { text: "Bullish", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20" };
    if (v >= 45) return { text: "Neutral", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20" };
    return { text: "Bearish", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20" };
  }

  const labelConfig = getLabel(pct);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Sentiment Score</p>
        <div className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${labelConfig.bg} ${labelConfig.color}`}>
          {labelConfig.text}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`h-full rounded-full bg-gradient-to-r ${getColor(pct)}`}
          />
        </div>
        <span className={`text-base font-bold tabular-nums shrink-0 ${labelConfig.color}`}>{num}</span>
      </div>
    </div>
  );
}

function SentimentPanel({ sentiment }) {
  return (
    <GlassPanel>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Sentiment Analysis</p>
      <h2 className="mt-1.5 text-xl font-semibold text-[var(--text-primary)]">Market Sentiment</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{sentiment.summary}</p>

      <div className="mt-5">
        <SentimentMeter score={sentiment.score} />
      </div>

      {(sentiment.positiveDrivers || []).length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 mb-3">
            <span className="text-emerald-500">●</span> Positive Drivers
          </p>
          <ul className="space-y-2">
            {(sentiment.positiveDrivers || []).map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-xl border border-emerald-200/60 bg-emerald-50/40 dark:border-emerald-500/15 dark:bg-emerald-500/5 px-3 py-2.5 text-xs text-[var(--text-primary)] leading-relaxed"
              >
                <svg className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </GlassPanel>
  );
}

export default SentimentPanel;
