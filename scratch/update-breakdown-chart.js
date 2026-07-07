const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'client', 'src', 'charts', 'ScoreBreakdownChart.jsx');

const code = `import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell
} from "recharts";
import GlassPanel from "../components/ui/GlassPanel";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    const getColor = (v) => {
      if (v >= 70) return "text-[var(--color-buy)]";
      if (v >= 50) return "text-[var(--color-watchlist)]";
      return "text-[var(--color-avoid)]";
    };
    return (
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 shadow-md">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
          {payload[0].payload.name}
        </p>
        <p className={"text-lg font-extrabold mt-0.5 tabular-nums " + getColor(val)}>
          {val}
          <span className="text-xs font-normal text-[var(--text-muted)] ml-1">/ 100</span>
        </p>
      </div>
    );
  }
  return null;
};

function ScoreBreakdownChart({ scoreBreakdown }) {
  const data = [
    { name: "Financial Health", value: scoreBreakdown.financialHealth, color: "#10B981" },
    { name: "News Sentiment", value: scoreBreakdown.newsSentiment, color: "#3B82F6" },
    { name: "Competitive Moat", value: scoreBreakdown.businessQuality, color: "#8B5CF6" },
    { name: "Risk Profile", value: scoreBreakdown.riskAdjusted, color: "#F59E0B" }
  ];

  const average = Math.round(data.reduce((s, d) => s + d.value, 0) / data.length);

  return (
    <GlassPanel>
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Pipeline Analytics</p>
          <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">Score Breakdown</h2>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Average Score</p>
          <p className="text-xl font-bold text-[var(--color-accent)] tabular-nums">{average}<span className="text-xs text-[var(--text-muted)]">/100</span></p>
        </div>
      </div>

      <div className="h-[220px] w-full pr-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
            barCategoryGap="28%"
          >
            <CartesianGrid stroke="var(--border-color)" strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 100]}
              stroke="var(--text-muted)"
              fontSize={10}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="var(--text-secondary)"
              fontSize={10}
              fontWeight={700}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--bg-secondary)", opacity: 0.4 }} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={16}>
              {data.map((entry, index) => (
                <Cell key={"cell-" + index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {data.map(d => {
          const getBg = (v) => {
            if (v >= 70) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            if (v >= 50) return "bg-amber-500/10 text-amber-500 border-amber-500/20";
            return "bg-rose-500/10 text-rose-500 border-rose-500/20";
          };
          return (
            <div key={d.name} className={"text-center rounded-xl border p-2 " + getBg(d.value)}>
              <p className="text-base font-extrabold tabular-nums leading-none">{d.value}</p>
              <p className="text-[8px] font-bold uppercase tracking-wider mt-1 text-[var(--text-secondary)]">{d.name.split(" ")[0]}</p>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}

export default ScoreBreakdownChart;
`;

fs.writeFileSync(targetPath, code, 'utf8');
console.log("Rewrote ScoreBreakdownChart.jsx successfully.");
