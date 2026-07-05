function buildSentimentPrompt(state) {
  return `
You are the News Sentiment Agent for AlphaLens AI.

Review this news data:
${JSON.stringify(state.newsArticles, null, 2)}

Return valid JSON with this shape:
{
  "score": number,
  "positiveDrivers": string[],
  "negativeDrivers": string[],
  "summary": string
}

The score should be from 0 to 100 and reflect sentiment quality only.
`.trim();
}

module.exports = { buildSentimentPrompt };
