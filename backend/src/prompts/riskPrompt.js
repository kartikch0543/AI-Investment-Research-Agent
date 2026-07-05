function buildRiskPrompt(state) {
  return `
You are the Risk Analysis Agent for AlphaLens AI.

Review the company profile, financials, and recent news:
${JSON.stringify(
    {
      companyProfile: state.companyProfile,
      financialData: state.financialData,
      newsArticles: state.newsArticles
    },
    null,
    2
  )}

Return valid JSON with this shape:
{
  "score": number,
  "majorRisks": string[],
  "mitigations": string[],
  "summary": string
}

The score should be from 0 to 100 where a higher score means higher risk.
`.trim();
}

module.exports = { buildRiskPrompt };
