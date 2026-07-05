const { createErrorResponse } = require("../utils/apiResponse");

function notFound(request, response) {
  response
    .status(404)
    .json(createErrorResponse("ROUTE_NOT_FOUND", `No route found for ${request.originalUrl}`));
}

module.exports = { notFound };
