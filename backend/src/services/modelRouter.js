const config = require("../config/model.config");

/**
 * Resolves the appropriate model or model pipeline for a given agent type.
 * 
 * EXPLAINABILITY:
 * 
 * 1. Why each model was selected:
 *    - deepseek/deepseek-chat (Company, Financial, Risk, Moat Agents): Selected for its high reasoning-to-cost ratio.
 *      These analytical tasks require high structure and precision but don't need giant generalist parameters. DeepSeek-V3
 *      provides premium-tier logic at a fraction of the cost.
 *    - qwen/qwen3 (News Agent): Highly optimized for summarization, quick translation, and rapid text sentiment tagging,
 *      achieving extremely low latency for streaming large amounts of public text.
 *    - google/gemini-2.5-flash (Committee Agent): This is the final synthesis step. It requires a larger context window
 *      and the strongest multimodal/text-reasoning capability to balance and explain conflicting reports.
 * 
 * 2. Why routing reduces cost:
 *    - By matching the request to the cheapest model that fits the task (e.g. using DeepSeek/Qwen instead of Gemini 2.5 Pro
 *      everywhere), we prevent paying premium tokens for simple summary and extraction tasks.
 * 
 * 3. Why routing improves latency:
 *    - Cheaper, specialized models have higher throughput and smaller parameter active counts, reducing processing
 *      time. Since nodes run in parallel, using faster task-specific models significantly lowers E2E search latency.
 * 
 * 4. Why the Committee Agent uses the strongest model:
 *    - The Investment Committee is the brain of the workflow. It must read, weigh, and resolve information from four
 *      different agents. This requires high synthesis intelligence to identify contradictions, weigh scores, and formulate
 *      balanced explanations.
 */
function getModelForAgent(agentType) {
  const mapping = config.models;
  
  if (agentType === "committee") {
    return [mapping.committee.primary, mapping.committee.fallback1, mapping.committee.fallback2];
  }
  
  return mapping[agentType] || "deepseek/deepseek-chat";
}

module.exports = { getModelForAgent };
