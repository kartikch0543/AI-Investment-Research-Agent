const { getChatResponse } = require("../services/chatbotService");
const { asyncHandler } = require("../utils/asyncHandler");
const { createSuccessResponse } = require("../utils/apiResponse");

const handleChatQuery = asyncHandler(async (request, response) => {
  const { message, history, researchContext } = request.body;

  if (!message) {
    const error = new Error("Message is required");
    error.statusCode = 400;
    error.code = "VALIDATION_ERROR";
    throw error;
  }

  const reply = await getChatResponse({ message, history, researchContext });

  response.status(200).json(
    createSuccessResponse({ reply }, "Chat response generated successfully")
  );
});

module.exports = { handleChatQuery };
