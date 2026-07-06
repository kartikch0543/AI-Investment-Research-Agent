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

    return {
      description: risk,
      probability,
      impact,
      mitigation,
      probClass: getBadgeStyle(probability),
      impClass: getBadgeStyle(impact)
    };
  });
}

function RiskMatrixTable({ result }) {
  const matrix = getRiskMatrix(result.risks || []);

  return (
    <GlassPanel className="animate-fade-in-up">
      <div className="border-b border-[var(--border-color)] pb-3.5 mb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Threat Assessment</p>
        <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">Risk Matrix & Mitigations</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-color)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              <th className="py-2.5 pb-3">Risk Factor</th>
              <th className="py-2.5 pb-3 px-3">Probability</th>
              <th className="py-2.5 pb-3 px-3">Impact</th>
              <th className="py-2.5 pb-3">Mitigation / Safeguards</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]/60 text-xs">
            {matrix.map((row, i) => (
              <tr key={i} className="hover:bg-[var(--bg-secondary)]/30 transition-all">
                <td className="py-3.5 pr-4 font-medium text-[var(--text-primary)] leading-normal max-w-xs">
                  {row.description}
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span className={`inline-flex rounded-lg border px-2 py-0.5 text-[9px] font-bold tracking-wide ${row.probClass}`}>
                    {row.probability}
                  </span>
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span className={`inline-flex rounded-lg border px-2 py-0.5 text-[9px] font-bold tracking-wide ${row.impClass}`}>
                    {row.impact}
                  </span>
                </td>
                <td className="py-3.5 text-[var(--text-secondary)] leading-relaxed">
                  {row.mitigation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  );
}

export default RiskMatrixTable;
