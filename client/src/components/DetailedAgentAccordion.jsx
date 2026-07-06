import { useState } from "react";
import GlassPanel from "./ui/GlassPanel";

function DetailedAgentAccordion({ result }) {
  const [openIndex, setOpenIndex] = useState(null);

  const agents = [
    {
      name: "Market Intelligence Agent",
      role: "Company Profile & Sector Analysis",
      icon: "🔍",
      time: "2.1s",
      confidence: "95%",
      sources: ["Mock company profile dataset", "SEC Filing Index"],
      summary: `${result.companyName} operates as a prominent player in the global technology ecosystem, leveraging products, services, and continuous software platform expansion to build scale.`,
      evidence: [
        "Identified market cap segment size configurations",
        "Confirmed current sector and industry group classification",
        "Validated listing profile data and operational headquarters location"
      ]
    },
    {
      name: "Financial Analysis Agent",
      role: "Fundamental Ratios & Profitability Audit",
      icon: "📊",
      time: "3.4s",
      confidence: "92%",
      sources: ["Mock financial dataset", "Quarterly Income Statement"],
      summary: result.financialSummary?.summary || "Stable fundamentals with robust operating margins and reasonable debt configurations.",
      evidence: result.financialSummary?.strengths || ["Stable profitability margins", "Sound liquidity management"]
    },
    {
      name: "News Sentiment Agent",
      role: "Media Tone & News Flow Analysis",
      icon: "📰",
      time: "1.8s",
      confidence: "88%",
      sources: ["Mock news dataset", "Financial Press Wire Feed"],
      summary: result.sentiment?.summary || "Mixed sentiment surrounding recent product updates balanced by market volatility.",
      evidence: result.sentiment?.positiveDrivers || ["Favorable sentiment on expansion efforts"]
    },
    {
      name: "Business Risk Agent",
      role: "Threat & Regulatory Compliance Audit",
      icon: "⚠️",
      time: "2.7s",
      confidence: "90%",
      sources: ["Company Risk Disclosures", "Federal Regulatory Archive"],
      summary: "Assessed key threat factors including industry competitors, valuation premiums, and supply chain concentration.",
      evidence: result.risks || ["No major risks found"]
    },
    {
      name: "Competitive Moat Agent",
      role: "Ecosystem cost advantage & barrier audit",
      icon: "🏰",
      time: "2.0s",
      confidence: "94%",
      sources: ["Ecosystem Moat Matrix", "Patents & Trademark Index"],
      summary: result.moat?.summary || "Ecosystem locking provides an excellent moat protecting core margins.",
      evidence: result.moat?.strengths || ["Excellent brand equity", "Ecosystem lock-in advantages"]
    },
    {
      name: "Investment Committee Agent",
      role: "Consensus Orchestrator & Final Recommendation",
      icon: "🤝",
      time: "1.4s",
      confidence: `${result.confidence || 82}%`,
      sources: ["All Pipeline Agent Logs", "Scoring Weight Configurator"],
      summary: result.reasoning || "Hold and monitor performance.",
      evidence: [
        `Generated recommendation signal: ${result.decision || 'WATCHLIST'}`,
        `Assessed overall metric score of ${result.overallScore || 71}/100`,
        `Orchestrated consensus weight parameters successfully`
      ]
    }
  ];

  return (
    <GlassPanel className="animate-fade-in-up">
      <div className="border-b border-[var(--border-color)] pb-3.5 mb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Pipeline Deep Dive</p>
        <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">Detailed Agent Reports</h2>
      </div>

      <div className="space-y-3">
        {agents.map((agent, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={agent.name}
              className="border border-[var(--border-color)] rounded-xl overflow-hidden bg-[var(--bg-secondary)]/30"
            >
              {/* Accordion Trigger */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-[var(--bg-secondary)] hover:bg-[var(--border-color)]/20 transition-all text-left"
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base leading-none">{agent.icon}</span>
                  <div>
                    <h3 className="text-xs font-semibold text-[var(--text-primary)]">{agent.name}</h3>
                    <p className="text-[10px] text-[var(--text-muted)] font-medium mt-0.5">{agent.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-accent)] px-2 py-0.5 rounded-lg bg-[var(--color-accent-light)] border border-[var(--color-accent-medium)]">
                    {agent.time}
                  </span>
                  <svg
                    className={`h-4 w-4 text-[var(--text-muted)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-4 py-4 border-t border-[var(--border-color)] space-y-4 bg-[var(--bg-surface)] animate-fade-in-up">
                  {/* Summary */}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Executive Summary</p>
                    <p className="text-xs leading-relaxed text-[var(--text-primary)]">{agent.summary}</p>
                  </div>

                  {/* Evidence & Findings */}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Evidence & Key Findings</p>
                    <ul className="space-y-1.5">
                      {agent.evidence.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                          <span className="text-[var(--color-accent)] font-bold mt-0.5 shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-3 border-t border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[10px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-[var(--text-muted)] uppercase tracking-wider">Sources Used:</span>
                      {agent.sources.map((s, idx) => (
                        <span key={idx} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] px-2 py-0.5 rounded text-[9px] text-[var(--text-secondary)] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-bold text-[var(--text-muted)] uppercase tracking-wider">Confidence Score:</span>
                      <span className="font-bold text-emerald-500 font-mono">{agent.confidence}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}

export default DetailedAgentAccordion;
