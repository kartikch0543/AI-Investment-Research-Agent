import GlassPanel from "./ui/GlassPanel";

const SWOT_FALLBACKS = {
  APPLE: {
    opportunities: [
      "Expansion of Apple Intelligence services globally",
      "Further penetration into healthcare tech and high-margin services",
      "Adoption of AR/VR computing platforms like Vision Pro"
    ],
    threats: [
      "Regulatory scrutiny on App Store fees and search agreements",
      "Supply chain dependency on East Asian manufacturing partners",
      "Declining hardware upgrade frequency among core consumers"
    ]
  },
  AAPL: {
    opportunities: [
      "Expansion of Apple Intelligence services globally",
      "Further penetration into healthcare tech and high-margin services",
      "Adoption of AR/VR computing platforms like Vision Pro"
    ],
    threats: [
      "Regulatory scrutiny on App Store fees and search agreements",
      "Supply chain dependency on East Asian manufacturing partners",
      "Declining hardware upgrade frequency among core consumers"
    ]
  },
  TESLA: {
    opportunities: [
      "Autonomous FSD taxi networks and service licensing",
      "Megapack grid battery deployment expansions globally",
      "Next-generation low-cost compact electric vehicle scale"
    ],
    threats: [
      "Margin pressure from cheaper foreign electric car makers",
      "Slowing global EV adoption curves and charging infrastructure blocks",
      "Regulatory oversight on driver assistance features"
    ]
  },
  TSLA: {
    opportunities: [
      "Autonomous FSD taxi networks and service licensing",
      "Megapack grid battery deployment expansions globally",
      "Next-generation low-cost compact electric vehicle scale"
    ],
    threats: [
      "Margin pressure from cheaper foreign electric car makers",
      "Slowing global EV adoption curves and charging infrastructure blocks",
      "Regulatory oversight on driver assistance features"
    ]
  },
  TATA: {
    opportunities: [
      "E-commerce super-app scaling across domestic markets",
      "Green energy vehicle transit contracts and battery plants",
      "Strategic defense and electronics localization partnerships"
    ],
    threats: [
      "Exchange rate volatility affecting overseas holdings",
      "Increasing domestic competition in premium retail & tech segments",
      "Geopolitical risks on trade supply lines"
    ]
  }
};

function getSwotItems(companyName, rawStrengths, rawWeaknesses) {
  const normalized = (companyName || "").trim().toUpperCase();
  const preset = SWOT_FALLBACKS[normalized] || {
    opportunities: [
      `Expansion of ${companyName}'s product line into adjacent high-margin spaces`,
      "Strategic partnership network development to lower acquisition costs",
      "Deployment of advanced AI automation solutions to enhance efficiency"
    ],
    threats: [
      "Intensifying competitive pressures from lower-cost market entrants",
      "Regulatory constraints and data privacy compliance overhauls",
      "Talent acquisition costs and operational inflation impacts"
    ]
  };

  // Build clean arrays
  const strengths = (rawStrengths && rawStrengths.length > 0) 
    ? rawStrengths.slice(0, 4) 
    : ["Highly recognized brand and strong customer loyalty", "Robust balance sheet with positive free cash flow", "Experienced senior leadership team with clear strategic vision"];
  
  const weaknesses = (rawWeaknesses && rawWeaknesses.length > 0) 
    ? rawWeaknesses.slice(0, 4) 
    : ["High dependence on main product line revenues", "Increasing operating expenses and R&D budgets", "Complex supply chain dependencies"];

  return {
    strengths,
    weaknesses,
    opportunities: preset.opportunities,
    threats: preset.threats
  };
}

function SwotAnalysis({ result }) {
  // Combine general strengths & weaknesses from financials & moat
  const rawStrengths = [
    ...(result.strengths || []),
    ...(result.financialSummary?.strengths || []),
    ...(result.moat?.strengths || [])
  ];

  const rawWeaknesses = [
    ...(result.weaknesses || []),
    ...(result.financialSummary?.weaknesses || []),
    ...(result.moat?.weaknesses || [])
  ];

  const uniqueStrengths = [...new Set(rawStrengths)].filter(Boolean);
  const uniqueWeaknesses = [...new Set(rawWeaknesses)].filter(Boolean);

  const swot = getSwotItems(result.companyName, uniqueStrengths, uniqueWeaknesses);

  const quadrants = [
    {
      title: "Strengths",
      subtitle: "Internal Advantages",
      items: swot.strengths,
      bg: "bg-emerald-500/5 hover:bg-emerald-500/10",
      border: "border-emerald-500/15 hover:border-emerald-500/30",
      text: "text-emerald-500",
      bulletColor: "bg-emerald-500"
    },
    {
      title: "Weaknesses",
      subtitle: "Internal Constraints",
      items: swot.weaknesses,
      bg: "bg-rose-500/5 hover:bg-rose-500/10",
      border: "border-rose-500/15 hover:border-rose-500/30",
      text: "text-rose-500",
      bulletColor: "bg-rose-500"
    },
    {
      title: "Opportunities",
      subtitle: "External Growth Pathways",
      items: swot.opportunities,
      bg: "bg-blue-500/5 hover:bg-blue-500/10",
      border: "border-blue-500/15 hover:border-blue-500/30",
      text: "text-blue-500",
      bulletColor: "bg-blue-500"
    },
    {
      title: "Threats",
      subtitle: "External Risk Factors",
      items: swot.threats,
      bg: "bg-amber-500/5 hover:bg-amber-500/10",
      border: "border-amber-500/15 hover:border-amber-500/30",
      text: "text-amber-500",
      bulletColor: "bg-amber-500"
    }
  ];

  return (
    <GlassPanel className="animate-fade-in-up">
      <div className="border-b border-[var(--border-color)] pb-3.5 mb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Strategic Audit</p>
        <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">SWOT Strategic Grid</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {quadrants.map((q) => (
          <div
            key={q.title}
            className={`rounded-2xl border ${q.border} ${q.bg} p-5 transition-all flex flex-col`}
          >
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${q.text}`}>
                {q.subtitle}
              </span>
              <h3 className="mt-1.5 text-base font-bold text-[var(--text-primary)]">
                {q.title}
              </h3>
            </div>
            
            <ul className="mt-4 space-y-2.5 flex-1">
              {q.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                  <span className={`h-1.5 w-1.5 rounded-full ${q.bulletColor} mt-1.5 shrink-0`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

export default SwotAnalysis;
