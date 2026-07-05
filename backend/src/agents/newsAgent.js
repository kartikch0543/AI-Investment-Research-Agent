const { runStructuredPrompt } = require("./shared/runStructuredPrompt");
const { buildSentimentPrompt } = require("../prompts/sentimentPrompt");

function buildFallbackSentiment(state) {
  const positiveArticles = state.newsArticles.filter((article) => article.tone === "positive").length;
  const neutralArticles = state.newsArticles.filter((article) => article.tone === "neutral").length;
  const negativeArticles = state.newsArticles.filter((article) => article.tone === "negative").length;
  const rawScore = 50 + positiveArticles * 12 - negativeArticles * 10 + neutralArticles * 2;

  return {
    score: Math.max(0, Math.min(100, rawScore)),
    positiveDrivers: state.newsArticles
      .filter((article) => article.tone === "positive")
      .map((article) => article.headline),
    negativeDrivers: state.newsArticles
      .filter((article) => article.tone === "negative")
      .map((article) => article.headline),
    summary: `Recent coverage around ${state.companyName} is mixed but analyzable.`
  };
}

async function runNewsAgent(state) {
  const prompt = buildSentimentPrompt(state);
  const fallback = buildFallbackSentiment(state);

  return runStructuredPrompt({
    prompt,
    fallback,
    shape: {
      score: 0,
      positiveDrivers: [],
      negativeDrivers: [],
      summary: ""
    }
  });
}

module.exports = { runNewsAgent };
