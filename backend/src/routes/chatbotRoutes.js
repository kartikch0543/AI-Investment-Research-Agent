const express = require("express");
const { handleChatQuery } = require("../controllers/chatbotController");

const router = express.Router();

router.post("/", handleChatQuery);

module.exports = router;
