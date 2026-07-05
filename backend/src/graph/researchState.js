function createInitialResearchState(companyName) {
  return {
    companyName,
    companyProfile: {},
    financialData: {},
    newsArticles: [],
    fundamentals: {},
    sentiment: {},
    risks: {},
    moat: {},
    scores: {},
    recommendation: "",
    confidence: 0,
    reasoning: "",
    strengths: [],
    weaknesses: [],
    sources: []
  };
}

module.exports = { createInitialResearchState };
