const express = require("express");

const {
  getCurrentUser,
  syncUser,
  updateCurrentUser
} = require("../controllers/userController");

const router = express.Router();

router.post("/sync", syncUser);
router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);

module.exports = router;
