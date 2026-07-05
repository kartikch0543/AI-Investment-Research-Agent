import GlassPanel from "./ui/GlassPanel";

function CompanySnapshot({ result }) {
  return (
    <GlassPanel>
      <p className="text-sm uppercase tracking-[0.22em] text-signal dark:text-cyan-300">Company Snapshot</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{result.companyName}</h2>
      <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Primary reasoning</p>
          <p className="mt-2 leading-7">{result.reasoning}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Strengths</p>
          <ul className="mt-2 space-y-2">
            {result.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
      </div>
    </GlassPanel>
  );
}

export default CompanySnapshot;
