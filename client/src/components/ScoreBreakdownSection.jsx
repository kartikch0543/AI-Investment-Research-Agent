import ScoreBreakdownChart from "../charts/ScoreBreakdownChart";
import GlassPanel from "./ui/GlassPanel";

function ScoreBreakdownSection({ scoreBreakdown }) {
  const { financialHealth, newsSentiment, businessQuality, riskAdjusted, overallScore } = scoreBreakdown;

  // Calculate points contributions (weights from constants: 0.4, 0.2, 0.2, 0.2)
  const mathItems = [
    {
      name: "Financial Health",
      score: financialHealth,
      weight: 40,
      contribution: (financialHealth * 0.4).toFixed(1),
      desc: "Revenue growth, profitability margins, leverage, and balance sheet strength.",
      colorClass: "text-emerald-500",
      bgClass: "bg-emerald-500/10"
    },
    {
      name: "News Sentiment",
      score: newsSentiment,
      weight: 20,
      contribution: (newsSentiment * 0.2).toFixed(1),
      desc: "Recent news sentiment analysis, tone metrics, and key market discussions.",
      colorClass: "text-blue-500",
      bgClass: "bg-blue-500/10"
    },
    {
      name: "Competitive Moat",
      score: businessQuality,
      weight: 20,
      contribution: (businessQuality * 0.2).toFixed(1),
      desc: "Brand value, network effects, scale cost advantage, and proprietary technology.",
      colorClass: "text-purple-500",
      bgClass: "bg-purple-500/10"
    },
    {
      name: "Risk Profile",
      score: riskAdjusted,
      weight: 20,
      contribution: (riskAdjusted * 0.2).toFixed(1),
      desc: "Sector volatility, high valuation premiums, regulatory constraints, and debt.",
      colorClass: "text-amber-500",
      bgClass: "bg-amber-500/10"
    }
  ];

  return (
    <section className="grid gap-6 lg:grid-cols-12 items-stretch animate-fade-in-up">
      {/* Chart Panel */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <ScoreBreakdownChart scoreBreakdown={scoreBreakdown} />
      </div>

      {/* Math Explanation Panel */}
      <GlassPanel className="lg:col-span-7 flex flex-col justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Decision System</p>
          <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">Explainable AI Scoring Criteria</h2>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            How the TradeIntel multi-agent pipeline calculated the overall rating of <strong className="text-[var(--text-primary)]">{overallScore}/100</strong> based on weighted criteria:
          </p>

          <div className="mt-5 space-y-3.5">
            {mathItems.map((item) => (
              <div key={item.name} className="flex gap-4 p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <div className={`h-8 w-8 shrink-0 flex items-center justify-center rounded-lg font-bold text-xs ${item.bgClass} ${item.colorClass}`}>
                  {item.score}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-semibold text-[var(--text-primary)]">{item.name}</h3>
                    <span className="text-xs font-bold text-[var(--text-primary)] shrink-0 font-mono">
                      {item.score} × {item.weight}% = +{item.contribution}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sum Formula Math Block */}
        <div className="mt-5 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs">
          <span className="font-semibold text-[var(--text-secondary)]">Verification Math:</span>
          <span className="font-mono font-bold text-[var(--color-accent)] tabular-nums">
            {mathItems.map((item) => item.contribution).join(" + ")} = {overallScore} / 100
          </span>
        </div>
      </GlassPanel>
    </section>
  );
}

export default ScoreBreakdownSection;
