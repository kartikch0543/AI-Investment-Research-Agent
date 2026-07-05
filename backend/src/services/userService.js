const { getPrismaClient, isDatabaseConfigured } = require("../config/prisma");

function ensureDatabase() {
  if (!isDatabaseConfigured()) {
    const error = new Error("DATABASE_URL is not configured. PostgreSQL is required for this feature.");
    error.statusCode = 503;
    error.code = "DATABASE_NOT_CONFIGURED";
    throw error;
  }
}

function normalizeUser(user) {
  return {
    id: user.id,
    firebaseUid: user.firebaseUid,
    email: user.email,
    displayName: user.displayName,
    username: user.username,
    contactNumber: user.contactNumber,
    photoUrl: user.photoUrl,
    provider: user.provider,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

async function syncAuthenticatedUser({
  firebaseUid,
  email,
  displayName,
  username,
  contactNumber,
  photoUrl,
  provider
}) {
  ensureDatabase();
  const prisma = getPrismaClient();

  const user = await prisma.user.upsert({
    where: {
      firebaseUid
    },
    update: {
      email,
      displayName,
      ...(username ? { username } : {}),
      ...(contactNumber ? { contactNumber } : {}),
      photoUrl,
      provider,
      lastLoginAt: new Date()
    },
    create: {
      firebaseUid,
      email,
      displayName,
      username: username || null,
      contactNumber: contactNumber || null,
      photoUrl,
      provider,
      lastLoginAt: new Date()
    }
  });

  return normalizeUser(user);
}

async function getUserProfile(firebaseUid) {
  ensureDatabase();
  const prisma = getPrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      firebaseUid
    }
  });

  if (!user) {
    const error = new Error("User profile was not found in PostgreSQL.");
    error.statusCode = 404;
    error.code = "USER_NOT_FOUND";
    throw error;
  }

  return normalizeUser(user);
}

async function updateUserProfile({ firebaseUid, displayName, username, contactNumber, photoUrl }) {
  ensureDatabase();
  const prisma = getPrismaClient();

  const user = await prisma.user.update({
    where: {
      firebaseUid
    },
    data: {
      displayName,
      username,
      contactNumber,
      photoUrl
    }
  });

  return normalizeUser(user);
}

module.exports = {
  getUserProfile,
  syncAuthenticatedUser,
  updateUserProfile
};
