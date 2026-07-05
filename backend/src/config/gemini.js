const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const { env } = require("./env");

function createGeminiModel() {
  if (!env.geminiApiKey) {
    return null;
  }

  return new ChatGoogleGenerativeAI({
    apiKey: env.geminiApiKey,
    model: "gemini-flash-latest",
    temperature: 0.2,
    maxRetries: 1
  });
}

module.exports = { createGeminiModel };
