import GlassPanel from "./ui/GlassPanel";

const VERDICT_CONFIG = {
  BUY: {
    badge: "INVEST SIGNAL",
    bgClass: "bg-emerald-500/5 border-emerald-500/20",
    textClass: "text-emerald-500",
    accent: "bg-emerald-500",
    audienceInvest: "Growth-focused equity investors seeking scalable market leaders with strong return on capital profiles.",
    audienceAvoid: "Short-term micro-cap value seekers or absolute-return conservative fixed income investors.",
    advice: "Initiate modular positions at current pricing levels. Consider dollar-cost averaging on short-term macro pullbacks to optimize baseline cost entry."
  },
  WATCHLIST: {
    badge: "WATCHLIST SIGNAL",
    bgClass: "bg-amber-500/5 border-amber-500/20",
    textClass: "text-amber-500",
    accent: "bg-amber-500",
    audienceInvest: "Tactical asset allocators waiting for market entry opportunities at more favorable historical valuations.",
    audienceAvoid: "High-conviction immediate growth traders looking for rapid upward catalysts within 30 days.",
    advice: "Add to core monitoring watchlist. Wait for key support levels or margin expansion confirmation in the upcoming quarterly releases before deploying capital."
  },
  AVOID: {
    badge: "PASS SIGNAL",
    bgClass: "bg-rose-500/5 border-rose-500/20",
    textClass: "text-rose-500",
    accent: "bg-rose-500",
    audienceInvest: "Contrarian value managers specializing in turnaround plays with long-duration recovery outlooks.",
    audienceAvoid: "Risk-averse capital preservation investors seeking immediate dividend safety or stable operating growth profiles.",
    advice: "Withhold direct capital allocation. Diversify assets into stronger cash-flow generators showing superior return on equity profiles and lower debt margins."
  }
};

function getConfig(decision) {
  const normalized = (decision || "").toUpperCase();
  if (normalized === "BUY" || normalized === "INVEST") return VERDICT_CONFIG.BUY;
  if (normalized === "WATCHLIST") return VERDICT_CONFIG.WATCHLIST;
  return VERDICT_CONFIG.AVOID;
}

function FinalVerdictCard({ result }) {
  const config = getConfig(result.decision);

  return (
    <GlassPanel className={`border-2 ${config.bgClass} relative overflow-hidden animate-fade-in-up`}>
      {/* Accent indicator line */}
      <div className={`absolute inset-y-0 left-0 w-[4px] ${config.accent}`} />

      <div className="pl-1">
        <div className="flex items-center gap-2.5 mb-4">
          <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${config.bgClass} ${config.textClass}`}>
            {config.badge}
          </span>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Research Decision</p>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
          TradeIntel Final Consensus Verdict
        </h2>

        {/* Math Summary Metrics */}
        <div className="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Expected Horizon</span>
            <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">12 - 24 Months</p>
          </div>
          <div className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Target Audience</span>
            <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Medium Term Growth</p>
          </div>
          <div className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Risk Profile</span>
            <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Moderate / Managed</p>
          </div>
        </div>

        {/* Thesis Audience Split */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 mb-2">
              <svg className="h-4 w-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Who Should Invest?
            </h3>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{config.audienceInvest}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 mb-2">
              <svg className="h-4 w-4 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Who Should Avoid?
            </h3>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{config.audienceAvoid}</p>
          </div>
        </div>

        {/* Actionable Advice Callout */}
        <div className="mt-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">Actionable Guidelines</p>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)] font-medium">
            {config.advice}
          </p>
        </div>
      </div>
    </GlassPanel>
  );
}

export default FinalVerdictCard;
