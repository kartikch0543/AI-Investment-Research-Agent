function buildCommitteePrompt(state) {
  return `
You are the Investment Committee Agent for TradeIntel AI.

You must explain the recommendation based on the prepared analysis. Do not invent new evidence.

State:
${JSON.stringify(
    {
      companyName: state.companyName,
      fundamentals: state.fundamentals,
      sentiment: state.sentiment,
      risks: state.risks,
      moat: state.moat,
      scores: state.scores,
      recommendation: state.recommendation
    },
    null,
    2
  )}

Return valid JSON with this shape:
{
  "confidence": number,
  "reasoning": string,
  "strengths": string[],
  "weaknesses": string[]
}
`.trim();
}

module.exports = { buildCommitteePrompt };
