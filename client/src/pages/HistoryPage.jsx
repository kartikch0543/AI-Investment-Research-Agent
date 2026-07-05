import { Link } from "react-router-dom";

import SearchHistoryPanel from "../components/SearchHistoryPanel";
import ThemeToggle from "../components/theme/ThemeToggle";
import GlassPanel from "../components/ui/GlassPanel";
import SectionHeading from "../components/ui/SectionHeading";

function HistoryPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <GlassPanel>
          <SectionHeading
            eyebrow="History"
            title="Research history"
            description="This page keeps a lightweight local view of recent searches so the dashboard feels like a real product while backend persistence is still being implemented."
            action={
              <div className="flex flex-wrap items-center gap-3">
                <ThemeToggle />
                <Link
                  to="/"
                  className="inline-flex rounded-full border border-slate-200/70 bg-white/60 px-5 py-3 text-sm font-medium text-slate-700 backdrop-blur hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                >
                  Back to dashboard
                </Link>
              </div>
            }
          />
        </GlassPanel>

        <SearchHistoryPanel />
      </div>
    </main>
  );
}

export default HistoryPage;
