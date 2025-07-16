const express = require("express");
const router = express.Router();
const {
  createClaim,
  getAllClaims,
  getUserClaims,
  getUnfinishedClaims
} = require("../controllers/claimController");

// Create new claim
router.post("/", createClaim);

// Get all claims (for admin or dashboard view)
router.get("/", getAllClaims);

// Get all claims by a specific user
router.get("/user/:userId", getUserClaims);

// ✅ Get unfinished claims for a specific user
router.get("/unfinished/:userId", getUnfinishedClaims);

module.exports = router;
