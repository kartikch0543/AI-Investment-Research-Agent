const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-flash-latest",
  databaseUrl: process.env.DATABASE_URL || "",
  llmProvider: process.env.LLM_PROVIDER || "gemini",
  openrouterApiKey: process.env.OPENROUTER_API_KEY || "",
  openrouterModel: process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash",
  openrouterBaseUrl: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
  appUrl: process.env.APP_URL || "http://localhost:5173",
  appName: process.env.APP_NAME || "AlphaLens AI"
};

module.exports = { env };
