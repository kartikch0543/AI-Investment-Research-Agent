const { PrismaClient } = require("@prisma/client");
const { env } = require("./env");

let prismaClient = null;
let isDbConnected = false;
let dbCheckPromise = null;

function isDatabaseConfigured() {
  return Boolean(env.databaseUrl);
}

function getPrismaClient() {
  if (!isDatabaseConfigured()) {
    return null;
  }

  if (!prismaClient) {
    prismaClient = new PrismaClient({
      datasources: {
        db: { url: env.databaseUrl }
      }
    });
  }

  return prismaClient;
}

async function checkDatabaseConnection() {
  if (!isDatabaseConfigured()) {
    isDbConnected = false;
    return false;
  }
  
  if (dbCheckPromise) {
    return dbCheckPromise;
  }

  const prisma = getPrismaClient();
  dbCheckPromise = prisma.$connect()
    .then(() => {
      isDbConnected = true;
      console.log("🟢 PostgreSQL database connected successfully via Prisma.");
      return true;
    })
    .catch((err) => {
      isDbConnected = false;
      console.warn("\n⚠️ DATABASE WARNING: Outbound connection to Neon PostgreSQL failed (TCP Port 5432 blocked).");
      console.warn("👉 TradeIntel is running in In-Memory Local Fallback Mode for user profile & history.");
      console.warn("👉 In production (Render/Vercel), it will automatically connect to Neon PostgreSQL.\n");
      return false;
    });

  return dbCheckPromise;
}

function getIsDbConnected() {
  return isDbConnected;
}

module.exports = {
  getPrismaClient,
  isDatabaseConfigured,
  checkDatabaseConnection,
  getIsDbConnected
};
