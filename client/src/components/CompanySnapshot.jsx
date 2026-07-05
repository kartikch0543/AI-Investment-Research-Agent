function CompanySnapshot({ result }) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-panel">
      <p className="text-sm uppercase tracking-[0.22em] text-signal">Company Snapshot</p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">{result.companyName}</h2>
      <div className="mt-6 space-y-4 text-sm text-slate-600">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Primary reasoning</p>
          <p className="mt-2 leading-7">{result.reasoning}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Strengths</p>
          <ul className="mt-2 space-y-2">
            {result.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default CompanySnapshot;
