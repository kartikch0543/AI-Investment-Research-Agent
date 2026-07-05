import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

function ScoreBreakdownChart({ scoreBreakdown }) {
  const data = [
    { name: "Financial", value: scoreBreakdown.financialHealth },
    { name: "Sentiment", value: scoreBreakdown.newsSentiment },
    { name: "Moat", value: scoreBreakdown.businessQuality },
    { name: "Risk Adj", value: scoreBreakdown.riskAdjusted }
  ];

  return (
    <section className="rounded-[28px] border border-slate-200/70 bg-white/70 p-8 shadow-panel backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/65 dark:shadow-glow">
      <p className="text-sm uppercase tracking-[0.22em] text-signal dark:text-cyan-300">Chart</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Score breakdown</h2>
      <div className="mt-6 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.18} />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="value" fill="#06b6d4" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ScoreBreakdownChart;
