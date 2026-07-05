const config = require("../config/llm.config");
const geminiProvider = require("../providers/gemini.provider");
const openrouterProvider = require("../providers/openrouter.provider");
const logger = require("../utils/logger");

async function generate(prompt, options = {}) {
  const primaryProvider = config.provider;

  logger.info(`Routing request to primary LLM provider: ${primaryProvider}`);

  if (primaryProvider === "gemini") {
    const result = await geminiProvider.generate(prompt, options);
    if (result.success) {
      return result;
    }

    // Fallback logic
    logger.warn("Gemini unavailable. Falling back to OpenRouter.", {
      originalError: result.message
    });

    const fallbackResult = await openrouterProvider.generate(prompt, options);
    if (fallbackResult.success) {
      return fallbackResult;
    }

    return {
      success: false,
      provider: "openrouter",
      message: "No LLM providers available."
    };
  } else if (primaryProvider === "openrouter") {
    const result = await openrouterProvider.generate(prompt, options);
    if (result.success) {
      return result;
    }

    return {
      success: false,
      provider: "openrouter",
      message: `OpenRouter request failed: ${result.message}`
    };
  } else {
    logger.error(`Unsupported LLM provider configured: ${primaryProvider}`);
    return {
      success: false,
      provider: primaryProvider,
      message: `Unsupported LLM provider: ${primaryProvider}`
    };
  }
}

module.exports = { generate };
