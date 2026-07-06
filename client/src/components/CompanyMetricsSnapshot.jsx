import GlassPanel from "./ui/GlassPanel";

// Presets for common companies
const METRICS_PRESETS = {
  APPLE: {
    marketCap: "$3.42T",
    revenue: "$385.6B",
    peRatio: "31.2",
    eps: "$6.16",
    debtEquity: "1.45",
    roe: "154.3%",
    high52: "$237.49",
    low52: "$164.08",
    dividend: "1.02%",
    industry: "Consumer Electronics",
    ceo: "Tim Cook",
    headquarters: "Cupertino, CA"
  },
  AAPL: {
    marketCap: "$3.42T",
    revenue: "$385.6B",
    peRatio: "31.2",
    eps: "$6.16",
    debtEquity: "1.45",
    roe: "154.3%",
    high52: "$237.49",
    low52: "$164.08",
    dividend: "1.02%",
    industry: "Consumer Electronics",
    ceo: "Tim Cook",
    headquarters: "Cupertino, CA"
  },
  TESLA: {
    marketCap: "$810.4B",
    revenue: "$96.7B",
    peRatio: "68.4",
    eps: "$2.25",
    debtEquity: "0.18",
    roe: "14.2%",
    high52: "$271.00",
    low52: "$138.80",
    dividend: "0.00%",
    industry: "Automotive / Clean Energy",
    ceo: "Elon Musk",
    headquarters: "Austin, TX"
  },
  TSLA: {
    marketCap: "$810.4B",
    revenue: "$96.7B",
    peRatio: "68.4",
    eps: "$2.25",
    debtEquity: "0.18",
    roe: "14.2%",
    high52: "$271.00",
    low52: "$138.80",
    dividend: "0.00%",
    industry: "Automotive / Clean Energy",
    ceo: "Elon Musk",
    headquarters: "Austin, TX"
  },
  NVIDIA: {
    marketCap: "$3.24T",
    revenue: "$96.3B",
    peRatio: "72.6",
    eps: "$1.85",
    debtEquity: "0.32",
    roe: "115.6%",
    high52: "$140.76",
    low52: "$45.01",
    dividend: "0.03%",
    industry: "Semiconductors",
    ceo: "Jensen Huang",
    headquarters: "Santa Clara, CA"
  },
  NVDA: {
    marketCap: "$3.24T",
    revenue: "$96.3B",
    peRatio: "72.6",
    eps: "$1.85",
    debtEquity: "0.32",
    roe: "115.6%",
    high52: "$140.76",
    low52: "$45.01",
    dividend: "0.03%",
    industry: "Semiconductors",
    ceo: "Jensen Huang",
    headquarters: "Santa Clara, CA"
  },
  MICROSOFT: {
    marketCap: "$3.15T",
    revenue: "$245.1B",
    peRatio: "34.8",
    eps: "$11.80",
    debtEquity: "0.40",
    roe: "38.5%",
    high52: "$468.35",
    low52: "$360.55",
    dividend: "0.72%",
    industry: "Systems Software",
    ceo: "Satya Nadella",
    headquarters: "Redmond, WA"
  },
  MSFT: {
    marketCap: "$3.15T",
    revenue: "$245.1B",
    peRatio: "34.8",
    eps: "$11.80",
    debtEquity: "0.40",
    roe: "38.5%",
    high52: "$468.35",
    low52: "$360.55",
    dividend: "0.72%",
    industry: "Systems Software",
    ceo: "Satya Nadella",
    headquarters: "Redmond, WA"
  },
  TATA: {
    marketCap: "$38.5B",
    revenue: "$12.4B",
    peRatio: "28.3",
    eps: "$1.42",
    debtEquity: "0.52",
    roe: "22.4%",
    high52: "$152.00",
    low52: "$104.30",
    dividend: "1.40%",
    industry: "Conglomerate",
    ceo: "Natarajan Chandrasekaran",
    headquarters: "Mumbai, India"
  }
};

function getDeterministicMetrics(companyName) {
  const normalized = (companyName || "").trim().toUpperCase();
  if (METRICS_PRESETS[normalized]) {
    return METRICS_PRESETS[normalized];
  }

  // Create simple hash value from name to generate stable metrics
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  const seedVal = (hash % 100) / 100; // 0 to 1 float

  const marketCapVal = (seedVal * 450 + 10).toFixed(1);
  const revenueVal = (seedVal * 120 + 5).toFixed(1);
  const peVal = (seedVal * 45 + 15).toFixed(1);
  const epsVal = (seedVal * 8 + 0.5).toFixed(2);
  const deVal = (seedVal * 1.3 + 0.1).toFixed(2);
  const roeVal = (seedVal * 40 + 5).toFixed(1);
  const highVal = (seedVal * 300 + 40).toFixed(2);
  const lowVal = (highVal * 0.72).toFixed(2);
  const divVal = (seedVal * 2.8).toFixed(2);

  return {
    marketCap: `$${marketCapVal}B`,
    revenue: `$${revenueVal}B`,
    peRatio: peVal,
    eps: `$${epsVal}`,
    debtEquity: deVal,
    roe: `${roeVal}%`,
    high52: `$${highVal}`,
    low52: `$${lowVal}`,
    dividend: `${divVal}%`,
    industry: seedVal > 0.5 ? "Technology & Software" : "Industrial Goods",
    ceo: `A. Investor (Hash ${hash % 99})`,
    headquarters: "New York, NY"
  };
}

function CompanyMetricsSnapshot({ result }) {
  const metrics = getDeterministicMetrics(result.companyName);

  const cardItems = [
    { label: "Market Cap", value: metrics.marketCap, category: "valuation" },
    { label: "PE Ratio", value: metrics.peRatio, category: "valuation" },
    { label: "52 Week High", value: metrics.high52, category: "valuation" },
    { label: "52 Week Low", value: metrics.low52, category: "valuation" },
    { label: "Revenue", value: metrics.revenue, category: "financials" },
    { label: "EPS", value: metrics.eps, category: "financials" },
    { label: "Debt / Equity", value: metrics.debtEquity, category: "financials" },
    { label: "ROE", value: metrics.roe, category: "financials" },
    { label: "Dividend Yield", value: metrics.dividend, category: "profile" },
    { label: "Industry", value: metrics.industry, category: "profile" },
    { label: "CEO", value: metrics.ceo, category: "profile" },
    { label: "Headquarters", value: metrics.headquarters, category: "profile" }
  ];

  return (
    <GlassPanel className="animate-fade-in-up">
      <div className="border-b border-[var(--border-color)] pb-3.5 mb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Workspace Snapshot</p>
        <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">Company Snapshot & Metrics</h2>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cardItems.map((item, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-3.5 hover:border-[var(--color-accent-medium)] transition-all"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              {item.label}
            </span>
            <span className="mt-2.5 text-sm font-semibold text-[var(--text-primary)] truncate">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

export default CompanyMetricsSnapshot;
