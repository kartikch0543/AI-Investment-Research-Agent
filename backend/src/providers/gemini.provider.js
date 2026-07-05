const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const config = require("../config/llm.config");
const logger = require("../utils/logger");

let modelInstance = null;

function getModel() {
  if (!modelInstance) {
    if (!config.gemini.apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
    modelInstance = new ChatGoogleGenerativeAI({
      apiKey: config.gemini.apiKey,
      model: config.gemini.model,
      temperature: 0.2,
      maxRetries: 1
    });
  }
  return modelInstance;
}

async function generate(prompt, options = {}) {
  const startTime = Date.now();
  const modelName = config.gemini.model;

  logger.info("Executing Gemini request", { provider: "gemini", model: modelName });

  try {
    const model = getModel();
    const response = await model.invoke([
      [
        "system",
        "Return only valid JSON matching the requested shape. Do not include markdown."
      ],
      ["human", prompt]
    ]);

    const latency = Date.now() - startTime;
    const text = response.content;

    // Attempt to extract token usage if available
    const tokenUsage = response.response_metadata?.tokenUsage || null;

    logger.info("Gemini request successful", {
      provider: "gemini",
      model: modelName,
      latencyMs: latency,
      tokenUsage
    });

    return {
      success: true,
      provider: "gemini",
      model: modelName,
      text
    };
  } catch (error) {
    const latency = Date.now() - startTime;
    logger.error("Gemini request failed", {
      provider: "gemini",
      model: modelName,
      latencyMs: latency,
      error: error.message
    });

    return {
      success: false,
      provider: "gemini",
      message: error.message
    };
  }
}

module.exports = { generate };
