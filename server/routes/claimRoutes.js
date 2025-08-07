const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createClaim,
  getAllClaims,
  getUserClaims,
  getClaim,
  updateClaim,
  deleteClaim,
  getUnfinishedClaims,
  autosaveClaim
} = require("../controllers/claimController");

// All routes are protected
router.use(authMiddleware);

// Create a new claim
router.post("/", createClaim);

// Get all claims (admin)
router.get("/all", getAllClaims);

// Get user's claims
router.get("/", getUserClaims);

// Get unfinished claims
router.get("/unfinished", getUnfinishedClaims);

// Get a specific claim by ID
router.get("/:id([0-9]+)", getClaim);

// Update a claim
router.put("/:id([0-9]+)", updateClaim);

// Autosave a claim
router.patch("/:id([0-9]+)/autosave", autosaveClaim);

// Delete a claim
router.delete("/:id([0-9]+)", deleteClaim);

module.exports = router;