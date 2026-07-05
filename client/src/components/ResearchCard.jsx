import GlassPanel from "./ui/GlassPanel";

function ResearchCard({ title, subtitle, items = [], secondaryItems = [], summary }) {
  return (
    <GlassPanel>
      <p className="text-sm uppercase tracking-[0.22em] text-signal dark:text-cyan-300">{subtitle}</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{summary}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Strengths</p>
          <ul className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {items.map((item) => (
              <li key={item} className="rounded-2xl bg-emerald-50 px-4 py-3 dark:bg-emerald-400/10">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Weaknesses</p>
          <ul className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {secondaryItems.map((item) => (
              <li key={item} className="rounded-2xl bg-amber-50 px-4 py-3 dark:bg-amber-400/10">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GlassPanel>
  );
}

export default ResearchCard;
