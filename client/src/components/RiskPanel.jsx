function RiskPanel({ risks }) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-panel">
      <p className="text-sm uppercase tracking-[0.22em] text-signal">Risk</p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">Risk report</h2>
      <ul className="mt-6 space-y-3 text-sm text-slate-600">
        {risks.map((risk) => (
          <li key={risk} className="rounded-2xl bg-rose-50 px-4 py-3">
            {risk}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RiskPanel;
