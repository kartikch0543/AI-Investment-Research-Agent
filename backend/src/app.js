const express = require("express");
const cors = require("cors");

const researchRoutes = require("./routes/researchRoutes");
const userRoutes = require("./routes/userRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const { notFound } = require("./middleware/notFound");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://tradeintel-ai.vercel.app",
  "https://trageintel-ai.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  })
);
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
app.use("/api/users", userRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
