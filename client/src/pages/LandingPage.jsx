import { Link } from "react-router-dom";

import ThemeToggle from "../components/theme/ThemeToggle";
import GlassPanel from "../components/ui/GlassPanel";

function LandingPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">
              AL
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-signal dark:text-cyan-300">
                AlphaLens AI
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Premium investment research</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/login"
              className="rounded-full border border-slate-200/70 bg-white/70 px-5 py-3 text-sm font-medium text-slate-700 backdrop-blur hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            >
              Sign in
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassPanel className="relative overflow-hidden">
            <div className="absolute -right-16 top-6 h-48 w-48 rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-400/20" />
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal dark:text-cyan-300">
              Institutional-grade research, reimagined
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              Turn company research into a confident investment decision.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              AlphaLens AI combines financial analysis, market sentiment, risk assessment, and business quality into
              one guided research experience built for clarity.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/signup"
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
              >
                Start with Google
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-slate-200/70 bg-white/70 px-6 py-3 text-sm font-medium text-slate-700 backdrop-blur hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
              >
                Open your workspace
              </Link>
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal dark:text-cyan-300">
              What you get
            </p>
            <div className="mt-5 space-y-4">
              {[
                "Business-friendly research stages instead of technical AI jargon",
                "A guided recommendation with confidence and score breakdown",
                "A clean workspace for recent research, settings, and account access"
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </GlassPanel>
        </section>
      </div>
    </main>
  );
}

export default LandingPage;
