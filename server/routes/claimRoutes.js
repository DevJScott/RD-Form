const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const claimController = require("../controllers/claimController");

// All routes are protected
router.use(authMiddleware);

// Specific routes first (order matters)
router.get("/unfinished", claimController.getUnfinishedClaims);
router.get("/all", claimController.getAllClaims);  
router.get("/user", claimController.getUserClaims);

// Dynamic routes last
router.get("/:id", claimController.getClaim);
router.post("/", claimController.createClaim);
router.put("/:id", claimController.updateClaim);
router.patch("/:id/autosave", claimController.autosaveClaim);
router.delete("/:id", claimController.deleteClaim);

module.exports = router;