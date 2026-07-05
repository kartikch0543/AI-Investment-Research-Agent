const { env } = require("./env");

module.exports = {
  apiKey: env.openrouterApiKey,
  baseUrl: env.openrouterBaseUrl,
  appUrl: env.appUrl,
  appName: env.appName,
  models: {
    company: env.companyModel,
    financial: env.financialModel,
    news: env.newsModel,
    risk: env.riskModel,
    moat: env.moatModel,
    committee: {
      primary: env.committeeModel,
      fallback1: "deepseek/deepseek-chat",
      fallback2: "qwen/qwen3"
    }
  }
};
