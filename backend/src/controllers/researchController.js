const { runResearch } = require("../services/researchOrchestrator");
const { getResearchHistoryByFirebaseUid, saveResearchHistoryItem } = require("../services/historyService");
const { validateResearchRequest } = require("../validators/researchValidator");
const { asyncHandler } = require("../utils/asyncHandler");
const { createSuccessResponse } = require("../utils/apiResponse");

const createResearch = asyncHandler(async (request, response) => {
  const validatedInput = validateResearchRequest(request.body);
  const result = await runResearch(validatedInput.companyName);
  await saveResearchHistoryItem({
    firebaseUid: validatedInput.firebaseUid,
    result
  });

  response.status(200).json(
    createSuccessResponse(result, "Research completed successfully")
  );
});

const getResearchHistory = asyncHandler(async (request, response) => {
  const firebaseUid = typeof request.query.firebaseUid === "string" ? request.query.firebaseUid.trim() : "";

  if (!firebaseUid) {
    const error = new Error("Firebase user id is required");
    error.statusCode = 400;
    error.code = "VALIDATION_ERROR";
    throw error;
  }

  const historyItems = await getResearchHistoryByFirebaseUid(firebaseUid);

  response.status(200).json(
    createSuccessResponse(historyItems, "Research history loaded successfully")
  );
});

module.exports = {
  createResearch,
  getResearchHistory
};
