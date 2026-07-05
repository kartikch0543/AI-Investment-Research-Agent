import SearchHistoryPanel from "../components/SearchHistoryPanel";
import ProtectedTopBar from "../components/layout/ProtectedTopBar";
import GlassPanel from "../components/ui/GlassPanel";
import SectionHeading from "../components/ui/SectionHeading";

function HistoryPage() {
  return (
    <>
      <ProtectedTopBar />
      <main className="min-h-[calc(100vh-96px)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <GlassPanel>
            <SectionHeading
              eyebrow="History"
              title="Research history"
              description="Review recent company analysis runs from your AlphaLens workspace."
            />
          </GlassPanel>

          <SearchHistoryPanel />
        </div>
      </main>
    </>
  );
}

export default HistoryPage;
