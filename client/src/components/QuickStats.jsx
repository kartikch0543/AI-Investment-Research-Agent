import { motion } from "framer-motion";

const STAT_CONFIGS = [
  {
    key: "workspace",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    )
  },
  {
    key: "recommendation",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    key: "history",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

function getDecisionColor(decision) {
  if (!decision || decision === "No result") return "text-[var(--text-muted)]";
  if (decision === "BUY") return "text-[var(--color-buy)]";
  if (decision === "WATCHLIST") return "text-[var(--color-watchlist)]";
  return "text-[var(--color-avoid)]";
}

function getWorkspaceColor(value) {
  if (value === "Running") return "text-blue-500 dark:text-blue-400";
  if (value === "Ready") return "text-[var(--color-buy)]";
  return "text-[var(--text-muted)]";
}

function StatCard({ label, value, hint, index, icon, valueColorClass }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="premium-panel rounded-2xl p-5 border border-[var(--border-color)] bg-[var(--bg-surface)] group hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent-light)] text-[var(--color-accent)]">
              {icon}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{label}</p>
          </div>
          <p className={`text-2xl font-bold tracking-tight truncate ${valueColorClass}`}>{value}</p>
          <p className="mt-1.5 text-xs text-[var(--text-muted)] leading-relaxed">{hint}</p>
        </div>
      </div>
    </motion.div>
  );
}

function QuickStats({ result, historyCount, loading }) {
  const stats = [
    {
      label: "Workspace Status",
      value: loading ? "Running" : result ? "Ready" : "Idle",
      hint: loading ? "AI research pipeline is active." : result ? "Results are ready to review." : "Search a company to begin.",
      config: STAT_CONFIGS[0],
      colorClass: loading ? "text-[var(--color-accent)]" : result ? "text-[var(--color-buy)]" : "text-[var(--text-muted)]"
    },
    {
      label: "AI Recommendation",
      value: result?.decision || "–",
      hint: result ? `Confidence: ${result.confidence} · Score: ${result.overallScore}` : "Run a company analysis to generate.",
      config: STAT_CONFIGS[1],
      colorClass: getDecisionColor(result?.decision)
    },
    {
      label: "Research History",
      value: historyCount || "0",
      hint: historyCount === 1 ? "1 analysis saved." : `${historyCount || 0} analyses saved locally.`,
      config: STAT_CONFIGS[2],
      colorClass: historyCount > 0 ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
    }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat, idx) => (
        <StatCard
          key={stat.label}
          index={idx}
          label={stat.label}
          value={stat.value}
          hint={stat.hint}
          icon={stat.config.icon}
          valueColorClass={stat.colorClass}
        />
      ))}
    </section>
  );
}

export default QuickStats;
