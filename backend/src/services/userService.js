const { getPrismaClient, isDatabaseConfigured, getIsDbConnected } = require("../config/prisma");

// Local In-Memory database fallback for offline/development environments
const memoryUsers = {};
let mockUserIdCounter = 1;

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

  if (!getIsDbConnected()) {
    // Database connection is offline -> fallback to local memory cache
    if (!memoryUsers[firebaseUid]) {
      memoryUsers[firebaseUid] = {
        id: `mock-user-${mockUserIdCounter++}`,
        firebaseUid,
        email,
        displayName: displayName || "Local Offline User",
        username: username || `user_${firebaseUid.slice(0, 6).toLowerCase()}`,
        contactNumber: contactNumber || null,
        photoUrl: photoUrl || "",
        provider: provider || "firebase",
        lastLoginAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } else {
      const u = memoryUsers[firebaseUid];
      u.email = email;
      u.displayName = displayName || u.displayName;
      if (username) u.username = username;
      if (contactNumber) u.contactNumber = contactNumber;
      u.photoUrl = photoUrl || u.photoUrl;
      u.provider = provider || u.provider;
      u.lastLoginAt = new Date();
      u.updatedAt = new Date();
    }
    return normalizeUser(memoryUsers[firebaseUid]);
  }

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

  if (!getIsDbConnected()) {
    // Database connection is offline -> read from local memory cache
    const user = memoryUsers[firebaseUid];
    if (!user) {
      // Auto-create profile in memory for smooth developer experience
      return syncAuthenticatedUser({
        firebaseUid,
        email: `${firebaseUid}@tradeintel.local`,
        displayName: "TradeIntel Dev User",
        username: `dev_${firebaseUid.slice(0, 6).toLowerCase()}`,
        contactNumber: "",
        photoUrl: "",
        provider: "firebase"
      });
    }
    return normalizeUser(user);
  }

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

  if (!getIsDbConnected()) {
    // Database connection is offline -> update local memory cache
    const user = memoryUsers[firebaseUid];
    if (!user) {
      const error = new Error("User profile was not found in memory cache.");
      error.statusCode = 404;
      error.code = "USER_NOT_FOUND";
      throw error;
    }
    user.displayName = displayName;
    user.username = username;
    user.contactNumber = contactNumber;
    user.photoUrl = photoUrl || user.photoUrl;
    user.updatedAt = new Date();
    return normalizeUser(user);
  }

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
