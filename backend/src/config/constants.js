const SCORE_WEIGHTS = {
  financialHealth: 0.4,
  newsSentiment: 0.2,
  businessQuality: 0.2,
  risk: 0.2
};

const RECOMMENDATION_THRESHOLDS = {
  BUY: 80,
  WATCHLIST: 60
};

module.exports = {
  SCORE_WEIGHTS,
  RECOMMENDATION_THRESHOLDS
};
