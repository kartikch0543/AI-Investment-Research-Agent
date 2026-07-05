const { runStructuredPrompt } = require("./shared/runStructuredPrompt");
const { buildRiskPrompt } = require("../prompts/riskPrompt");

function buildFallbackRiskAnalysis(state) {
  const risks = [
    "Macroeconomic slowdown could reduce demand",
    "Competitive pressure may compress margins"
  ];

  if (state.financialData.debtToEquity > 1) {
    risks.push("Higher leverage may limit flexibility");
  }

  return {
    score: state.financialData.debtToEquity > 1 ? 58 : 42,
    majorRisks: risks,
    mitigations: [
      "Monitor quarterly profitability trends",
      "Track product mix and capital allocation discipline"
    ],
    summary: `${state.companyName} has manageable but real business risks that should stay visible in the final recommendation.`
  };
}

async function runRiskAgent(state) {
  const prompt = buildRiskPrompt(state);
  const fallback = buildFallbackRiskAnalysis(state);

  return runStructuredPrompt({
    prompt,
    fallback,
    shape: {
      score: 0,
      majorRisks: [],
      mitigations: [],
      summary: ""
    }
  });
}

module.exports = { runRiskAgent };
