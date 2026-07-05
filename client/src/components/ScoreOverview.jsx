import GlassPanel from "./ui/GlassPanel";

function ScoreTile({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

function ScoreOverview({ result }) {
  return (
    <GlassPanel>
      <p className="text-sm uppercase tracking-[0.22em] text-signal dark:text-cyan-300">Score Overview</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Deterministic breakdown</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ScoreTile label="Financial Health" value={result.scoreBreakdown.financialHealth} />
        <ScoreTile label="News Sentiment" value={result.scoreBreakdown.newsSentiment} />
        <ScoreTile label="Business Quality" value={result.scoreBreakdown.businessQuality} />
        <ScoreTile label="Risk Adjusted" value={result.scoreBreakdown.riskAdjusted} />
      </div>
    </GlassPanel>
  );
}

export default ScoreOverview;
