import GlassPanel from "./ui/GlassPanel";

function getInvestmentThesis(companyName, reasoning) {
  // Construct nice bull/bear points from reasoning or defaults
  const normalized = (companyName || "").toLowerCase();
  
  return {
    bullCase: [
      `Sustained expansion of ${companyName}'s high-margin digital ecosystem.`,
      "Healthy operating cash flows providing flexible capital allocation.",
      "Clear competitive advantages (moat) protecting core profitability."
    ],
    bearCase: [
      `Multiple compression risks if growth rates slow down.`,
      "Vulnerability to rapid technological shifts or low-cost competitors.",
      "Regulatory scrutiny regarding customer lock-in and antitrust."
    ],
    catalysts: [
      "Accelerated adoption of enterprise subscription services.",
      "Margin improvements visible in upcoming quarterly earnings statements.",
      "Launch of key products opening up new target demographics."
    ],
    redFlags: [
      "Deterioration of operating margins below historical averages.",
      "Significant increase in debt load or leverage ratios.",
      "Executive suite departures or changes in core roadmap execution."
    ]
  };
}

function InvestmentThesisPanel({ result }) {
  const thesis = getInvestmentThesis(result.companyName, result.reasoning);

  return (
    <GlassPanel className="animate-fade-in-up">
      <div className="border-b border-[var(--border-color)] pb-3.5 mb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Thesis Board</p>
        <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">Investment Thesis & Drivers</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Bull & Bear */}
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
            <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2.5">🟢 Bull Case</h3>
            <ul className="space-y-2">
              {thesis.bullCase.map((item, i) => (
                <li key={i} className="text-xs text-[var(--text-secondary)] leading-relaxed flex items-start gap-2">
                  <span className="text-emerald-500 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-rose-500/10 bg-rose-500/5 p-4">
            <h3 className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-2.5">🔴 Bear Case</h3>
            <ul className="space-y-2">
              {thesis.bearCase.map((item, i) => (
                <li key={i} className="text-xs text-[var(--text-secondary)] leading-relaxed flex items-start gap-2">
                  <span className="text-rose-500 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Catalysts & Red Flags */}
        <div className="space-y-4">
          <div className="rounded-xl border border-blue-500/10 bg-blue-500/5 p-4">
            <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2.5">⚡ Core Catalysts</h3>
            <ul className="space-y-2">
              {thesis.catalysts.map((item, i) => (
                <li key={i} className="text-xs text-[var(--text-secondary)] leading-relaxed flex items-start gap-2">
                  <span className="text-blue-500 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-4">
            <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2.5">⚠️ Red Flags</h3>
            <ul className="space-y-2">
              {thesis.redFlags.map((item, i) => (
                <li key={i} className="text-xs text-[var(--text-secondary)] leading-relaxed flex items-start gap-2">
                  <span className="text-amber-500 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

export default InvestmentThesisPanel;
