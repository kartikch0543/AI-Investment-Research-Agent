const { getPrismaClient, isDatabaseConfigured } = require("../config/prisma");

async function saveResearchHistoryItem({ firebaseUid, result }) {
  if (!isDatabaseConfigured() || !firebaseUid) {
    return null;
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
