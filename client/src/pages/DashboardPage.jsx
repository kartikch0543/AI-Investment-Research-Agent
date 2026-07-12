import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import SearchForm from "../components/SearchForm";
import ProgressTimeline from "../components/ProgressTimeline";
import RecommendationBanner from "../components/RecommendationBanner";
import ScoreBreakdownSection from "../components/ScoreBreakdownSection";
import CompanyMetricsSnapshot from "../components/CompanyMetricsSnapshot";
import SwotAnalysis from "../components/SwotAnalysis";
import NewsTimelinePanel from "../components/NewsTimelinePanel";
import RiskMatrixTable from "../components/RiskMatrixTable";
import InvestmentThesisPanel from "../components/InvestmentThesisPanel";
import DetailedAgentAccordion from "../components/DetailedAgentAccordion";
import FinalVerdictCard from "../components/FinalVerdictCard";
import SearchHistoryPanel from "../components/SearchHistoryPanel";
import QuickStats from "../components/QuickStats";
import ResearchEmptyState from "../components/ResearchEmptyState";
import { useResearch } from "../hooks/useResearch";
import { useSearchHistory } from "../context/SearchHistoryContext";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const {
    companyName,
    result,
    loading,
    error,
    activeStage,
    researchStages,
    handleCompanyNameChange,
    submitResearch
  } = useResearch();
  const { historyItems } = useSearchHistory();
  const { user } = useAuth();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const displayName = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "Investor";
  const capitalizedDisplayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

  return (
    <div className="flex flex-col gap-8">

      {/* ── Page header ──────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-[var(--border-color)]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
          className="flex-1"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--color-accent)] mb-2">
            TradeIntel AI · Research Workspace
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)] leading-tight">
            {greeting()},{" "}
            <span className="text-[var(--color-accent)]">
              {capitalizedDisplayName}
            </span>
          </h1>
          <p className="mt-2 text-sm font-medium text-[var(--text-secondary)]">
            Ready to analyze your next investment?
          </p>
        </motion.div>

        {/* Today's Market Indexes */}
        <div className="flex items-center gap-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl px-5 py-3 shadow-sm shrink-0">
          <div className="flex flex-col pr-4 border-r border-[var(--border-color)]">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Today's Market</span>
            <span className="text-[10px] font-bold text-emerald-500 mt-0.5 flex items-center gap-1 animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> LIVE
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">NIFTY 50</span>
              <span className="text-xs font-bold text-emerald-500 font-mono mt-0.5">+0.84%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">SENSEX</span>
              <span className="text-xs font-bold text-emerald-500 font-mono mt-0.5">+1.02%</span>
            </div>
          </div>
        </div>

        <Link
          to="/app/history"
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-accent-light)] px-4 py-2.5 text-sm font-bold text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all whitespace-nowrap shadow-sm shrink-0 self-start md:self-auto"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Research History
        </Link>
      </div>

      {/* ── Quick stats ───────────────────────────────── */}
      <QuickStats result={result} historyCount={historyItems.length} loading={loading} />

      {/* ── Search + Progress grid ────────────────────── */}
      <section className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr] items-stretch">
        <SearchForm
          companyName={companyName}
          loading={loading}
          error={error}
          onCompanyNameChange={handleCompanyNameChange}
          onSubmit={submitResearch}
        />
        <ProgressTimeline
          loading={loading}
          hasResult={Boolean(result)}
          activeStage={activeStage}
          stages={researchStages}
        />
      </section>

      {/* ── Report flow ───────────────────────────────── */}
      {result ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          {/* 1 · Executive Summary */}
          <RecommendationBanner
            decision={result.decision}
            confidence={result.confidence}
            overallScore={result.overallScore}
            reasoning={result.reasoning}
            companyName={result.companyName}
          />

          {/* 2 · Score Breakdown */}
          <ScoreBreakdownSection scoreBreakdown={result.scoreBreakdown} />

          {/* 3 · Company Metrics */}
          <CompanyMetricsSnapshot result={result} />

          {/* 4 · SWOT */}
          <SwotAnalysis result={result} />

          {/* 5 · News + Risk side-by-side */}
          <section className="grid gap-5 lg:grid-cols-2 items-stretch">
            <NewsTimelinePanel result={result} />
            <RiskMatrixTable result={result} />
          </section>

          {/* 6 · Investment Thesis */}
          <InvestmentThesisPanel result={result} />

          {/* 7 · Agent reports + history */}
          <section className="grid gap-5 lg:grid-cols-[1.75fr_1fr] items-stretch">
            <DetailedAgentAccordion result={result} />
            <SearchHistoryPanel compact className="h-full" />
          </section>

          {/* 8 · Final Verdict */}
          <FinalVerdictCard result={result} />
        </motion.div>
      ) : (
        <ResearchEmptyState />
      )}
    </div>
  );
}

export default DashboardPage;
