import { Link } from "react-router-dom";

import SearchHistoryPanel from "../components/SearchHistoryPanel";

function HistoryPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="rounded-3xl bg-white/80 p-8 shadow-panel backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-signal">History</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">Research history</h1>
          <p className="mt-3 text-slate-600">
            This page keeps a lightweight local view of recent searches so the dashboard feels like a real tool even
            before PostgreSQL persistence is added.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex w-fit rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-signal hover:text-signal"
          >
            Back to dashboard
          </Link>
        </header>

        <SearchHistoryPanel />
      </div>
    </main>
  );
}

export default HistoryPage;
