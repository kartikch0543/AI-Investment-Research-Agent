import React from "react";
import GlassPanel from "../components/ui/GlassPanel";

function ScoreBreakdownChart({ scoreBreakdown }) {
  const data = [
    {
      name: "Financial Health",
      value: scoreBreakdown.financialHealth,
      color: "from-emerald-500 to-teal-400 text-emerald-500 dark:text-emerald-400 border-emerald-500/20",
      trackColor: "bg-emerald-500",
      shadowColor: "shadow-emerald-500/20",
      icon: "💰",
      status: scoreBreakdown.financialHealth >= 80 ? "Exceptional" : scoreBreakdown.financialHealth >= 65 ? "Stable" : "Leveraged",
      desc: "Balance sheet, cash flow, debt-to-equity ratio."
    },
    {
      name: "News Sentiment",
      value: scoreBreakdown.newsSentiment,
      color: "from-blue-500 to-indigo-400 text-blue-500 dark:text-blue-400 border-blue-500/20",
      trackColor: "bg-blue-500",
      shadowColor: "shadow-blue-500/20",
      icon: "📰",
      status: scoreBreakdown.newsSentiment >= 75 ? "Bullish" : scoreBreakdown.newsSentiment >= 55 ? "Neutral" : "Bearish",
      desc: "Media coverage tone, press releases, social sentiment."
    },
    {
      name: "Competitive Moat",
      value: scoreBreakdown.businessQuality,
      color: "from-purple-500 to-fuchsia-400 text-purple-500 dark:text-purple-400 border-purple-500/20",
      trackColor: "bg-purple-500",
      shadowColor: "shadow-purple-500/20",
      icon: "🏰",
      status: scoreBreakdown.businessQuality >= 80 ? "Wide Moat" : scoreBreakdown.businessQuality >= 60 ? "Narrow Moat" : "No Moat",
      desc: "Brand value, network effects, pricing leverage."
    },
    {
      name: "Risk Profile",
      value: scoreBreakdown.riskAdjusted,
      color: "from-amber-500 to-orange-400 text-amber-500 dark:text-amber-400 border-amber-500/20",
      trackColor: "bg-amber-500",
      shadowColor: "shadow-amber-500/20",
      icon: "⚠️",
      status: scoreBreakdown.riskAdjusted >= 75 ? "Low Risk" : scoreBreakdown.riskAdjusted >= 55 ? "Moderate" : "High Risk",
      desc: "Regulatory, valuation metrics, and sector volatility."
    }
  ];

  const average = Math.round(data.reduce((s, d) => s + d.value, 0) / data.length);

  const getAnalystOpinion = (avg) => {
    if (avg >= 75) return "Strong investment consensus. Fundamentals and market moat show premium strength.";
    if (avg >= 60) return "Reasonable thesis profile. Moderate risks are present, but fundamentals remain supportive.";
    return "Caution suggested. Elevated risk profiles or low news sentiment demand additional diligence.";
  };

  return (
    <GlassPanel className="relative overflow-hidden h-full flex flex-col justify-between p-5">
      <div>
        {/* Header section */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4 mb-5">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-accent)]">Metric Breakdown</p>
            <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">Agent Consensus Scores</h2>
          </div>
          <div className="text-right shrink-0 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-3 py-1.5 shadow-sm">
            <p className="text-[8px] text-[var(--text-muted)] uppercase tracking-wider font-extrabold">Overall Average</p>
            <p className="text-lg font-black text-[var(--color-accent)] tabular-nums">
              {average}<span className="text-xs text-[var(--text-muted)] font-bold">/100</span>
            </p>
          </div>
        </div>

        {/* Custom Hand-Crafted Metrics Grid */}
        <div className="space-y-4">
          {data.map((item, idx) => (
            <div 
              key={idx}
              className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/10 p-3.5 hover:border-[var(--border-color-strong)] transition-all duration-200"
            >
              {/* Row with Label, Icon and Score */}
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm shrink-0" role="img" aria-label={item.name}>
                    {item.icon}
                  </span>
                  <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                    {item.name}
                  </span>
                </div>
                
                {/* Score & Status Badge */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-white/5 ${item.color}`}>
                    {item.status}
                  </span>
                  <span className="text-xs font-black text-[var(--text-primary)] font-mono tabular-nums">
                    {item.value}<span className="text-[10px] text-[var(--text-muted)] font-normal">/100</span>
                  </span>
                </div>
              </div>

              {/* Hand-Crafted Glowing Progress Bar */}
              <div className="h-2 w-full rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)]/60 overflow-hidden relative">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${item.color} ${item.shadowColor} shadow-[0_0_8px_rgba(0,0,0,0.15)] transition-all duration-500`}
                  style={{ width: `${item.value}%` }}
                />
              </div>

              {/* Description */}
              <p className="mt-2 text-[10px] text-[var(--text-secondary)] leading-relaxed font-semibold">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Humanized Analyst Perspective */}
      <div className="mt-5 pt-3.5 border-t border-[var(--border-color)]/60 bg-[var(--bg-secondary)]/30 rounded-xl p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <p className="text-[9px] font-extrabold uppercase tracking-widest text-[var(--color-accent)]">Analyst Perspective</p>
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic font-medium">
          "{getAnalystOpinion(average)}"
        </p>
      </div>
    </GlassPanel>
  );
}

export default ScoreBreakdownChart;
