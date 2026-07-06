import GlassPanel from "./ui/GlassPanel";

const RISK_ICONS = {
  high: (
    <svg className="h-3.5 w-3.5 text-[var(--color-avoid)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  medium: (
    <svg className="h-3.5 w-3.5 text-[var(--color-watchlist)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  low: (
    <svg className="h-3.5 w-3.5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
  if (severity === "high") return "border-[var(--color-avoid-border)] bg-[var(--color-avoid-bg)]";
  if (severity === "medium") return "border-[var(--color-watchlist-border)] bg-[var(--color-watchlist-bg)]";
  return "border-[var(--border-color)] bg-[var(--bg-secondary)]/30";
}

function RiskPanel({ risks }) {
  const highCount = (risks || []).filter(r => getRiskSeverity(r) === "high").length;
  const medCount = (risks || []).filter(r => getRiskSeverity(r) === "medium").length;

  return (
    <GlassPanel>
      <div className="border-b border-[var(--border-color)] pb-3 mb-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Risk Assessment</p>
        <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">Risk Report</h2>
      </div>

      {/* Summary badges */}
      <div className="flex flex-wrap gap-2">
        {highCount > 0 && (
          <span className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-avoid-border)] bg-[var(--color-avoid-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--color-avoid)]">
            ▲ {highCount} High
          </span>
        )}
        {medCount > 0 && (
          <span className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-watchlist-border)] bg-[var(--color-watchlist-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--color-watchlist)]">
            ◆ {medCount} Medium
          </span>
        )}
        {risks?.length - highCount - medCount > 0 && (
          <span className="inline-flex items-center gap-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">
            ● {risks.length - highCount - medCount} Low
          </span>
        )}
      </div>

      <ul className="mt-4 space-y-1.5">
        {(risks || []).map((risk, i) => {
          const severity = getRiskSeverity(risk);
          return (
            <li
              key={i}
              className={`flex items-start gap-2.5 rounded-xl border px-3 py-2 text-xs text-[var(--text-secondary)] leading-relaxed ${getRiskStyle(severity)}`}
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
