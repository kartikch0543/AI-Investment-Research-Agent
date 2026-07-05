function getMockCompanyProfile(companyName) {
  return {
    name: companyName,
    sector: "Technology",
    industry: "Platform and Software",
    marketPosition: "leader",
    businessModel: `${companyName} generates revenue through products, services, and ecosystem expansion.`
  };
}

function getMockFinancialData(companyName) {
  const presets = {
    Tesla: { revenueGrowthPct: 18, operatingMarginPct: 11, debtToEquity: 0.18 },
    Apple: { revenueGrowthPct: 9, operatingMarginPct: 30, debtToEquity: 1.45 },
    NVIDIA: { revenueGrowthPct: 35, operatingMarginPct: 42, debtToEquity: 0.32 },
    Microsoft: { revenueGrowthPct: 14, operatingMarginPct: 44, debtToEquity: 0.4 }
  };

  return {
    companyName,
    revenueGrowthPct: 12,
    operatingMarginPct: 24,
    debtToEquity: 0.65,
    ...(presets[companyName] || {})
  };
}

function getMockNews(companyName) {
  return [
    {
      headline: `${companyName} expands product ecosystem with new enterprise partnerships`,
      tone: "positive",
      source: "Mock Financial Daily"
    },
    {
      headline: `Analysts debate valuation premium for ${companyName}`,
      tone: "neutral",
      source: "Mock Markets Journal"
    },
    {
      headline: `${companyName} faces rising competition in key segments`,
      tone: "negative",
      source: "Mock Business Wire"
    }
  ];
}

module.exports = {
  getMockCompanyProfile,
  getMockFinancialData,
  getMockNews
};
