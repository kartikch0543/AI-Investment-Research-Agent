const { runResearch } = require("../services/researchOrchestrator");
const { validateResearchRequest } = require("../validators/researchValidator");
const { asyncHandler } = require("../utils/asyncHandler");
const { createSuccessResponse } = require("../utils/apiResponse");

const createResearch = asyncHandler(async (request, response) => {
  const validatedInput = validateResearchRequest(request.body);
  const result = await runResearch(validatedInput.companyName);

  response.status(200).json(
    createSuccessResponse(result, "Research completed successfully")
  );
});

const getResearchHistory = asyncHandler(async (_request, response) => {
  response.status(200).json(
    createSuccessResponse([], "Research history is not persisted yet")
  );
});

module.exports = {
  createResearch,
  getResearchHistory
};
