import { motion } from "framer-motion";
import GlassPanel from "./ui/GlassPanel";

const FEATURE_TILES = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    title: "Multi-Agent Research",
    desc: "7 specialized AI agents analyze markets, fundamentals, moat, and risk in parallel."
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Deterministic Scoring",
    desc: "Transparent 0–100 scoring across financial health, sentiment, moat, and risk dimensions."
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "AI Copilot",
    desc: "Ask follow-up questions, explore metrics, and get context-aware explanations."
  }
];

function ResearchEmptyState() {
  return (
    <GlassPanel className="relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-emerald-400 opacity-[0.04] blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-light)] border border-[var(--color-accent-medium)]">
            <svg className="h-5 w-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Research Workspace</p>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Start your analysis</h2>
          </div>
        </div>

        <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] mb-8">
          AlphaLens AI uses a multi-agent pipeline powered by LangGraph to analyze any publicly traded company.
          Enter a company name above to generate a structured investment recommendation with traceable, explainable outputs.
        </p>

        <div className="grid gap-4 lg:grid-cols-3">
          {FEATURE_TILES.map((tile, i) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 hover:border-[var(--color-accent)] transition-all duration-200 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-accent-light)] text-[var(--color-accent)] mb-3 group-hover:scale-110 transition-transform">
                {tile.icon}
              </div>
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">{tile.title}</p>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{tile.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}

export default ResearchEmptyState;
