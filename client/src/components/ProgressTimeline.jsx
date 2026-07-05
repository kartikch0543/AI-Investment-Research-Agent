import GlassPanel from "./ui/GlassPanel";

function ProgressTimeline({ loading, hasResult, activeStage, stages }) {
  return (
    <GlassPanel className="h-full">
      <p className="text-sm uppercase tracking-[0.22em] text-signal dark:text-cyan-300">Research Progress</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">AI Research Progress</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
        Follow each stage of the research process as AlphaLens prepares an investment recommendation.
      </p>
      <div className="mt-6 flex flex-col gap-4">
        {stages.map((step, index) => {
          const isCompleted = hasResult || (loading && index < activeStage);
          const isActive = loading && index === activeStage;
          const statusLabel = isCompleted ? "Completed" : isActive ? "Running" : "Pending";

          return (
            <div key={step} className="flex items-center gap-4 rounded-2xl bg-slate-50/80 px-3 py-3 dark:bg-white/5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ring-1 ring-inset ${
                  isCompleted
                    ? "bg-signal text-white ring-transparent dark:bg-cyan-400 dark:text-slate-950"
                    : isActive
                      ? "bg-amber-100 text-amber-700 ring-amber-200 dark:bg-amber-400/15 dark:text-amber-300 dark:ring-amber-400/20"
                      : "bg-slate-100 text-slate-500 ring-slate-200 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10"
                }`}
              >
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{step}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {statusLabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}

export default ProgressTimeline;
