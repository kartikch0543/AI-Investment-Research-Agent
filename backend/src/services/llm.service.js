const openrouterProvider = require("../providers/openrouter.provider");
const modelRouter = require("./modelRouter");
const logger = require("../utils/logger");

/**
 * Outputs a clean, styled dashboard block inside the backend console showing the agent's model selection and performance.
 */
function printDashboardLog(agentName, model, latencyMs, fallbackUsed = null) {
  const seconds = (latencyMs / 1000).toFixed(1);
  console.log("\n──────────────────────────────────────");
  console.log(`${agentName}`);
  console.log(`Model: ${model}`);
  console.log(`Completed in ${seconds} sec`);
  if (fallbackUsed !== null) {
    console.log(`Fallback Used: ${fallbackUsed}`);
  }
  console.log("──────────────────────────────────────\n");
}

/**
 * Orchestrates LLM request routing and fallback logic based on the agent type.
 * 
 * Commented functions:
 * - Direct routing for company, financial, news, risk, moat.
 * - Multi-stage fallback routing for the Committee agent.
 */
async function generate(agentType, prompt) {
  const resolved = modelRouter.getModelForAgent(agentType);
  const agentDisplayName = agentType.charAt(0).toUpperCase() + agentType.slice(1) + " Agent";

  // Non-committee agents: run resolved model directly via OpenRouter provider
  if (agentType !== "committee") {
    logger.info(`Routing ${agentType} agent request to model: ${resolved}`);
    
    const result = await openrouterProvider.generate(resolved, prompt);
    
    if (result.success) {
      printDashboardLog(agentDisplayName, resolved, result.latencyMs);
      return result;
    }
    
    logger.error(`${agentType} agent execution failed: ${result.message}`);
    return result;
  }

  // Committee agent: execute fallback routing pipeline
  const [primaryModel, fallbackModel1, fallbackModel2] = resolved;
  
  logger.info(`Routing Committee request. Primary: ${primaryModel}, Fallback 1: ${fallbackModel1}, Fallback 2: ${fallbackModel2}`);

  // Stage 1: Try Google Gemini 2.5 Flash
  const result1 = await openrouterProvider.generate(primaryModel, prompt);
  if (result1.success) {
    printDashboardLog("Committee", primaryModel, result1.latencyMs, "No");
    return result1;
  }

  logger.warn(`Committee primary model (${primaryModel}) failed: ${result1.message}. Trying Fallback 1: ${fallbackModel1}`);

  // Stage 2: Try DeepSeek Chat
  const result2 = await openrouterProvider.generate(fallbackModel1, prompt);
  if (result2.success) {
    printDashboardLog("Committee", fallbackModel1, result2.latencyMs, `Yes (Failed ${primaryModel})`);
    return result2;
  }

  logger.warn(`Committee fallback 1 (${fallbackModel1}) failed: ${result2.message}. Trying Fallback 2: ${fallbackModel2}`);

  // Stage 3: Try Qwen 3
  const result3 = await openrouterProvider.generate(fallbackModel2, prompt);
  if (result3.success) {
    printDashboardLog("Committee", fallbackModel2, result3.latencyMs, `Yes (Failed ${primaryModel} and ${fallbackModel1})`);
    return result3;
  }

  logger.error("All Committee models failed.");
  return {
    success: false,
    provider: "openrouter",
    message: "No LLM providers available."
  };
}

module.exports = { generate };
