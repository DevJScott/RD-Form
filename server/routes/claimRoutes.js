
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

// Parameterized routes last - ensure proper syntax
router.get("/:id([0-9]+)", claimController.getClaim);
router.put("/:id([0-9]+)", claimController.updateClaim);
router.patch("/:id([0-9]+)/autosave", claimController.autosaveClaim);
router.delete("/:id([0-9]+)", claimController.deleteClaim);

module.exports = router;
