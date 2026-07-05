const { runStructuredPrompt } = require("./shared/runStructuredPrompt");
const { buildCommitteePrompt } = require("../prompts/committeePrompt");

function buildFallbackCommittee(state) {
  return {
    confidence: state.scores.overallScore >= 75 ? 82 : 68,
    reasoning: `${state.companyName} received a ${state.recommendation} recommendation because fundamentals, sentiment, moat quality, and risk were synthesized into a balanced score.`,
    strengths: [
      ...state.fundamentals.strengths,
      ...state.moat.strengths
    ].slice(0, 4),
    weaknesses: [
      ...state.fundamentals.weaknesses,
      ...state.moat.weaknesses
    ].slice(0, 4)
  };
}

async function runInvestmentCommitteeAgent(state) {
  const prompt = buildCommitteePrompt(state);
  const fallback = buildFallbackCommittee(state);

  return runStructuredPrompt({
    prompt,
    fallback,
    shape: {
      confidence: 0,
      reasoning: "",
      strengths: [],
      weaknesses: []
    }
  });
}

module.exports = { runInvestmentCommitteeAgent };
