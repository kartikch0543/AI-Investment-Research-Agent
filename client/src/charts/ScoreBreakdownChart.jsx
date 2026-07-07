import React, { useState } from "react";
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
    const name = payload[0].payload.name;
    
    const getStatusText = (v) => {
      if (v >= 85) return { text: "Exceptional Strength", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
      if (v >= 70) return { text: "Robust / Healthy", color: "text-green-500 bg-green-500/10 border-green-500/20" };
      if (v >= 55) return { text: "Watch Factor", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
      return { text: "High Concern", color: "text-rose-500 bg-rose-500/10 border-rose-500/20" };
    };

    const status = getStatusText(val);

    return (
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3 shadow-xl backdrop-blur-md animate-scale-in">
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--text-muted)]">
          {name}
        </p>
        <p className="text-lg font-black mt-1 tabular-nums text-[var(--text-primary)]">
          {val}
          <span className="text-xs font-semibold text-[var(--text-muted)] ml-1">/ 100</span>
        </p>
        <span className={`inline-block mt-2 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${status.color}`}>
          {status.text}
        </span>
      </div>
    );
  }
  return null;
};

function ScoreBreakdownChart({ scoreBreakdown }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const data = [
    { name: "Financial Health", value: scoreBreakdown.financialHealth, color: "#10B981", gradId: "finHealthGrad" },
    { name: "News Sentiment", value: scoreBreakdown.newsSentiment, color: "#3B82F6", gradId: "newsSentGrad" },
    { name: "Competitive Moat", value: scoreBreakdown.businessQuality, color: "#8B5CF6", gradId: "compMoatGrad" },
    { name: "Risk Profile", value: scoreBreakdown.riskAdjusted, color: "#F59E0B", gradId: "riskProfileGrad" }
  ];

  const average = Math.round(data.reduce((s, d) => s + d.value, 0) / data.length);

  const getAnalystOpinion = (avg) => {
    if (avg >= 75) return "Strong investment consensus. Fundamentals and market moat show premium strength.";
    if (avg >= 60) return "Reasonable thesis profile. Moderate risks are present, but fundamentals remain supportive.";
    return "Caution suggested. Elevated risk profiles or low news sentiment demand additional diligence.";
  };

  return (
    <GlassPanel className="relative overflow-hidden h-full flex flex-col justify-between p-5">
      <div>
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3.5 mb-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-accent)]">Rating Analysis</p>
            <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">Agent Score Breakdown</h2>
          </div>
          <div className="text-right shrink-0 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-2.5 py-1">
            <p className="text-[8px] text-[var(--text-muted)] uppercase tracking-wider font-extrabold">Average Consensus</p>
            <p className="text-base font-black text-[var(--color-accent)] tabular-nums">
              {average}<span className="text-xs text-[var(--text-muted)] font-bold">/100</span>
            </p>
          </div>
        </div>

        {/* Recharts single vertical bar chart */}
        <div className="h-[210px] w-full pr-2 relative mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
              barCategoryGap="28%"
              onMouseMove={(state) => {
                if (state.activeTooltipIndex !== undefined) {
                  setHoveredIdx(state.activeTooltipIndex);
                } else {
                  setHoveredIdx(null);
                }
              }}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <defs>
                <linearGradient id="finHealthGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="newsSentGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="compMoatGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="riskProfileGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity={1} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="var(--border-color)" strokeDasharray="3 3" horizontal={false} opacity={0.4} />
              
              <XAxis
                type="number"
                domain={[0, 100]}
                stroke="var(--text-secondary)"
                fontSize={9}
                fontWeight={700}
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
                width={130} // Wide width so text labels never wrap awkwardy
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: "var(--bg-secondary)", opacity: 0.18 }}
                allowEscapeViewBox={{ x: true, y: true }}
              />
              <Bar 
                dataKey="value" 
                radius={[0, 8, 8, 0]} 
                maxBarSize={16}
              >
                {data.map((entry, index) => {
                  const isHovered = hoveredIdx === index;
                  const activeOpacity = hoveredIdx === null ? 1 : isHovered ? 1 : 0.45;
                  return (
                    <Cell 
                      key={"cell-" + index} 
                      fill={`url(#${entry.gradId})`}
                      stroke={entry.color}
                      strokeWidth={1.5}
                      opacity={activeOpacity}
                      style={{ transition: "opacity 0.2s ease" }}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Humanized Analyst Perspective */}
      <div className="mt-4 pt-3.5 border-t border-[var(--border-color)]/60 bg-[var(--bg-secondary)]/30 rounded-xl p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <p className="text-[9px] font-extrabold uppercase tracking-widest text-[var(--color-accent)]">Analyst Perspective</p>
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic font-medium">
          "{getAnalystOpinion(average)}"
        </p>
      </div>
    </GlassPanel>
  );
}

export default ScoreBreakdownChart;
