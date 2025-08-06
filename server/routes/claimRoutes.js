const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createClaim,
  getAllClaims,
  getClaimById,
  updateClaim,
  deleteClaim,
  submitClaim,
  getDraftClaims,
  getSubmittedClaims
} = require("../controllers/claimController");

// All routes are protected
router.use(authMiddleware);

// Create a new claim
router.post("/", createClaim);

// Get all claims for a user
router.get("/", getAllClaims);

// Get draft claims
router.get("/drafts", getDraftClaims);

// Get submitted claims
router.get("/submitted", getSubmittedClaims);

// Get a specific claim by ID
router.get("/:id([0-9]+)", getClaimById);

// Update a claim
router.put("/:id([0-9]+)", updateClaim);

// Submit a claim (mark as not draft)
router.put("/:id([0-9]+)/submit", submitClaim);

// Delete a claim
router.delete("/:id([0-9]+)", deleteClaim);

module.exports = router;