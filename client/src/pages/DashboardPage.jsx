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
import ProtectedTopBar from "../components/layout/ProtectedTopBar";
import QuickStats from "../components/QuickStats";
import ResearchEmptyState from "../components/ResearchEmptyState";
import GlassPanel from "../components/ui/GlassPanel";
import SectionHeading from "../components/ui/SectionHeading";
import { useResearch } from "../hooks/useResearch";
import { useSearchHistory } from "../context/SearchHistoryContext";

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

  return (
    <>
      <ProtectedTopBar />
      <main className="min-h-[calc(100vh-96px)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <GlassPanel className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <SectionHeading
              eyebrow="AlphaLens AI"
              title="Your investment research workspace"
              description="Search a company, review recent analysis, and turn research into a structured investment recommendation."
              action={
                <Link
                  to="/app/history"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200/70 bg-white/60 px-5 py-3 text-sm font-medium text-slate-700 backdrop-blur hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                >
                  View research history
                </Link>
              }
            />
          </GlassPanel>

          <QuickStats result={result} historyCount={historyItems.length} loading={loading} />

          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
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

          {result ? (
            <>
              <RecommendationBanner
                decision={result.decision}
                confidence={result.confidence}
                overallScore={result.overallScore}
                reasoning={result.reasoning}
              />

              <section className="grid gap-6 xl:grid-cols-[1fr_1fr_0.9fr]">
                <ScoreOverview result={result} />
                <CompanySnapshot result={result} />
                <SearchHistoryPanel compact />
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <ScoreBreakdownChart scoreBreakdown={result.scoreBreakdown} />
                <ResearchCard
                  title="Financial Summary"
                  subtitle="Core business performance"
                  items={result.financialSummary.strengths || []}
                  secondaryItems={result.financialSummary.weaknesses || []}
                  summary={result.financialSummary.summary}
                />
              </section>

              <section className="grid gap-6 xl:grid-cols-3">
                <SentimentPanel sentiment={result.sentiment} />
                <RiskPanel risks={result.risks} />
                <ResearchCard
                  title="Competitive Advantage"
                  subtitle="Business quality"
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
      </main>
    </>
  );
}

export default DashboardPage;
