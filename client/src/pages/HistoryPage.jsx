import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchHistory } from "../context/SearchHistoryContext";
import { formatDateTime } from "../utils/formatters";
import GlassPanel from "../components/ui/GlassPanel";

const DECISION_STYLES = {
  BUY: {
    label: "INVEST",
    badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    dot: "bg-emerald-500",
    border: "border-l-emerald-500"
  },
  INVEST: {
    label: "INVEST",
    badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    dot: "bg-emerald-500",
    border: "border-l-emerald-500"
  },
  WATCHLIST: {
    label: "WATCHLIST",
    badge: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    dot: "bg-amber-500",
    border: "border-l-amber-500"
  },
  PASS: {
    label: "PASS",
    badge: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    dot: "bg-rose-500",
    border: "border-l-rose-500"
  },
  AVOID: {
    label: "PASS",
    badge: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    dot: "bg-rose-500",
    border: "border-l-rose-500"
  }
};

function getDecisionStyle(decision) {
  const norm = (decision || "PASS").toUpperCase();
  return DECISION_STYLES[norm] || DECISION_STYLES.PASS;
}

function HistoryPage() {
  const { historyItems, deleteHistoryItem } = useSearchHistory();
  const navigate = useNavigate();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDecision, setFilterDecision] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");

  // Summary counts
  const totalCount = historyItems.length;
  const buyCount = historyItems.filter(i => (i.decision || "").toUpperCase() === "BUY" || (i.decision || "").toUpperCase() === "INVEST").length;
  const watchCount = historyItems.filter(i => (i.decision || "").toUpperCase() === "WATCHLIST").length;
  const passCount = historyItems.filter(i => (i.decision || "").toUpperCase() === "PASS" || (i.decision || "").toUpperCase() === "AVOID").length;

  // Handler to open full report in dashboard
  const handleReopen = (item) => {
    if (item.jsonReport) {
      sessionStorage.setItem("active-research-result", JSON.stringify(item.jsonReport));
      window.dispatchEvent(new CustomEvent("active-research-changed", { detail: item.jsonReport }));
      navigate("/app/dashboard");
    } else {
      // If full report is missing, run fresh research
      navigate("/app/dashboard?search=" + encodeURIComponent(item.companyName));
    }
  };

  // Filter and sort items
  const processedItems = historyItems
    .filter(item => {
      const matchSearch = item.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      if (filterDecision === "ALL") return matchSearch;
      
      const normDecision = (item.decision || "").toUpperCase();
      if (filterDecision === "INVEST") return matchSearch && (normDecision === "BUY" || normDecision === "INVEST");
      if (filterDecision === "WATCHLIST") return matchSearch && normDecision === "WATCHLIST";
      if (filterDecision === "PASS") return matchSearch && (normDecision === "PASS" || normDecision === "AVOID");
      return matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "NEWEST") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "OLDEST") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "SCORE_DESC") return (b.overallScore || 0) - (a.overallScore || 0);
      if (sortBy === "SCORE_ASC") return (a.overallScore || 0) - (b.overallScore || 0);
      return 0;
    });

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[var(--border-color)]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Workspace Archives</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">Research History</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Review, reopen, or manage saved company analyses.
          </p>
        </div>
        <Link
          to="/app/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] px-4 py-2.5 text-sm font-semibold text-white text-white transition-all self-start sm:self-auto shadow-sm"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Analysis
        </Link>
      </div>

      {/* Summary Row */}
      {totalCount > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Saved", value: totalCount, color: "text-[var(--text-primary)]" },
            { label: "Invest Ratings", value: buyCount, color: "text-[var(--color-buy)]" },
            { label: "Watchlist Ratings", value: watchCount, color: "text-[var(--color-watchlist)]" },
            { label: "Pass Ratings", value: passCount, color: "text-[var(--color-avoid)]" }
          ].map(stat => (
            <div key={stat.label} className="premium-panel rounded-xl p-4 border border-[var(--border-color)] bg-[var(--bg-surface)]">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{stat.label}</p>
              <p className={"mt-2 text-2xl font-black tracking-tight " + stat.color}>{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Search & Filters Controls */}
      {totalCount > 0 && (
        <div className="grid gap-3 sm:grid-cols-12 items-center">
          <div className="relative sm:col-span-6">
            <input
              type="text"
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] pl-10 pr-4 text-xs text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--color-accent)] transition-all"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="sm:col-span-3">
            <select
              value={filterDecision}
              onChange={e => setFilterDecision(e.target.value)}
              className="h-10 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] transition-all"
            >
              <option value="ALL">All Recommendations</option>
              <option value="INVEST">Invest Only</option>
              <option value="WATCHLIST">Watchlist Only</option>
              <option value="PASS">Pass Only</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="h-10 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] transition-all"
            >
              <option value="NEWEST">Date: Newest First</option>
              <option value="OLDEST">Date: Oldest First</option>
              <option value="SCORE_DESC">Score: High to Low</option>
              <option value="SCORE_ASC">Score: Low to High</option>
            </select>
          </div>
        </div>
      )}

      {/* Main List */}
      <GlassPanel>
        {processedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-14 w-14 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center mb-4">
              <svg className="h-7 w-7 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">No matching research runs</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
              {totalCount === 0 
                ? "Generate your first company report from the dashboard to log research history." 
                : "No saved items match your active search terms or recommendation filters."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {processedItems.map((item, index) => {
              const style = getDecisionStyle(item.decision);
              const summaryText = item.jsonReport?.reasoning || "No thesis statement saved for this analysis.";
              const displaySummary = summaryText.replace(/^[-•*]s+/gm, "").slice(0, 160) + (summaryText.length > 160 ? "..." : "");
              const cardKey = item.companyName + "-" + item.createdAt + "-" + index;

              return (
                <div
                  key={cardKey}
                  className={"group rounded-xl border border-l-4 border-[var(--border-color)] " + style.border + " bg-[var(--bg-surface)] hover:border-[var(--border-color-strong)] transition-all duration-150 p-5 shadow-sm hover:shadow-md"}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={"inline-flex rounded-lg border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase " + style.badge}>
                          ● {style.label}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] font-medium">
                          {formatDateTime(item.createdAt)}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
                        {item.companyName}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)] font-medium">
                        {displaySummary}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 shrink-0 border-t sm:border-t-0 border-[var(--border-color)]/60 pt-3 sm:pt-0">
                      <div className="flex gap-4">
                        <div className="text-center sm:text-right">
                          <p className="text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-wider">AI Score</p>
                          <p className="text-base font-black text-[var(--text-primary)] font-mono mt-0.5">{item.overallScore || "—"}</p>
                        </div>
                        {item.confidence && (
                          <div className="text-center sm:text-right">
                            <p className="text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Confidence</p>
                            <p className="text-base font-black text-[var(--text-primary)] font-mono mt-0.5">{item.confidence}%</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleReopen(item)}
                          className="inline-flex h-8 items-center justify-center rounded-lg bg-[var(--color-accent-light)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white px-3 text-xs font-bold transition-all"
                        >
                          Reopen Report
                        </button>
                        <button
                          onClick={() => deleteHistoryItem(item.companyName, item.createdAt)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                          title="Delete archived analysis"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
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
