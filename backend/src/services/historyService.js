const { getPrismaClient, isDatabaseConfigured, getIsDbConnected } = require("../config/prisma");

// Local In-Memory research history cache fallback
const memoryHistory = [];
let mockHistoryIdCounter = 1;

async function saveResearchHistoryItem({ firebaseUid, result }) {
  if (!isDatabaseConfigured() || !firebaseUid) {
    return null;
  }

  if (!getIsDbConnected()) {
    // Database connection is offline -> save to local memory list
    const mockItem = {
      id: `mock-history-${mockHistoryIdCounter++}`,
      userId: `mock-user-id`,
      firebaseUid, // track locally for lookup filtering
      companyName: result.companyName,
      decision: result.decision,
      confidence: result.confidence,
      overallScore: result.overallScore,
      jsonReport: result,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryHistory.unshift(mockItem); // add to top
    return mockItem;
  }

  const prisma = getPrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      firebaseUid
    }
  });

  if (!user) {
    return null;
  }

  return prisma.researchHistory.create({
    data: {
      userId: user.id,
      companyName: result.companyName,
      decision: result.decision,
      confidence: result.confidence,
      overallScore: result.overallScore,
      jsonReport: result
    }
  });
}

async function getResearchHistoryByFirebaseUid(firebaseUid) {
  if (!isDatabaseConfigured() || !firebaseUid) {
    return [];
  }

  if (!getIsDbConnected()) {
    // Database connection is offline -> read from local memory list filtered by firebaseUid
    return memoryHistory
      .filter((item) => item.firebaseUid === firebaseUid)
      .map((item) => ({
        id: item.id,
        companyName: item.companyName,
        decision: item.decision,
        confidence: item.confidence,
        overallScore: item.overallScore,
        createdAt: item.createdAt,
        jsonReport: item.jsonReport
      }));
  }

  const prisma = getPrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      firebaseUid
    }
  });

  if (!user) {
    return [];
  }

  const historyItems = await prisma.researchHistory.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return historyItems.map((item) => ({
    id: item.id,
    companyName: item.companyName,
    decision: item.decision,
    confidence: item.confidence,
    overallScore: item.overallScore,
    createdAt: item.createdAt,
    jsonReport: item.jsonReport
  }));
}

module.exports = {
  getResearchHistoryByFirebaseUid,
  saveResearchHistoryItem
};
