import GlassPanel from "./ui/GlassPanel";

const baseSteps = [
  "Gather information",
  "Fundamental analysis",
  "News sentiment analysis",
  "Risk analysis",
  "Moat analysis",
  "Investment committee"
];

function ProgressTimeline({ loading, hasResult }) {
  return (
    <GlassPanel>
      <p className="text-sm uppercase tracking-[0.22em] text-signal dark:text-cyan-300">Pipeline</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">LangGraph workflow</h2>
      <div className="mt-6 flex flex-col gap-4">
        {baseSteps.map((step, index) => {
          const isCompleted = hasResult;
          const isActive = loading && index === 0;

          return (
            <div key={step} className="flex items-center gap-4">
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
                  {isCompleted ? "Completed" : isActive ? "In progress" : "Waiting"}
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
