import { Link } from "react-router-dom";
import { useSearchHistory } from "../context/SearchHistoryContext";
import { formatDateTime } from "../utils/formatters";
import GlassPanel from "../components/ui/GlassPanel";

const DECISION_STYLES = {
  BUY: {
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300 border-emerald-200 dark:border-emerald-400/20",
    dot: "bg-emerald-500",
    border: "border-l-emerald-500"
  },
  WATCHLIST: {
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300 border-amber-200 dark:border-amber-400/20",
    dot: "bg-amber-500",
    border: "border-l-amber-500"
  },
  AVOID: {
    badge: "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300 border-rose-200 dark:border-rose-400/20",
    dot: "bg-rose-500",
    border: "border-l-rose-500"
  }
};

function getDecisionStyle(decision) {
  return DECISION_STYLES[decision] || DECISION_STYLES.AVOID;
}

function HistoryPage() {
  const { historyItems } = useSearchHistory();

  const buyCount = historyItems.filter(i => i.decision === "BUY").length;
  const watchCount = historyItems.filter(i => i.decision === "WATCHLIST").length;
  const avoidCount = historyItems.filter(i => i.decision === "AVOID").length;

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Research Log</p>
        <h1 className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">Research History</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Review all company analyses from your AlphaLens workspace.
        </p>
      </div>

      {/* Summary Stats */}
      {historyItems.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Analyses", value: historyItems.length, color: "text-[var(--text-primary)]" },
            { label: "Buy Signals", value: buyCount, color: "text-emerald-600 dark:text-emerald-400" },
            { label: "Watchlist", value: watchCount, color: "text-amber-600 dark:text-amber-400" },
            { label: "Avoid", value: avoidCount, color: "text-rose-600 dark:text-rose-400" }
          ].map(stat => (
            <div key={stat.label} className="premium-panel rounded-xl p-4 border border-[var(--border-color)]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{stat.label}</p>
              <p className={`mt-2 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* History List */}
      <GlassPanel>
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {historyItems.length} {historyItems.length === 1 ? "Analysis" : "Analyses"}
          </p>
          {historyItems.length > 0 && (
            <Link
              to="/app/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] hover:underline"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Research
            </Link>
          )}
        </div>

        {historyItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-14 w-14 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center mb-4">
              <svg className="h-7 w-7 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">No research history yet</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-sm">
              Run your first company analysis from the dashboard to see results here.
            </p>
            <Link
              to="/app/dashboard"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] px-5 py-2.5 text-sm font-semibold text-white dark:text-[var(--text-inverse)] transition-all hover:-translate-y-0.5"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Start Research
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {historyItems.map((item, index) => {
              const style = getDecisionStyle(item.decision);
              return (
                <div
                  key={`${item.companyName}-${item.createdAt}-${index}`}
                  className={`rounded-xl border border-l-4 border-[var(--border-color)] ${style.border} bg-[var(--bg-secondary)] hover:border-[var(--color-accent)] transition-all duration-150 p-4`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`h-2 w-2 rounded-full shrink-0 ${style.dot}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{item.companyName}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{formatDateTime(item.createdAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Score</p>
                        <p className="text-sm font-bold text-[var(--text-primary)] tabular-nums">{item.overallScore}</p>
                      </div>
                      {item.confidence && (
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Confidence</p>
                          <p className="text-sm font-bold text-[var(--text-primary)] tabular-nums">{item.confidence}</p>
                        </div>
                      )}
                      <span className={`inline-flex rounded-lg border px-2.5 py-1 text-[10px] font-bold ${style.badge}`}>
                        {item.decision}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </GlassPanel>
    </div>
  );
}

export default HistoryPage;
