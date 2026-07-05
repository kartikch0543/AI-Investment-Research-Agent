import GlassPanel from "./ui/GlassPanel";
import { useSearchHistory } from "../context/SearchHistoryContext";
import { formatDateTime } from "../utils/formatters";

function SearchHistoryPanel({ compact = false }) {
  const { historyItems } = useSearchHistory();
  const visibleItems = compact ? historyItems.slice(0, 4) : historyItems;

  return (
    <GlassPanel>
      <p className="text-sm uppercase tracking-[0.22em] text-signal dark:text-cyan-300">History</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Recent searches</h2>

      {visibleItems.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          No searches yet. Run a company analysis to populate history.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {visibleItems.map((item, index) => (
            <div
              key={`${item.companyName}-${item.createdAt}-${index}`}
              className="rounded-2xl bg-slate-50 p-4 dark:bg-white/5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{item.companyName}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{formatDateTime(item.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-signal dark:text-cyan-300">{item.decision}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Score {item.overallScore}</p>
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
