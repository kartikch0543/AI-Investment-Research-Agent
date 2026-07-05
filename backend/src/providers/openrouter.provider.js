const axios = require("axios");
const config = require("../config/model.config");
const logger = require("../utils/logger");

/**
 * Executes a call to the OpenRouter chat/completions endpoint using a dynamically resolved model.
 */
async function generate(modelName, prompt, options = {}) {
  const startTime = Date.now();
  const { apiKey, baseUrl, appUrl, appName } = config;

  if (!apiKey) {
    return {
      success: false,
      provider: "openrouter",
      message: "OPENROUTER_API_KEY is not configured"
    };
  }

  try {
    const response = await axios.post(
      `${baseUrl}/chat/completions`,
      {
        model: modelName,
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
    const usage = response.data?.usage || null;

    logger.info("OpenRouter request successful", {
      provider: "openrouter",
      model: modelName,
      latencyMs: latency,
      tokenUsage: usage
    });

    return {
      success: true,
      provider: "openrouter",
      model: modelName,
      text,
      latencyMs: latency,
      tokenUsage: usage
    };
  } catch (error) {
    const latency = Date.now() - startTime;
    const errMsg = error.response?.data?.error?.message || error.message;

    logger.error("OpenRouter request failed", {
      provider: "openrouter",
      model: modelName,
      latencyMs: latency,
      error: errMsg
    });

    return {
      success: false,
      provider: "openrouter",
      model: modelName,
      message: errMsg,
      latencyMs: latency
    };
  }
}

module.exports = { generate };
