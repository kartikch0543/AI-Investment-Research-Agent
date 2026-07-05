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
import { useResearch } from "../hooks/useResearch";

function DashboardPage() {
  const {
    companyName,
    result,
    loading,
    error,
    handleCompanyNameChange,
    submitResearch
  } = useResearch();

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-3xl bg-white/80 p-8 shadow-panel backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-signal">
                AlphaLens AI
              </p>
              <h1 className="mt-2 text-4xl font-semibold text-ink">
                Multi-agent investment research dashboard
              </h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Search a company, trace the research pipeline, and review a recommendation that is scored
                deterministically and explained by focused AI agents.
              </p>
            </div>

            <Link
              to="/history"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-signal hover:text-signal"
            >
              View search history
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <SearchForm
            companyName={companyName}
            loading={loading}
            error={error}
            onCompanyNameChange={handleCompanyNameChange}
            onSubmit={submitResearch}
          />
          <ProgressTimeline loading={loading} hasResult={Boolean(result)} />
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
                subtitle="Fundamental analysis node"
                items={result.financialSummary.strengths || []}
                secondaryItems={result.financialSummary.weaknesses || []}
                summary={result.financialSummary.summary}
              />
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
              <SentimentPanel sentiment={result.sentiment} />
              <RiskPanel risks={result.risks} />
              <ResearchCard
                title="Moat Analysis"
                subtitle="Business quality node"
                items={result.moat.strengths || []}
                secondaryItems={result.moat.weaknesses || []}
                summary={result.moat.summary}
              />
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}

export default DashboardPage;
