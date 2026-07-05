import GlassPanel from "./ui/GlassPanel";

function SentimentPanel({ sentiment }) {
  return (
    <GlassPanel>
      <p className="text-sm uppercase tracking-[0.22em] text-signal dark:text-cyan-300">Sentiment</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">News sentiment analysis</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{sentiment.summary}</p>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Sentiment Score</p>
        <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{sentiment.score}</p>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Positive Drivers</p>
        <ul className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
          {(sentiment.positiveDrivers || []).map((item) => (
            <li key={item} className="rounded-2xl bg-emerald-50 px-4 py-3 dark:bg-emerald-400/10">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </GlassPanel>
  );
}

export default SentimentPanel;
