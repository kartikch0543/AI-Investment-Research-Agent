const { runStructuredPrompt } = require("./shared/runStructuredPrompt");
const { buildMoatPrompt } = require("../prompts/moatPrompt");

function buildFallbackMoatAnalysis(state) {
  const hasBrandAdvantage = state.companyProfile.marketPosition === "leader";

  return {
    score: hasBrandAdvantage ? 78 : 62,
    strengths: [
      "Brand and scale improve customer trust",
      "Operational footprint supports resilience"
    ],
    weaknesses: [
      "Moat durability depends on continued execution"
    ],
    summary: `${state.companyName} appears to have a credible competitive position with some durability.`
  };
}

async function runMoatAgent(state) {
  const prompt = buildMoatPrompt(state);
  const fallback = buildFallbackMoatAnalysis(state);

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

module.exports = { runMoatAgent };
