const { z } = require("zod");

const researchRequestSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  firebaseUid: z.string().trim().min(1, "Firebase user id is required").optional()
});

function validateResearchRequest(payload) {
  const result = researchRequestSchema.safeParse(payload);

  if (!result.success) {
    const validationError = new Error(result.error.issues[0].message);
    validationError.statusCode = 400;
    validationError.code = "VALIDATION_ERROR";
    throw validationError;
  }

  return result.data;
}

module.exports = { validateResearchRequest };
