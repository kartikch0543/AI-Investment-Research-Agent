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
import ThemeToggle from "../components/theme/ThemeToggle";
import GlassPanel from "../components/ui/GlassPanel";
import SectionHeading from "../components/ui/SectionHeading";
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
        <GlassPanel className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
          <SectionHeading
            eyebrow="AlphaLens AI"
            title="Multi-agent investment research workspace"
            description="Search a company, trace the research pipeline, and review a recommendation that is scored deterministically and explained by focused AI agents."
            action={
              <div className="flex flex-wrap items-center gap-3">
                <ThemeToggle />
                <Link
                  to="/history"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200/70 bg-white/60 px-5 py-3 text-sm font-medium text-slate-700 backdrop-blur hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                >
                  View search history
                </Link>
              </div>
            }
          />
        </GlassPanel>

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
