const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const { env } = require("./env");

function createGeminiModel() {
  if (!env.geminiApiKey) {
    return null;
  }

  return new ChatGoogleGenerativeAI({
    apiKey: env.geminiApiKey,
    model: "gemini-1.5-flash",
    temperature: 0.2
  });
}

module.exports = { createGeminiModel };
