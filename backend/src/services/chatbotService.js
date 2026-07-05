const llmService = require("./llm.service");
const logger = require("../utils/logger");

async function getChatResponse({ message, history, researchContext }) {
  const companyName = researchContext?.companyName;
  
  const systemPrompt = `You are the AlphaLens AI Assistant, a professional investment copilot.
Your purpose is to answer questions about the researched company, investment terminology, financial metrics, and project calculations.

${researchContext ? `You are currently discussing the company: ${companyName}. Here is the context of our latest research on ${companyName}:
- Recommendation Decision: ${researchContext.decision}
- Overall Score: ${researchContext.overallScore}/100
- Confidence: ${researchContext.confidence}
- Key Strengths: ${(researchContext.strengths || []).join(", ")}
- Key Weaknesses: ${(researchContext.weaknesses || []).join(", ")}
- Moat/Business Quality Summary: ${researchContext.moat?.summary || "No moat summary available"}
- Financial Summary: ${researchContext.financialSummary?.summary || "No financial summary available"}
- Sentiment/News Summary: ${researchContext.sentiment?.summary || "No sentiment summary available"}
- Key Risks: ${(researchContext.risks || []).join(", ")}` : "No specific company is currently being researched. You can answer general questions about investment terms (e.g. PE Ratio, Moat, EBITDA, etc.) or explain how the AlphaLens multi-agent research workspace works."}

Answer the user's question accurately, concisely, and professionally. Use clean markdown format. Keep answers direct and concise.`;

  let fullPrompt = `${systemPrompt}\n\n`;

  if (history && history.length > 0) {
    fullPrompt += "Conversation history:\n";
    for (const turn of history) {
      const role = turn.role === "user" ? "User" : "Assistant";
      const text = turn.text || turn.content || "";
      fullPrompt += `${role}: ${text}\n`;
    }
  }

  fullPrompt += `User: ${message}\nAssistant:`;

  logger.info(`Generating chatbot response. Company context: ${companyName || "None"}`);

  // Stage 1: Try standard "company" model (DeepSeek)
  let result = await llmService.generate("company", fullPrompt);
  
  // Stage 2: Fallback to "committee" model (Gemini) if first choice failed
  if (!result.success) {
    logger.warn("Chatbot primary model failed. Attempting fallback model (Gemini)...");
    result = await llmService.generate("committee", fullPrompt);
  }

  if (result.success) {
    let replyText = result.text.trim();
    // Strip markdown code block wrappers if model returned JSON wrapper
    if (replyText.startsWith("```")) {
      replyText = replyText.replace(/^```[a-zA-Z]*\n?/, "");
      replyText = replyText.replace(/\n?```$/, "");
    }
    return replyText;
  }

  logger.error("All chatbot models failed.");
  return "I'm sorry, I'm having trouble connecting to the AI service. Please check your network or try again in a moment.";
}

module.exports = { getChatResponse };
