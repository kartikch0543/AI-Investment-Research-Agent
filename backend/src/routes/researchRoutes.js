const express = require("express");

const {
  createResearch,
  getResearchHistory
} = require("../controllers/researchController");

const router = express.Router();

router.post("/", createResearch);
router.get("/history", getResearchHistory);

module.exports = router;
