const { z } = require("zod");

const userSyncSchema = z.object({
  firebaseUid: z.string().trim().min(1, "Firebase user id is required"),
  email: z.string().trim().email("A valid email is required"),
  displayName: z.string().trim().optional().or(z.literal("")),
  username: z
    .string()
    .trim()
    .min(3, "Username must have at least 3 characters")
    .max(30, "Username must have at most 30 characters")
    .regex(/^[a-zA-Z0-9._-]+$/, "Username can only contain letters, numbers, dots, hyphens, and underscores")
    .optional()
    .or(z.literal("")),
  contactNumber: z
    .string()
    .trim()
    .min(7, "Contact number must have at least 7 digits")
    .max(20, "Contact number must have at most 20 characters")
    .optional()
    .or(z.literal("")),
  photoUrl: z.string().trim().url("Photo URL must be valid").optional().or(z.literal("")),
  provider: z.string().trim().optional().or(z.literal(""))
});

const userLookupSchema = z.object({
  firebaseUid: z.string().trim().min(1, "Firebase user id is required")
});

const userProfileUpdateSchema = z.object({
  firebaseUid: z.string().trim().min(1, "Firebase user id is required"),
  displayName: z.string().trim().min(1, "Display name is required"),
  username: z
    .string()
    .trim()
    .min(3, "Username must have at least 3 characters")
    .max(30, "Username must have at most 30 characters")
    .regex(/^[a-zA-Z0-9._-]+$/, "Username can only contain letters, numbers, dots, hyphens, and underscores"),
  contactNumber: z
    .string()
    .trim()
    .min(7, "Contact number must have at least 7 digits")
    .max(20, "Contact number must have at most 20 characters"),
  photoUrl: z.string().trim().url("Photo URL must be valid").optional().or(z.literal(""))
});

function parseOrThrow(result) {
  if (result.success) {
    return result.data;
  }

  const error = new Error(result.error.issues[0].message);
  error.statusCode = 400;
  error.code = "VALIDATION_ERROR";
  throw error;
}

function validateUserSyncPayload(payload) {
  return parseOrThrow(userSyncSchema.safeParse(payload));
}

function validateUserLookupQuery(payload) {
  return parseOrThrow(userLookupSchema.safeParse(payload));
}

function validateUserProfileUpdate(payload) {
  return parseOrThrow(userProfileUpdateSchema.safeParse(payload));
}

module.exports = {
  validateUserLookupQuery,
  validateUserProfileUpdate,
  validateUserSyncPayload
};
