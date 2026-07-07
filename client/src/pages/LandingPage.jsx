import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme, THEME_MODES } from "../context/ThemeContext";

/* ── icons ──────────────────────────────────── */
const SunIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);
const MoonIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
  </svg>
);

const FEATURES = [
  {
    icon: "🤖",
    title: "Multi-Agent AI",
    desc: "7 specialized LangGraph agents work in parallel — each focused on a different research domain.",
    color: "rgba(96,165,250,0.1)",
    border: "rgba(96,165,250,0.2)"
  },
  {
    icon: "🔗",
    title: "LangGraph Workflow",
    desc: "Deterministic, orchestrated research pipeline with full auditability at every agent step.",
    color: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.2)"
  },
  {
    icon: "📊",
    title: "Financial Intelligence",
    desc: "Revenue growth, margin analysis, debt ratios, and balance sheet evaluation in seconds.",
    color: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.2)"
  },
  {
    icon: "💡",
    title: "Explainable AI",
    desc: "Every score includes transparent reasoning. No black-box decisions — understand the why.",
    color: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.2)"
  },
  {
    icon: "🏛️",
    title: "Investment Committee",
    desc: "Bull/bear case analysis, moat scoring, and conviction rating from a simulated committee.",
    color: "rgba(251,113,133,0.1)",
    border: "rgba(251,113,133,0.2)"
  },
  {
    icon: "⚠️",
    title: "Risk Analysis",
    desc: "Probability × impact matrix with concrete mitigation strategies for each identified risk.",
    color: "rgba(251,146,60,0.1)",
    border: "rgba(251,146,60,0.2)"
  }
];

const PIPELINE = [
  { icon: "🔍", label: "Search Company", desc: "Identify ticker, sector, and business model" },
  { icon: "📡", label: "Gather Market Data", desc: "Fetch financial statements and market context" },
  { icon: "📈", label: "Financial Analysis", desc: "Revenue, margins, debt, growth trajectory" },
  { icon: "⚠️", label: "Risk Analysis", desc: "Probability × impact risk matrix" },
  { icon: "📰", label: "News Sentiment", desc: "Positive/negative media signal extraction" },
  { icon: "🏰", label: "Moat Analysis", desc: "Competitive advantage and durability scoring" },
  { icon: "🏛️", label: "Investment Committee", desc: "Bull/bear case synthesis and conviction" },
  { icon: "✅", label: "Final Recommendation", desc: "BUY · WATCHLIST · AVOID with confidence score" }
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
};

function LandingPage() {
  const { user } = useAuth();
  const { themeMode, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () =>
    setTheme(themeMode === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-surface)]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)] shadow-sm">
              <span className="text-xs font-bold text-white">TI</span>
            </div>
            <span className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">TradeIntel AI</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--text-secondary)]">
            <a href="#features" className="hover:text-[var(--text-primary)] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[var(--text-primary)] transition-colors">How it works</a>
            <a
              href="https://github.com/kartikch0543/AI-Investment-Research-Agent"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              GitHub
            </a>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-color-strong)] transition-all"
            >
              {themeMode === THEME_MODES.DARK ? <SunIcon /> : <MoonIcon />}
            </button>
            {user ? (
              <Link to="/app/dashboard" className="btn-primary text-sm h-9 px-4">
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center h-9 px-4 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Sign in
                </Link>
                <Link to="/signup" className="btn-primary text-sm h-9 px-4">
                  Start Free
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-accent-light)] blur-[100px] opacity-60" />
          <div className="absolute top-1/3 -right-24 w-[300px] h-[300px] rounded-full bg-[var(--color-buy-bg)] blur-[80px] opacity-40" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 rounded-full border border-[var(--color-accent-medium)] bg-[var(--color-accent-light)] px-4 py-1.5 text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              Powered by LangGraph Multi-Agent AI
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight leading-[1.08] text-[var(--text-primary)]">
              AI Investment Research,{" "}
              <span className="text-[var(--color-accent)]">Driven by</span>
              <br />
              7 Specialized Agents
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)] max-w-2xl mx-auto">
              TradeIntel analyzes any public company through a deterministic 7-agent pipeline —
              delivering structured financial research, transparent scoring, and an explainable
              BUY&nbsp;/&nbsp;WATCHLIST&nbsp;/&nbsp;AVOID recommendation.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary gap-2 text-base px-8 h-12">
                
                Start Research Free
              </Link>
              <a href="#how-it-works" className="btn-ghost text-base px-8 h-12">
                View Architecture →
              </a>
            </div>


          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3">
              What's inside
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Built for serious investors
            </h2>
            <p className="mt-4 text-base text-[var(--text-secondary)] max-w-xl mx-auto">
              Every component of TradeIntel is purpose-built — from data gathering to final verdict.
            </p>
          </div>

          {/* 6-card grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={item}
                className="premium-panel p-6 group cursor-default"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl mb-5 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: f.color, border: `1px solid ${f.border}` }}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS (Pipeline) ─────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 bg-[var(--bg-secondary)]/60 border-y border-[var(--border-color)]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3">
              Architecture
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              How TradeIntel works
            </h2>
            <p className="mt-4 text-base text-[var(--text-secondary)] max-w-xl mx-auto">
              Each research run executes a multi-stage LangGraph pipeline. Every step is auditable, deterministic, and transparent.
            </p>
          </div>

          {/* Pipeline steps */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--border-color-strong)] to-transparent hidden sm:block" />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="space-y-4"
            >
              {PIPELINE.map((step, i) => (
                <motion.div
                  key={step.label}
                  variants={item}
                  className="flex items-start gap-5"
                >
                  {/* Step number bubble */}
                  <div className="relative shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border-color-strong)] bg-[var(--bg-surface)] shadow-sm z-10 text-2xl">
                    {step.icon}
                    {i < PIPELINE.length - 1 && (
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[var(--text-muted)] text-[10px] font-bold hidden sm:block">↓</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 hover:border-[var(--border-color-strong)] transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{step.label}</p>
                        <p className="text-sm text-[var(--text-secondary)] mt-0.5">{step.desc}</p>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-1 rounded-lg">
                        Step {i + 1}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS / STATS ────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-px sm:grid-cols-3 rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--border-color)]"
          >
            {[
              { stat: "7", label: "Specialized AI Agents", sub: "Each with a dedicated research role" },
              { stat: "100", label: "Transparent Score", sub: "Explained across 4 dimensions" },
              { stat: "< 30s", label: "Research Time", sub: "Full company analysis on demand" }
            ].map((s) => (
              <motion.div
                key={s.stat}
                variants={item}
                className="bg-[var(--bg-surface)] p-8 text-center"
              >
                <p className="text-4xl font-bold text-[var(--color-accent)] mb-2">{s.stat}</p>
                <p className="text-base font-semibold text-[var(--text-primary)]">{s.label}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
            className="relative rounded-3xl border border-[var(--color-accent-medium)] bg-[var(--color-accent-light)] p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-light)] to-transparent" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                Ready to research smarter?
              </h2>
              <p className="text-base text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
                Start analyzing public companies with 7 AI agents in under 30 seconds.
                No credit card required.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/signup" className="btn-primary text-base h-12 px-8">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn-ghost text-base h-12 px-8">
                  Sign in
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-surface)]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]">
                <span className="text-[10px] font-bold text-white">TI</span>
              </div>
              <span className="text-sm font-semibold text-[var(--text-primary)]">TradeIntel AI</span>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
              <a
                href="https://github.com/kartikch0543/AI-Investment-Research-Agent"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                GitHub
              </a>
              <Link to="/login" className="hover:text-[var(--text-primary)] transition-colors">Sign In</Link>
              <Link to="/signup" className="hover:text-[var(--text-primary)] transition-colors">Sign Up</Link>
            </nav>

            {/* Theme + copyright */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
              >
                {themeMode === THEME_MODES.DARK ? <SunIcon /> : <MoonIcon />}
              </button>
              <p className="text-xs text-[var(--text-muted)]">
                © {new Date().getFullYear()} TradeIntel AI
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
