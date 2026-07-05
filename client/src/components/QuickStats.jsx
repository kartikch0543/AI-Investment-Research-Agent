function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-[24px] border border-slate-200/70 bg-white/70 p-5 shadow-panel backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/65 dark:shadow-glow">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{hint}</p>
    </div>
  );
}

function QuickStats({ result, historyCount, loading }) {
  const stats = [
    {
      label: "Workspace Status",
      value: loading ? "Running" : result ? "Ready" : "Idle",
      hint: loading ? "An AI research run is currently in progress." : "Your research workspace is available."
    },
    {
      label: "Latest Recommendation",
      value: result?.decision || "No result",
      hint: result ? `Confidence ${result.confidence}` : "Run a company analysis to generate a recommendation."
    },
    {
      label: "Saved Research",
      value: historyCount,
      hint: historyCount === 1 ? "1 company analysis stored locally." : `${historyCount} company analyses stored locally.`
    }
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} hint={stat.hint} />
      ))}
    </section>
  );
}

export default QuickStats;
