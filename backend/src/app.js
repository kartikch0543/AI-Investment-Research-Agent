const express = require("express");
const cors = require("cors");

const researchRoutes = require("./routes/researchRoutes");
const { notFound } = require("./middleware/notFound");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (request, response) => {
  response.json({
    success: true,
    data: {
      status: "ok",
      service: "AlphaLens AI backend"
    },
    message: "Backend is healthy"
  });
});

app.use("/api/research", researchRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
