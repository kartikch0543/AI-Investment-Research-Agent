function buildMoatPrompt(state) {
  return `
You are the Moat Analysis Agent for TradeIntel AI.

Assess the company's competitive advantages using this profile:
${JSON.stringify(state.companyProfile, null, 2)}

Return valid JSON with this shape:
{
  "score": number,
  "strengths": string[],
  "weaknesses": string[],
  "summary": string
}

The score should be from 0 to 100 and reflect business quality and moat durability.
`.trim();
}

module.exports = { buildMoatPrompt };
