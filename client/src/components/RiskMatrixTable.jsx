import React from "react";
import GlassPanel from "./ui/GlassPanel";

function getRiskMatrix(risks) {
  const defaultRisks = [
    "Competitive pressures in core product segments",
    "High valuation multiples premium constraints",
    "Supply chain concentration constraints"
  ];
  const list = risks && risks.length > 0 ? risks : defaultRisks;

  return list.map((risk, idx) => {
    let probability = "Medium";
    let impact = "Medium";
    let mitigation = "Diversify capital allocation and implement trailing stop-losses.";

    const text = risk.toLowerCase();

    if (text.includes("competition") || text.includes("competitor") || text.includes("market share")) {
      probability = "High";
      impact = "Medium";
      mitigation = "Monitor operating margins, pricing power metrics, and market share trends quarterly.";
    } else if (text.includes("valuation") || text.includes("premium") || text.includes("multiple")) {
      probability = "Medium";
      impact = "High";
      mitigation = "Dollar-cost average into position; apply higher margin of safety in discounted cash flows.";
    } else if (text.includes("supply") || text.includes("concentration") || text.includes("geopolit")) {
      probability = "Medium";
      impact = "High";
      mitigation = "Track geographic production diversification efforts and inventory turnover ratios.";
    } else if (text.includes("macro") || text.includes("interest") || text.includes("inflation")) {
      probability = "High";
      impact = "High";
      mitigation = "Maintain cash reserves; favor capital-light business models with strong pricing leverage.";
    }

    // Color maps
    const getBadgeStyle = (val) => {
      if (val === "High") return "bg-rose-500/10 text-rose-500 border-rose-500/15";
      if (val === "Medium") return "bg-amber-500/10 text-amber-500 border-amber-500/15";
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/15";
    };

    const getSeverityBorder = () => {
      if (probability === "High" && impact === "High") return "border-l-rose-500";
      if (probability === "High" || impact === "High") return "border-l-amber-500";
      return "border-l-blue-500";
    };

    return {
      description: risk,
      probability,
      impact,
      mitigation,
      probClass: getBadgeStyle(probability),
      impClass: getBadgeStyle(impact),
      severityBorder: getSeverityBorder()
    };
  });
}

function RiskMatrixTable({ result }) {
  const matrix = getRiskMatrix(result.risks || []);

  return (
    <GlassPanel className="animate-fade-in-up flex flex-col justify-between h-full">
      <div>
        <div className="border-b border-[var(--border-color)] pb-3.5 mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Threat Assessment</p>
            <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">Risk Profile & Safeguards</h2>
          </div>
          <span className="text-[9px] bg-rose-500/10 text-rose-500 border border-rose-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Risk Audit
          </span>
        </div>

        {/* List of custom interactive cards */}
        <div className="space-y-4">
          {matrix.slice(0, 3).map((row, i) => (
            <div 
              key={i} 
              className={`rounded-xl border border-[var(--border-color)] border-l-4 ${row.severityBorder} bg-[var(--bg-secondary)]/20 p-3.5 hover:border-[var(--border-color-strong)] transition-all duration-200`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <p className="text-xs font-bold text-[var(--text-primary)] leading-normal max-w-[70%]">
                  {row.description}
                </p>
                <div className="flex gap-1.5">
                  <span className={`rounded-lg border px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wide ${row.probClass}`}>
                    P: {row.probability}
                  </span>
                  <span className={`rounded-lg border px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wide ${row.impClass}`}>
                    I: {row.impact}
                  </span>
                </div>
              </div>
              
              {/* Mitigation detail block */}
              <div className="bg-[var(--bg-secondary)]/50 rounded-lg p-2 mt-2.5 flex items-start gap-2 border border-[var(--border-color)]/40">
                <svg className="h-3.5 w-3.5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed font-semibold">
                  <strong className="text-[var(--text-primary)] font-bold">Mitigation: </strong> 
                  {row.mitigation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border-color)]/60 text-center">
        <p className="text-[10px] text-[var(--text-muted)] font-semibold">
          *Recommended hedges formulated based on multi-agent corporate defense audits.
        </p>
      </div>
    </GlassPanel>
  );
}

export default RiskMatrixTable;
