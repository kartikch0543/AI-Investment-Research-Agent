const { env } = require("./env");

module.exports = {
  provider: env.llmProvider,
  gemini: {
    apiKey: env.geminiApiKey,
    model: env.geminiModel
  },
  openrouter: {
    apiKey: env.openrouterApiKey,
    model: env.openrouterModel,
    baseUrl: env.openrouterBaseUrl,
    appUrl: env.appUrl,
    appName: env.appName
  }
};
