const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const claimController = require("../controllers/claimController");

// All routes are protected
router.use(authMiddleware);

// Create a new claim
router.post("/", claimController.createClaim);

// Get all claims (admin)
router.get("/all", claimController.getAllClaims);

// Get user's claims
router.get("/", claimController.getUserClaims);

// Get unfinished claims
router.get("/unfinished", claimController.getUnfinishedClaims);

// Get a specific claim by ID
router.get("/:id", claimController.getClaim);

// Update a claim
router.put("/:id", claimController.updateClaim);

// Autosave a claim
router.patch("/:id/autosave", claimController.autosaveClaim);

// Delete a claim
router.delete("/:id", claimController.deleteClaim);

module.exports = router;