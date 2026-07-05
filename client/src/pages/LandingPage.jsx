import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeToggle from "../components/theme/ThemeToggle";
import GlassPanel from "../components/ui/GlassPanel";

const FEATURES = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "7-Agent Research Pipeline",
    desc: "Parallel AI agents analyze market context, financials, competitive moat, sentiment, and risk."
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Deterministic Scoring",
    desc: "Transparent 0–100 scores across Financial Health, Sentiment, Moat, and Risk dimensions."
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "AI Copilot",
    desc: "Ask follow-up questions about metrics, moats, and your active research in natural language."
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Secure & Private",
    desc: "Firebase authentication, per-user data isolation, and encrypted research history."
  }
];

function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-12">

        {/* NAV */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-accent)] text-sm font-bold text-white dark:text-[var(--text-inverse)] shadow-md">
              AL
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">AlphaLens</p>
              <p className="text-xs text-[var(--text-muted)]">AI Investment Research</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/login"
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
            >
              Sign in
            </Link>
          </div>
        </header>

        {/* HERO */}
        <section className="text-center pt-8 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-medium)] bg-[var(--color-accent-light)] px-4 py-1.5 text-[11px] font-bold text-[var(--color-accent)] uppercase tracking-widest mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              Powered by LangGraph Multi-Agent AI
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] max-w-4xl mx-auto">
              Investment research.{" "}
              <span className="text-[var(--color-accent)]">AI-powered.</span>
              <br />Decisively clear.
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] max-w-2xl mx-auto">
              AlphaLens analyzes any public company with 7 specialized AI agents — delivering structured research,
              transparent scoring, and an explainable BUY / WATCHLIST / AVOID recommendation.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] px-7 py-3.5 text-sm font-semibold text-white dark:text-[var(--text-inverse)] shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start for Free
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-color-strong)] bg-[var(--bg-surface)] px-7 py-3.5 text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-0.5 transition-all"
              >
                Sign in to workspace
              </Link>
            </div>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section>
          <div className="text-center mb-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">What's inside</p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">Built for serious investors</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="premium-panel rounded-2xl p-5 border border-[var(--border-color)] hover:border-[var(--color-accent)] hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-light)] text-[var(--color-accent)] mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{f.title}</p>
                <p className="mt-1.5 text-xs text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PIPELINE STEPS */}
        <GlassPanel className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-30" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Research Pipeline</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">How AlphaLens works</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-xl">
            Each research run executes a multi-stage pipeline coordinated by LangGraph.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", label: "Company Discovery", desc: "Identifies the company, ticker, and core business context." },
              { step: "02", label: "Financial Analysis", desc: "Evaluates fundamentals: revenue, margins, debt, growth." },
              { step: "03", label: "Market Sentiment", desc: "Analyzes news, headlines, and market perception signals." },
              { step: "04", label: "Recommendation", desc: "Combines all signals into a transparent BUY / AVOID verdict." }
            ].map(item => (
              <div key={item.step} className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4">
                <p className="text-2xl font-bold text-[var(--color-accent)] opacity-60 mb-2">{item.step}</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{item.label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* CTA FOOTER */}
        <div className="text-center py-8 border-t border-[var(--border-color)]">
          <p className="text-sm text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} AlphaLens AI · Built with LangGraph, Firebase & React
          </p>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
