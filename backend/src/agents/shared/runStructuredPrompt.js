const llmService = require("../../services/llm.service");

function getAgentTypeFromStack() {
  const stack = new Error().stack || "";
  if (stack.includes("fundamentalAgent")) return "financial";
  if (stack.includes("newsAgent")) return "news";
  if (stack.includes("riskAgent")) return "risk";
  if (stack.includes("moatAgent")) return "moat";
  if (stack.includes("investmentCommitteeAgent")) return "committee";
  if (stack.includes("companyAgent")) return "company";
  return "company"; // default fallback
}

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
    const agentType = getAgentTypeFromStack();
    const result = await llmService.generate(agentType, prompt);

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
