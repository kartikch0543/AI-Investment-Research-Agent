function ResearchCard({ title, subtitle, items = [], secondaryItems = [], summary }) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-panel">
      <p className="text-sm uppercase tracking-[0.22em] text-signal">{subtitle}</p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{summary}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-ink">Strengths</p>
          <ul className="mt-3 space-y-3 text-sm text-slate-600">
            {items.map((item) => (
              <li key={item} className="rounded-2xl bg-emerald-50 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Weaknesses</p>
          <ul className="mt-3 space-y-3 text-sm text-slate-600">
            {secondaryItems.map((item) => (
              <li key={item} className="rounded-2xl bg-amber-50 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ResearchCard;
