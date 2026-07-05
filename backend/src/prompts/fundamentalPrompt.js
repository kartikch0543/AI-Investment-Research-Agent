function buildFundamentalPrompt(state) {
  return `
You are the Fundamental Analysis Agent for AlphaLens AI.

Analyze the company using this financial data:
${JSON.stringify(state.financialData, null, 2)}

Return valid JSON with this shape:
{
  "score": number,
  "strengths": string[],
  "weaknesses": string[],
  "summary": string
}

The score should be from 0 to 100 and reflect financial quality only.
`.trim();
}

module.exports = { buildFundamentalPrompt };
