const { START, END, StateGraph, Annotation } = require("@langchain/langgraph");

const { runCompanyAgent } = require("../agents/companyAgent");
const { runFundamentalAgent } = require("../agents/fundamentalAgent");
const { runNewsAgent } = require("../agents/newsAgent");
const { runRiskAgent } = require("../agents/riskAgent");
const { runMoatAgent } = require("../agents/moatAgent");
const { runInvestmentCommitteeAgent } = require("../agents/investmentCommitteeAgent");
const { calculateScores } = require("../services/scoringService");

const ResearchState = Annotation.Root({
  companyName: Annotation(),
  companyProfile: Annotation(),
  financialData: Annotation(),
  newsArticles: Annotation(),
  fundamentals: Annotation(),
  sentiment: Annotation(),
  risks: Annotation(),
  moat: Annotation(),
  scores: Annotation(),
  recommendation: Annotation(),
  confidence: Annotation(),
  reasoning: Annotation(),
  strengths: Annotation(),
  weaknesses: Annotation(),
  sources: Annotation()
});

async function gatherInformationNode(state) {
  return runCompanyAgent(state);
}

async function fundamentalsNode(state) {
  return {
    fundamentals: await runFundamentalAgent(state)
  };
}

async function sentimentNode(state) {
  return {
    sentiment: await runNewsAgent(state)
  };
}

async function riskNode(state) {
  return {
    risks: await runRiskAgent(state)
  };
}

async function moatNode(state) {
  return {
    moat: await runMoatAgent(state)
  };
}

async function mergeResultsNode(state) {
  const scores = calculateScores(state);

  return {
    scores,
    recommendation: scores.recommendation
  };
}

async function investmentCommitteeNode(state) {
  const committeeOutput = await runInvestmentCommitteeAgent(state);

  return {
    confidence: committeeOutput.confidence,
    reasoning: committeeOutput.reasoning,
    strengths: committeeOutput.strengths,
    weaknesses: committeeOutput.weaknesses
  };
}

function buildResearchGraph() {
  return new StateGraph(ResearchState)
    .addNode("gatherInformation", gatherInformationNode)
    .addNode("runFundamentals", fundamentalsNode)
    .addNode("runSentiment", sentimentNode)
    .addNode("runRisk", riskNode)
    .addNode("runMoat", moatNode)
    .addNode("mergeResults", mergeResultsNode)
    .addNode("investmentCommittee", investmentCommitteeNode)
    .addEdge(START, "gatherInformation")
    .addEdge("gatherInformation", "runFundamentals")
    .addEdge("gatherInformation", "runSentiment")
    .addEdge("gatherInformation", "runRisk")
    .addEdge("gatherInformation", "runMoat")
    .addEdge("runFundamentals", "mergeResults")
    .addEdge("runSentiment", "mergeResults")
    .addEdge("runRisk", "mergeResults")
    .addEdge("runMoat", "mergeResults")
    .addEdge("mergeResults", "investmentCommittee")
    .addEdge("investmentCommittee", END)
    .compile();
}

module.exports = { buildResearchGraph };
