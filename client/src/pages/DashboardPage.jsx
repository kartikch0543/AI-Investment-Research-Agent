import { Link } from "react-router-dom";

import SearchForm from "../components/SearchForm";
import ProgressTimeline from "../components/ProgressTimeline";
import ScoreOverview from "../components/ScoreOverview";
import ResearchCard from "../components/ResearchCard";
import RecommendationBanner from "../components/RecommendationBanner";
import SentimentPanel from "../components/SentimentPanel";
import RiskPanel from "../components/RiskPanel";
import SearchHistoryPanel from "../components/SearchHistoryPanel";
import CompanySnapshot from "../components/CompanySnapshot";
import ScoreBreakdownChart from "../charts/ScoreBreakdownChart";
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">AlphaLens AI</p>
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
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] items-start">
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

      {/* Result Sections */}
      {result ? (
        <>
          {/* Recommendation Banner — Full Width */}
          <RecommendationBanner
            decision={result.decision}
            confidence={result.confidence}
            overallScore={result.overallScore}
            reasoning={result.reasoning}
          />

          {/* Score + Company + History */}
          <section className="grid gap-6 xl:grid-cols-[1fr_1fr_0.85fr] items-start">
            <ScoreOverview result={result} />
            <CompanySnapshot result={result} />
            <SearchHistoryPanel compact />
          </section>

          {/* Chart + Financial Summary */}
          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] items-start">
            <ScoreBreakdownChart scoreBreakdown={result.scoreBreakdown} />
            <ResearchCard
              title="Financial Summary"
              subtitle="Core business performance"
              items={result.financialSummary.strengths || []}
              secondaryItems={result.financialSummary.weaknesses || []}
              summary={result.financialSummary.summary}
            />
          </section>

          {/* Sentiment + Risk + Competitive Moat */}
          <section className="grid gap-6 xl:grid-cols-3 items-start">
            <SentimentPanel sentiment={result.sentiment} />
            <RiskPanel risks={result.risks} />
            <ResearchCard
              title="Competitive Advantage"
              subtitle="Business quality & moat"
              items={result.moat.strengths || []}
              secondaryItems={result.moat.weaknesses || []}
              summary={result.moat.summary}
            />
          </section>
        </>
      ) : (
        <ResearchEmptyState />
      )}
    </div>
  );
}

export default DashboardPage;
