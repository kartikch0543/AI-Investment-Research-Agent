const llmService = require("../../services/llm.service");

function normalizeObject(candidate, shape, fallback) {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    return fallback;
  }

  const normalized = {};

  for (const key of Object.keys(shape)) {
    if (candidate[key] === undefined || candidate[key] === null) {
      normalized[key] = shape[key];
      continue;
    }

    normalized[key] = candidate[key];
  }

  return normalized;
}

async function runStructuredPrompt({ prompt, fallback, shape }) {
  try {
    const result = await llmService.generate(prompt);

    if (!result.success) {
      return fallback;
    }

    let text = result.text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/^```[a-zA-Z]*\n?/, "");
      text = text.replace(/\n?```$/, "");
    }

    const parsed = JSON.parse(text.trim());
    return normalizeObject(parsed, shape, fallback);
  } catch (_error) {
    return fallback;
  }
}

module.exports = { runStructuredPrompt };
