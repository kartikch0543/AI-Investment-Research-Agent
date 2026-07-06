import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import GlassPanel from "../components/ui/GlassPanel";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    function getColor(v) {
      if (v >= 70) return "text-[var(--color-buy)]";
      if (v >= 40) return "text-[var(--color-watchlist)]";
      return "text-[var(--color-avoid)]";
    }
    return (
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 shadow-md">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
          {payload[0].payload.name}
        </p>
        <p className={`text-xl font-bold mt-0.5 tabular-nums ${getColor(val)}`}>
          {val}
          <span className="text-xs font-normal text-[var(--text-muted)] ml-1">/ 100</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomAngleTick = ({ x, y, payload }) => {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fill="var(--text-secondary)"
      fontSize={10}
      fontWeight={600}
      fontFamily="'Geist', 'Inter', sans-serif"
    >
      {payload.value}
    </text>
  );
};

function ScoreBreakdownChart({ scoreBreakdown }) {
  const data = [
    { name: "Financial", value: scoreBreakdown.financialHealth },
    { name: "Sentiment", value: scoreBreakdown.newsSentiment },
    { name: "Moat", value: scoreBreakdown.businessQuality },
    { name: "Risk Adj.", value: scoreBreakdown.riskAdjusted }
  ];

  const average = Math.round(data.reduce((s, d) => s + d.value, 0) / data.length);

  return (
    <GlassPanel>
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Analysis</p>
          <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">Score Breakdown</h2>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Average</p>
          <p className="text-xl font-bold text-[var(--color-accent)] tabular-nums">{average}</p>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
            <defs>
              <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.12} />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <PolarGrid
              stroke="var(--border-color)"
              strokeOpacity={0.8}
            />
            <PolarAngleAxis
              dataKey="name"
              tick={<CustomAngleTick />}
              tickLine={false}
              axisLine={false}
            />
            <Radar
              dataKey="value"
              stroke="var(--color-accent)"
              strokeWidth={1.5}
              fill="url(#radarFill)"
              dot={{ fill: "var(--color-accent)", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: "var(--color-accent)", stroke: "var(--bg-surface)", strokeWidth: 1.5 }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Score tiles */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {data.map(d => {
          function getColor(v) {
            if (v >= 70) return "text-[var(--color-buy)]";
            if (v >= 40) return "text-[var(--color-watchlist)]";
            return "text-[var(--color-avoid)]";
          }
          return (
            <div key={d.name} className="text-center rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-2">
              <p className={`text-base font-bold tabular-nums ${getColor(d.value)}`}>{d.value}</p>
              <p className="text-[9px] text-[var(--text-muted)] font-semibold uppercase tracking-wide mt-0.5">{d.name}</p>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}

export default ScoreBreakdownChart;
