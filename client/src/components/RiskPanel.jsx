import GlassPanel from "./ui/GlassPanel";

function RiskPanel({ risks }) {
  return (
    <GlassPanel>
      <p className="text-sm uppercase tracking-[0.22em] text-signal dark:text-cyan-300">Risk</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Risk report</h2>
      <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
        {risks.map((risk) => (
          <li key={risk} className="rounded-2xl bg-rose-50 px-4 py-3 dark:bg-rose-400/10">
            {risk}
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}

export default RiskPanel;
