const axios = require("axios");
const config = require("../config/llm.config");
const logger = require("../utils/logger");

async function generate(prompt, options = {}) {
  const startTime = Date.now();
  const { apiKey, model, baseUrl, appUrl, appName } = config.openrouter;

  if (!apiKey) {
    return {
      success: false,
      provider: "openrouter",
      message: "OPENROUTER_API_KEY is not configured"
    };
  }

  logger.info("Executing OpenRouter request", { provider: "openrouter", model });

  try {
    const response = await axios.post(
      `${baseUrl}/chat/completions`,
      {
        model: model,
        messages: [
          {
            role: "system",
            content: "Return only valid JSON matching the requested shape. Do not include markdown."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 2048
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": appUrl,
          "X-Title": appName,
          "Content-Type": "application/json"
        },
        timeout: 30000 // 30 seconds timeout
      }
    );

    const latency = Date.now() - startTime;
    const choice = response.data?.choices?.[0];
    const text = choice?.message?.content || "";

    // Extract tokens if available
    const usage = response.data?.usage || null;

    logger.info("OpenRouter request successful", {
      provider: "openrouter",
      model,
      latencyMs: latency,
      tokenUsage: usage
    });

    return {
      success: true,
      provider: "openrouter",
      model,
      text
    };
  } catch (error) {
    const latency = Date.now() - startTime;
    const errMsg = error.response?.data?.error?.message || error.message;
    logger.error("OpenRouter request failed", {
      provider: "openrouter",
      model,
      latencyMs: latency,
      error: errMsg
    });

    return {
      success: false,
      provider: "openrouter",
      message: errMsg
    };
  }
}

module.exports = { generate };
