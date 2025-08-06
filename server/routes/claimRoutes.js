
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createClaim,
  getAllClaims,
  getUserClaims,
  getClaim,
  getUnfinishedClaims,
  updateClaim,
  autosaveClaim,
  deleteClaim
} = require("../controllers/claimController");

// All routes are protected
router.use(authMiddleware);

// Create a new claim
router.post("/", createClaim);

// Get all claims (admin only)
router.get("/all", getAllClaims);

// Get user's claims
router.get("/", getUserClaims);

// Get unfinished claims
router.get("/unfinished", getUnfinishedClaims);

// Get a specific claim by ID
router.get("/:id", getClaim);

// Update a claim
router.put("/:id", updateClaim);

// Autosave a claim
router.patch("/:id/autosave", autosaveClaim);

// Delete a claim
router.delete("/:id", deleteClaim);

module.exports = router;
