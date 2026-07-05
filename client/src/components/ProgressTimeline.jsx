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
    <section className="rounded-3xl bg-white p-8 shadow-panel">
      <p className="text-sm uppercase tracking-[0.22em] text-signal">Pipeline</p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">LangGraph workflow</h2>
      <div className="mt-6 flex flex-col gap-4">
        {baseSteps.map((step, index) => {
          const isCompleted = hasResult;
          const isActive = loading && index === 0;

          return (
            <div key={step} className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  isCompleted
                    ? "bg-signal text-white"
                    : isActive
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-500"
                }`}
              >
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-ink">{step}</p>
                <p className="text-sm text-slate-500">
                  {isCompleted ? "Completed" : isActive ? "In progress" : "Waiting"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProgressTimeline;
