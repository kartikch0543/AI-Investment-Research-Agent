const { runStructuredPrompt } = require("./shared/runStructuredPrompt");
const { buildFundamentalPrompt } = require("../prompts/fundamentalPrompt");

function buildFallbackFundamentalAnalysis(state) {
  const revenueGrowth = state.financialData.revenueGrowthPct;
  const operatingMargin = state.financialData.operatingMarginPct;
  const debtToEquity = state.financialData.debtToEquity;

  let score = 50;

  if (revenueGrowth >= 15) score += 15;
  if (operatingMargin >= 20) score += 20;
  if (debtToEquity <= 1) score += 10;

  return {
    score: Math.min(score, 95),
    strengths: [
      "Revenue growth remains healthy",
      "Operating margin suggests solid execution"
    ],
    weaknesses: debtToEquity > 1 ? ["Leverage needs monitoring"] : [],
    summary: `${state.companyName} shows stable core business performance with reasonable profitability.`
  };
}

async function runFundamentalAgent(state) {
  const prompt = buildFundamentalPrompt(state);
  const fallback = buildFallbackFundamentalAnalysis(state);

  return runStructuredPrompt({
    prompt,
    fallback,
    shape: {
      score: 0,
      strengths: [],
      weaknesses: [],
      summary: ""
    }
  });
}

module.exports = { runFundamentalAgent };
