import GlassPanel from "./ui/GlassPanel";
import { useSearchHistory } from "../context/SearchHistoryContext";
import { formatDateTime } from "../utils/formatters";

const DECISION_STYLES = {
  BUY: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300 border-emerald-200 dark:border-emerald-400/20",
  WATCHLIST: "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300 border-amber-200 dark:border-amber-400/20",
  AVOID: "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300 border-rose-200 dark:border-rose-400/20"
};

function getDecisionStyle(decision) {
  return DECISION_STYLES[decision] || DECISION_STYLES.AVOID;
}

function SearchHistoryPanel({ compact = false }) {
  const { historyItems } = useSearchHistory();
  const visibleItems = compact ? historyItems.slice(0, 5) : historyItems;

  return (
    <GlassPanel>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Research History</p>
      <h2 className="mt-1.5 text-xl font-semibold text-[var(--text-primary)]">Recent Analyses</h2>

      {visibleItems.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center text-center py-6">
          <div className="h-10 w-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center mb-3">
            <svg className="h-5 w-5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-[var(--text-secondary)]">No analyses yet</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Run a company analysis to populate history.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {visibleItems.map((item, index) => (
            <div
              key={`${item.companyName}-${item.createdAt}-${index}`}
              className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] px-4 py-3 hover:border-[var(--color-accent)] transition-all duration-150"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{item.companyName}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{formatDateTime(item.createdAt)}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`inline-flex rounded-lg border px-2 py-0.5 text-[10px] font-bold leading-5 ${getDecisionStyle(item.decision)}`}>
                    {item.decision}
                  </span>
                  <p className="text-[10px] text-[var(--text-muted)]">Score: {item.overallScore}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassPanel>
  );
}

export default SearchHistoryPanel;
