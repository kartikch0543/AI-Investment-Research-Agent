function createSuccessResponse(data, message) {
  return {
    success: true,
    data,
    message
  };
}

function createErrorResponse(code, message) {
  return {
    success: false,
    error: {
      code,
      message
    }
  };
}

function formatResearchResponse(state) {
  return {
    companyName: state.companyName,
    decision: state.recommendation,
    confidence: state.confidence,
    reasoning: state.reasoning,
    sources: state.sources,
    strengths: state.strengths,
    weaknesses: state.weaknesses,
    risks: state.risks.majorRisks || [],
    sentiment: state.sentiment,
    financialSummary: state.fundamentals,
    moat: state.moat,
    overallScore: state.scores.overallScore,
    scoreBreakdown: state.scores
  };
}

module.exports = {
  createSuccessResponse,
  createErrorResponse,
  formatResearchResponse
};
