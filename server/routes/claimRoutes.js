
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const claimController = require("../controllers/claimController");

// Apply auth middleware to all routes
router.use(authMiddleware);

// Static routes first (no parameters)
router.get("/unfinished", claimController.getUnfinishedClaims);
router.get("/all", claimController.getAllClaims);
router.get("/user", claimController.getUserClaims);
router.post("/", claimController.createClaim);

// Parameterized routes last
router.get("/:id", claimController.getClaim);
router.put("/:id", claimController.updateClaim);
router.patch("/:id/autosave", claimController.autosaveClaim);
router.delete("/:id", claimController.deleteClaim);

module.exports = router;
