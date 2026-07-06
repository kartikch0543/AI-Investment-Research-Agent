function buildCompanyPrompt(state) {
  return `
You are the Company Agent for TradeIntel AI.

Company: ${state.companyName}

Your responsibility is to summarize the company's business model, market position, and why the business matters to an investor.
Keep the response factual and concise.
`.trim();
}

module.exports = { buildCompanyPrompt };
