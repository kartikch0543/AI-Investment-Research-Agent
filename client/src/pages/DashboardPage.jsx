import { Link } from "react-router-dom";

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

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">TradeIntel AI</p>
          <h1 className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
            {greeting()}, <span className="text-[var(--color-accent)]">{displayName}</span>
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Your AI-powered investment research workspace
          </p>
        </div>
        <Link
          to="/app/history"
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all whitespace-nowrap"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          View History
        </Link>
      </div>

      {/* Quick Stats */}
      <QuickStats result={result} historyCount={historyItems.length} loading={loading} />

      {/* Research Input + Progress */}
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] items-stretch">
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

      {/* Result Sections — Document-like continuous flow */}
      {result ? (
        <div className="flex flex-col gap-6">
          {/* 1. Executive Summary Hero Banner */}
          <RecommendationBanner
            decision={result.decision}
            confidence={result.confidence}
            overallScore={result.overallScore}
            reasoning={result.reasoning}
            companyName={result.companyName}
          />

          {/* 2. Score Breakdown (Math & Chart) */}
          <ScoreBreakdownSection scoreBreakdown={result.scoreBreakdown} />

          {/* 3. Company Metrics Grid */}
          <CompanyMetricsSnapshot result={result} />

          {/* 4. SWOT Grid Analysis */}
          <SwotAnalysis result={result} />

          {/* 5. News Sentiment Feed & Risk Mitigations */}
          <section className="grid gap-6 lg:grid-cols-2 items-stretch">
            <NewsTimelinePanel result={result} />
            <RiskMatrixTable result={result} />
          </section>

          {/* 6. Investment Thesis board */}
          <InvestmentThesisPanel result={result} />

          {/* 7. Collapsible Agent Deep-Dives & History */}
          <section className="grid gap-6 lg:grid-cols-[1.8fr_1fr] items-stretch">
            <DetailedAgentAccordion result={result} />
            <SearchHistoryPanel compact className="h-full" />
          </section>

          {/* 8. Final Verdict Callout Card */}
          <FinalVerdictCard result={result} />
        </div>
      ) : (
        <ResearchEmptyState />
      )}
    </div>
  );
}

export default DashboardPage;
