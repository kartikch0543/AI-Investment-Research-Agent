import GlassPanel from "./ui/GlassPanel";
import { motion } from "framer-motion";

function SentimentMeter({ score }) {
  const num = typeof score === "number" ? score : parseFloat(score) || 50;
  const pct = Math.min(100, Math.max(0, num));
  
  function getBarColor(v) {
    if (v >= 60) return "bg-[var(--color-buy)]";
    if (v >= 35) return "bg-[var(--color-watchlist)]";
    return "bg-[var(--color-avoid)]";
  }

  function getLabel(v) {
    if (v >= 65) {
      return { 
        text: "Bullish", 
        color: "text-[var(--color-buy)]", 
        badge: "bg-[var(--color-buy-bg)] text-[var(--color-buy)] border-[var(--color-buy-border)]" 
      };
    }
    if (v >= 45) {
      return { 
        text: "Neutral", 
        color: "text-[var(--color-watchlist)]", 
        badge: "bg-[var(--color-watchlist-bg)] text-[var(--color-watchlist)] border-[var(--color-watchlist-border)]" 
      };
    }
    return { 
      text: "Bearish", 
      color: "text-[var(--color-avoid)]", 
      badge: "bg-[var(--color-avoid-bg)] text-[var(--color-avoid)] border-[var(--color-avoid-border)]" 
    };
  }

  const labelConfig = getLabel(pct);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Sentiment Score</p>
        <div className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold ${labelConfig.badge}`}>
          {labelConfig.text}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`h-full rounded-full ${getBarColor(pct)}`}
          />
        </div>
        <span className={`text-sm font-bold tabular-nums shrink-0 ${labelConfig.color}`}>{num}</span>
      </div>
    </div>
  );
}

function SentimentPanel({ sentiment }) {
  return (
    <GlassPanel>
      <div className="border-b border-[var(--border-color)] pb-3 mb-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Sentiment Analysis</p>
        <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">Market Sentiment</h2>
      </div>
      
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{sentiment.summary}</p>

      <div className="mt-4">
        <SentimentMeter score={sentiment.score} />
      </div>

      {(sentiment.positiveDrivers || []).length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 mb-2.5">
            <span className="text-[var(--color-buy)] text-xs">▲</span> Positive Drivers
          </p>
          <ul className="space-y-1.5">
            {(sentiment.positiveDrivers || []).map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/30 px-3 py-2 text-xs text-[var(--text-secondary)] leading-relaxed"
              >
                <svg className="h-3.5 w-3.5 text-[var(--color-buy)] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
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
