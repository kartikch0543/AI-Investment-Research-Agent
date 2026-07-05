import GlassPanel from "./ui/GlassPanel";

const focusAreas = [
  "Market intelligence and headline context",
  "Company fundamentals and financial quality",
  "Business risk assessment and sentiment balance"
];

function ResearchEmptyState() {
  return (
    <GlassPanel className="relative overflow-hidden">
      <div className="absolute -right-10 top-6 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/15" />
      <p className="text-sm uppercase tracking-[0.22em] text-signal dark:text-cyan-300">Workspace Overview</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
        Start a company analysis to unlock the full research workspace
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
        AlphaLens brings company research, market context, risk review, and recommendation logic into one guided
        experience. Search for a company to populate the dashboard with actionable insights.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {focusAreas.map((item) => (
          <div key={item} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
            {item}
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

export default ResearchEmptyState;
