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
    <section className="rounded-3xl bg-white p-8 shadow-panel">
      <p className="text-sm uppercase tracking-[0.22em] text-signal">Chart</p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">Score breakdown</h2>
      <div className="mt-6 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
            <XAxis dataKey="name" stroke="#475569" />
            <YAxis stroke="#475569" domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="value" fill="#0f766e" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ScoreBreakdownChart;
