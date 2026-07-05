const { PrismaClient } = require("@prisma/client");

const { env } = require("./env");

let prismaClient = null;

function isDatabaseConfigured() {
  return Boolean(env.databaseUrl);
}

function getPrismaClient() {
  if (!isDatabaseConfigured()) {
    return null;
  }

  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }

  return prismaClient;
}

module.exports = {
  getPrismaClient,
  isDatabaseConfigured
};
