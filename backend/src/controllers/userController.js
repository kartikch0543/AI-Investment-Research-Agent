const { asyncHandler } = require("../utils/asyncHandler");
const { createSuccessResponse } = require("../utils/apiResponse");
const {
  getUserProfile,
  syncAuthenticatedUser,
  updateUserProfile
} = require("../services/userService");
const {
  validateUserLookupQuery,
  validateUserProfileUpdate,
  validateUserSyncPayload
} = require("../validators/userValidator");

const syncUser = asyncHandler(async (request, response) => {
  const payload = validateUserSyncPayload(request.body);
  const user = await syncAuthenticatedUser(payload);

  response.status(200).json(createSuccessResponse(user, "User synced successfully"));
});

const getCurrentUser = asyncHandler(async (request, response) => {
  const query = validateUserLookupQuery(request.query);
  const user = await getUserProfile(query.firebaseUid);

  response.status(200).json(createSuccessResponse(user, "User profile loaded successfully"));
});

const updateCurrentUser = asyncHandler(async (request, response) => {
  const payload = validateUserProfileUpdate({
    ...request.body,
    firebaseUid: request.body.firebaseUid || request.query.firebaseUid
  });

  const user = await updateUserProfile(payload);

  response.status(200).json(createSuccessResponse(user, "User profile updated successfully"));
});

module.exports = {
  syncUser,
  getCurrentUser,
  updateCurrentUser
};
