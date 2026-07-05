const { getMockCompanyProfile, getMockFinancialData, getMockNews } = require("../utils/mockData");

async function getCompanyProfile(companyName) {
  return getMockCompanyProfile(companyName);
}

async function getFinancialData(companyName) {
  return getMockFinancialData(companyName);
}

async function getNewsArticles(companyName) {
  return getMockNews(companyName);
}

module.exports = {
  getCompanyProfile,
  getFinancialData,
  getNewsArticles
};
