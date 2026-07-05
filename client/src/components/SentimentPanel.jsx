function SentimentPanel({ sentiment }) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-panel">
      <p className="text-sm uppercase tracking-[0.22em] text-signal">Sentiment</p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">News sentiment analysis</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{sentiment.summary}</p>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Sentiment Score</p>
        <p className="mt-2 text-3xl font-semibold text-ink">{sentiment.score}</p>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-ink">Positive Drivers</p>
        <ul className="mt-3 space-y-3 text-sm text-slate-600">
          {(sentiment.positiveDrivers || []).map((item) => (
            <li key={item} className="rounded-2xl bg-emerald-50 px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SentimentPanel;
