const { getCompanyProfile, getFinancialData, getNewsArticles } = require("../services/companyDataService");

async function runCompanyAgent(state) {
  const [companyProfile, financialData, newsArticles] = await Promise.all([
    getCompanyProfile(state.companyName),
    getFinancialData(state.companyName),
    getNewsArticles(state.companyName)
  ]);

  return {
    companyProfile,
    financialData,
    newsArticles,
    sources: [
      ...state.sources,
      {
        type: "internal-mock",
        label: "Mock company profile dataset"
      },
      {
        type: "internal-mock",
        label: "Mock financial dataset"
      },
      {
        type: "internal-mock",
        label: "Mock news dataset"
      }
    ]
  };
}

module.exports = { runCompanyAgent };
