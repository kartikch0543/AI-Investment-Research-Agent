import GlassPanel from "./ui/GlassPanel";

const RISK_ICONS = {
  high: (
    <svg className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  medium: (
    <svg className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  low: (
    <svg className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

function getRiskSeverity(text) {
  const lower = text.toLowerCase();
  if (lower.includes("high") || lower.includes("major") || lower.includes("critical") || lower.includes("severe")) return "high";
  if (lower.includes("moderate") || lower.includes("medium") || lower.includes("potential")) return "medium";
  return "low";
}

function getRiskStyle(severity) {
  if (severity === "high") return "border-rose-200/60 bg-rose-50/40 dark:border-rose-500/15 dark:bg-rose-500/5";
  if (severity === "medium") return "border-amber-200/60 bg-amber-50/40 dark:border-amber-500/15 dark:bg-amber-500/5";
  return "border-blue-200/60 bg-blue-50/40 dark:border-blue-500/15 dark:bg-blue-500/5";
}

function RiskPanel({ risks }) {
  const highCount = (risks || []).filter(r => getRiskSeverity(r) === "high").length;
  const medCount = (risks || []).filter(r => getRiskSeverity(r) === "medium").length;

  return (
    <GlassPanel>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Risk Assessment</p>
      <h2 className="mt-1.5 text-xl font-semibold text-[var(--text-primary)]">Risk Report</h2>

      {/* Summary badges */}
      <div className="mt-3 flex flex-wrap gap-2">
        {highCount > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full border border-rose-200/60 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/10 px-2.5 py-1 text-[10px] font-bold text-rose-600 dark:text-rose-400">
            ⚠ {highCount} High
          </span>
        )}
        {medCount > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/60 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
            ● {medCount} Medium
          </span>
        )}
        {risks?.length - highCount - medCount > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2.5 py-1 text-[10px] font-bold text-[var(--text-muted)]">
            ● {risks.length - highCount - medCount} Low
          </span>
        )}
      </div>

      <ul className="mt-4 space-y-2">
        {(risks || []).map((risk, i) => {
          const severity = getRiskSeverity(risk);
          return (
            <li
              key={i}
              className={`flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-xs text-[var(--text-primary)] leading-relaxed ${getRiskStyle(severity)}`}
            >
              {RISK_ICONS[severity]}
              <span>{risk}</span>
            </li>
          );
        })}
      </ul>
    </GlassPanel>
  );
}

export default RiskPanel;
