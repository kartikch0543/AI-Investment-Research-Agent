function getDecisionStyles(decision) {
  if (decision === "BUY") {
    return "bg-emerald-50 text-emerald-800 border-emerald-200";
  }

  if (decision === "WATCHLIST") {
    return "bg-amber-50 text-amber-800 border-amber-200";
  }

  return "bg-rose-50 text-rose-800 border-rose-200";
}

function RecommendationBanner({ decision, confidence, overallScore, reasoning }) {
  return (
    <section className={`rounded-3xl border p-8 shadow-panel ${getDecisionStyles(decision)}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em]">Final Recommendation</p>
          <h2 className="mt-3 text-3xl font-semibold">{decision}</h2>
          <p className="mt-3 text-base leading-7">{reasoning}</p>
        </div>

        <div className="grid min-w-[220px] grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-xs uppercase tracking-[0.18em]">Confidence</p>
            <p className="mt-2 text-3xl font-semibold">{confidence}</p>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-xs uppercase tracking-[0.18em]">Overall Score</p>
            <p className="mt-2 text-3xl font-semibold">{overallScore}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecommendationBanner;
