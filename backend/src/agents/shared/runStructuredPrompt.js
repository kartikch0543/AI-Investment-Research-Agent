const { createGeminiModel } = require("../../config/gemini");

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
  const model = createGeminiModel();

  if (!model) {
    return fallback;
  }

  try {
    const response = await model.invoke([
      [
        "system",
        "Return only valid JSON matching the requested shape. Do not include markdown."
      ],
      ["human", prompt]
    ]);

    const parsed = JSON.parse(response.content);
    return normalizeObject(parsed, shape, fallback);
  } catch (_error) {
    return fallback;
  }
}

module.exports = { runStructuredPrompt };
