const { buildResearchGraph } = require("../graph/researchGraph");
const { createInitialResearchState } = require("../graph/researchState");
const { formatResearchResponse } = require("../utils/apiResponse");

async function runResearch(companyName) {
  const graph = buildResearchGraph();
  const initialState = createInitialResearchState(companyName);
  const finalState = await graph.invoke(initialState);

  return formatResearchResponse(finalState);
}

module.exports = { runResearch };
