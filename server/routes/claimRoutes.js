
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Safely require controller with error handling
let claimController;
try {
  claimController = require("../controllers/claimController");
} catch (err) {
  console.error("Error loading claimController:", err.message);
  claimController = {};
}

// Apply auth middleware to all routes
router.use(authMiddleware);

// Fallback function for missing controllers
const fallback = (req, res) => res.status(501).json({ error: "Controller method not implemented" });

// Static routes first (no parameters)
router.get("/unfinished", claimController.getUnfinishedClaims || fallback);
router.get("/all", claimController.getAllClaims || fallback);
router.get("/user", claimController.getUserClaims || fallback);
router.post("/", claimController.createClaim || fallback);

// Parameterized routes last
router.get("/:id", claimController.getClaim || fallback);
router.put("/:id", claimController.updateClaim || fallback);
router.patch("/:id/autosave", claimController.autosaveClaim || fallback);
router.delete("/:id", claimController.deleteClaim || fallback);

module.exports = router;
