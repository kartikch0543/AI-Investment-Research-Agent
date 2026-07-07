import { motion } from "framer-motion";

function getDecisionStyle(decision) {
  const d = (decision || "").toUpperCase();
  if (d === "BUY" || d === "INVEST")
    return {
      text: "INVEST",
      cls: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/25",
      dot: "bg-emerald-500",
    };
  if (d === "WATCHLIST")
    return {
      text: "WATCHLIST",
      cls: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/25",
      dot: "bg-amber-400",
    };
  if (d === "PASS" || d === "AVOID")
    return {
      text: "PASS",
      cls: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/25",
      dot: "bg-rose-500",
    };
  return {
    text: "–",
    cls: "text-[var(--text-muted)]",
    bg: "bg-transparent",
    border: "border-[var(--border-color)]",
    dot: "bg-[var(--text-muted)]",
  };
}

function getWorkspaceStyle(status) {
  if (status === "Running")
    return { cls: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/25", dot: "bg-blue-400" };
  if (status === "Ready")
    return { cls: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/25", dot: "bg-emerald-500" };
  return { cls: "text-[var(--text-muted)]", bg: "bg-transparent", border: "border-[var(--border-color)]", dot: "bg-[var(--text-muted)]" };
}

function StatusDot({ color, pulse }) {
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      {pulse && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-60`} />}
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`} />
    </span>
  );
}

/* ─── individual stat card ─────────────────────────────────── */
function StatCard({ label, icon, value, valueCls, hint, badge, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 overflow-hidden group hover:border-[var(--border-color-strong)] hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
    >
      {/* top row — icon + label */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent-light)] text-[var(--color-accent)]">
            {icon}
          </div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</p>
        </div>
        {badge && (
          <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${badge.bg} ${badge.border} ${badge.cls}`}>
            <StatusDot color={badge.dot} pulse={badge.pulse} />
            {badge.text}
          </div>
        )}
      </div>

      {/* main value */}
      <p className={`text-3xl sm:text-4xl font-black tracking-tight leading-none ${valueCls}`}>
        {value}
      </p>

      {/* hint */}
      <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">{hint}</p>

      {/* subtle bottom glow */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--border-color-strong)] to-transparent opacity-60" />
    </motion.div>
  );
}

/* ─── QuickStats ───────────────────────────────────────────── */
function QuickStats({ result, historyCount, loading }) {
  const wsStatus = loading ? "Running" : result ? "Ready" : "Idle";
  const wsSty = getWorkspaceStyle(wsStatus);
  const decSty = getDecisionStyle(result?.decision);

  const stats = [
    {
      label: "Workspace Status",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
        </svg>
      ),
      value: wsStatus,
      valueCls: wsSty.cls,
      hint: loading ? "AI research pipeline is active." : result ? "Results are ready to review." : "Search a company to begin.",
      badge: { text: wsStatus, ...wsSty, pulse: wsStatus === "Running" },
    },
    {
      label: "AI Recommendation",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      value: result ? decSty.text : "–",
      valueCls: decSty.cls,
      hint: result
        ? `Confidence: ${result.confidence}% · Score: ${result.overallScore}/100`
        : "Run a company analysis to generate.",
      badge: result ? { text: decSty.text, ...decSty, pulse: false } : null,
    },
    {
      label: "Research History",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: String(historyCount || 0),
      valueCls: historyCount > 0 ? "text-[var(--color-accent)]" : "text-[var(--text-muted)]",
      hint: historyCount === 1 ? "1 analysis saved." : `${historyCount || 0} analyses saved.`,
      badge: null,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {stats.map((s, i) => (
        <StatCard key={s.label} index={i} {...s} />
      ))}
    </section>
  );
}

export default QuickStats;
