import { motion } from "framer-motion";
import GlassPanel from "./ui/GlassPanel";

function ProgressTimeline({ loading, hasResult, activeStage, stages }) {
  const completedCount = hasResult ? stages.length : (loading ? activeStage : 0);
  const progressPct = stages.length > 0 ? (completedCount / stages.length) * 100 : 0;

  return (
    <GlassPanel className="h-full">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">Research Pipeline</p>
          <h2 className="mt-1.5 text-2xl font-bold text-[var(--text-primary)]">AI Progress</h2>
        </div>
        {loading && (
          <div className="flex items-center gap-1.5 rounded-full border border-amber-200 dark:border-amber-500/25 bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Running</span>
          </div>
        )}
        {hasResult && !loading && (
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 shrink-0">
            <svg className="h-3 w-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Complete</span>
          </div>
        )}
      </div>

      {/* Overall progress bar */}
      {(loading || hasResult) && (
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-[var(--text-muted)]">{completedCount}/{stages.length} steps</span>
            <span className="text-xs font-bold text-[var(--color-accent)]">{Math.round(progressPct)}%</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-emerald-400"
            />
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="flex flex-col gap-2">
        {stages.map((step, index) => {
          const isCompleted = hasResult || (loading && index < activeStage);
          const isActive = loading && index === activeStage;

          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 border transition-all duration-300 ${
                isActive
                  ? "bg-amber-50/60 dark:bg-amber-500/8 border-amber-200 dark:border-amber-500/20"
                  : isCompleted
                  ? "bg-[var(--color-accent-light)] border-[var(--color-accent-medium)]"
                  : "border-[var(--border-color)] bg-[var(--bg-secondary)]"
              }`}
            >
              {/* Left — Icon + Step name */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0 w-5 flex items-center justify-center">
                  {isCompleted ? (
                    <span className="text-emerald-500 font-bold text-base">✓</span>
                  ) : isActive ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                    </span>
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-[var(--text-muted)] shrink-0 opacity-50" />
                  )}
                </div>

                <p className={`text-sm font-semibold truncate ${
                  isActive
                    ? "text-amber-700 dark:text-amber-300"
                    : isCompleted
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)]"
                }`}>
                  {step}
                </p>
              </div>

              {/* Right — Status badge */}
              <div className="flex items-center gap-2 shrink-0">
                {isActive && (
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 animate-pulse">
                    Running...
                  </span>
                )}
                {!isCompleted && !isActive && (
                  <span className="text-xs font-medium text-[var(--text-muted)]">
                    Pending
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassPanel>
  );
}

export default ProgressTimeline;
