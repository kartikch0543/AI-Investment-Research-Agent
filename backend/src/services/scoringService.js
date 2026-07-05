const {
  SCORE_WEIGHTS,
  RECOMMENDATION_THRESHOLDS
} = require("../config/constants");

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getRecommendation(overallScore) {
  if (overallScore >= RECOMMENDATION_THRESHOLDS.BUY) {
    return "BUY";
  }

  if (overallScore >= RECOMMENDATION_THRESHOLDS.WATCHLIST) {
    return "WATCHLIST";
  }

  return "PASS";
}

function calculateScores({ fundamentals, sentiment, moat, risks }) {
  const financialHealth = clampScore(fundamentals.score || 0);
  const newsSentiment = clampScore(sentiment.score || 0);
  const businessQuality = clampScore(moat.score || 0);
  const riskScore = clampScore(100 - (risks.score || 0));

  const overallScore = clampScore(
    financialHealth * SCORE_WEIGHTS.financialHealth +
      newsSentiment * SCORE_WEIGHTS.newsSentiment +
      businessQuality * SCORE_WEIGHTS.businessQuality +
      riskScore * SCORE_WEIGHTS.risk
  );

  return {
    financialHealth,
    newsSentiment,
    businessQuality,
    riskAdjusted: riskScore,
    overallScore,
    recommendation: getRecommendation(overallScore)
  };
}

module.exports = { calculateScores };
