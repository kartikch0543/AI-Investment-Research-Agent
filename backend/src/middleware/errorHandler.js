const { createErrorResponse } = require("../utils/apiResponse");

function errorHandler(error, _request, response, _next) {
  const statusCode = error.statusCode || 500;
  const errorCode = error.code || "INTERNAL_SERVER_ERROR";
  const message = error.message || "Something went wrong";

  response.status(statusCode).json(createErrorResponse(errorCode, message));
}

module.exports = { errorHandler };
