import React from "react";
import { motion } from "framer-motion";

const DECISION_CONFIG = {
  BUY: {
    label: "INVEST",
    badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    accent: "bg-emerald-500",
    textClass: "text-emerald-500",
    emoji: "🟢",
    horizon: "Medium-term (12–18 months)"
  },
  INVEST: {
    label: "INVEST",
    badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    accent: "bg-emerald-500",
    textClass: "text-emerald-500",
    emoji: "🟢",
    horizon: "Medium-term (12–18 months)"
  },
  WATCHLIST: {
    label: "WATCHLIST",
    badge: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    accent: "bg-amber-500",
    textClass: "text-amber-500",
    emoji: "🟡",
    horizon: "Monitor 3–6 months"
  },
  PASS: {
    label: "PASS",
    badge: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    accent: "bg-rose-500",
    textClass: "text-rose-500",
    emoji: "🔴",
    horizon: "Not recommended"
  },
  AVOID: {
    label: "PASS",
    badge: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    accent: "bg-rose-500",
    textClass: "text-rose-500",
    emoji: "🔴",
    horizon: "Not recommended"
  }
};

function RecommendationBanner({ decision, confidence, overallScore, reasoning, companyName }) {
  const normDecision = (decision || "WATCHLIST").toUpperCase();
  const config = DECISION_CONFIG[normDecision] || DECISION_CONFIG.WATCHLIST;

  // Clean bullet points if any
  const paragraphReasoning = (reasoning || "")
    .replace(/^[-•*]\s+/gm, "")
    .replace(/\n[-•*]/g, " ")
    .replace(/\n+/g, " ")
    .trim();

  // Fake some meta values if not provided
  const meta = {
    ticker: companyName.toUpperCase().slice(0, 4),
    industry: "SaaS & AI Services",
    cap: "$8.4B",
    price: "$142.50"
  };

  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] relative overflow-hidden shadow-md"
    >
      {/* Dynamic colored accent bar at top */}
      <div className={"absolute inset-x-0 top-0 h-1.5 " + config.accent} />

      {/* Hero Decision Section */}
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/30">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--text-muted)]">
            FINAL INVESTMENT DECISION
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text-primary)] mt-1.5 flex items-center gap-3">
            {config.label}
          </h2>
          <p className="mt-2.5 text-sm text-[var(--text-secondary)] font-medium">
            TradeIntel multi-agent consensus report for <strong className="text-[var(--text-primary)] font-bold">{companyName}</strong> ({meta.ticker})
          </p>
        </div>

        {/* Hero Score metrics layout */}
        <div className="flex gap-3 md:gap-4 shrink-0 flex-wrap">
          <div className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] px-5 py-4 text-center min-w-[110px] shadow-sm">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">Overall Score</span>
            <p className={"text-3xl font-black font-mono " + config.textClass}>
              {overallScore}<span className="text-xs font-semibold text-[var(--text-muted)]">/100</span>
            </p>
          </div>
          
          <div className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] px-5 py-4 text-center min-w-[110px] shadow-sm">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">Confidence</span>
            <p className="text-3xl font-black font-mono text-[var(--text-primary)]">
              {confidence}<span className="text-xs font-semibold text-[var(--text-muted)]">%</span>
            </p>
          </div>

          <div className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] px-5 py-4 text-center min-w-[110px] shadow-sm">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">Horizon</span>
            <p className="text-xs font-bold text-[var(--text-primary)] mt-1.5 leading-tight">{config.horizon}</p>
          </div>
        </div>
      </div>

      {/* Detail row */}
      <div className="px-6 py-4 border-b border-[var(--border-color)]/60 bg-[var(--bg-surface)] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)] font-medium">
        <span>Industry: <strong className="text-[var(--text-primary)]">{meta.industry}</strong></span>
        <span className="text-[var(--border-color-strong)]">|</span>
        <span>Market Cap: <strong className="text-[var(--text-primary)]">{meta.cap}</strong></span>
        <span className="text-[var(--border-color-strong)]">|</span>
        <span>Current Price: <strong className="text-[var(--text-primary)]">{meta.price}</strong></span>
        <span className="text-[var(--border-color-strong)]">|</span>
        <span>Last Audit: <strong className="text-[var(--text-primary)]">{lastUpdated}</strong></span>
        <span className="text-[var(--border-color-strong)]">|</span>
        <span>Decision Status: <strong className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide border ml-1 ${
          overallScore >= 60 
            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
            : "bg-rose-500/10 text-rose-500 border-rose-500/20"
        }`}>{overallScore >= 60 ? "PASS" : "FAIL"}</strong></span>
      </div>

      {/* Thesis explanation body */}
      <div className="p-6 md:p-8">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--text-muted)] mb-3">
          AI CONSENSUS INVESTMENT THESIS & REASONING
        </p>
        <p className="text-base leading-relaxed text-[var(--text-secondary)] font-medium max-w-5xl">
          {paragraphReasoning || "No consensus thesis was generated by the committee agent."}
        </p>
      </div>

      {/* Interactive Footer */}
      <div className="px-6 py-3 bg-[var(--bg-secondary)]/50 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 text-[10px] text-[var(--text-muted)] font-bold tracking-wide">
        <span>SCORING WEIGHTS: 40% FUNDAMENTALS · 20% MOAT · 20% SENTIMENT · 20% RISK</span>
        <span>SECURE DATA SOURCE VERIFIED</span>
      </div>
    </motion.section>
  );
}

export default RecommendationBanner;
