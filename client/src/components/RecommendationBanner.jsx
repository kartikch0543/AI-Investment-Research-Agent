function getDecisionStyles(decision) {
  if (decision === "BUY") {
    return "border-emerald-200 bg-emerald-50/85 text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200";
  }

  if (decision === "WATCHLIST") {
    return "border-amber-200 bg-amber-50/85 text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200";
  }

  return "border-rose-200 bg-rose-50/85 text-rose-900 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200";
}

function RecommendationBanner({ decision, confidence, overallScore, reasoning }) {
  return (
    <section className={`rounded-[28px] border p-8 shadow-panel backdrop-blur-xl dark:shadow-glow ${getDecisionStyles(decision)}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em]">Final Recommendation</p>
          <h2 className="mt-3 text-3xl font-semibold">{decision}</h2>
          <p className="mt-3 text-base leading-7">{reasoning}</p>
        </div>

        <div className="grid min-w-[220px] grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/70 p-4 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.18em]">Confidence</p>
            <p className="mt-2 text-3xl font-semibold">{confidence}</p>
          </div>
          <div className="rounded-2xl bg-white/70 p-4 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.18em]">Overall Score</p>
            <p className="mt-2 text-3xl font-semibold">{overallScore}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecommendationBanner;
