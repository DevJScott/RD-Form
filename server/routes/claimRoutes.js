const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claimController");
const authMiddleware = require("../middleware/authMiddleware");

// All routes are protected
router.use(authMiddleware);

router.get("/all", claimController.getAllClaims);
router.get("/unfinished", claimController.getUnfinishedClaims);
router.post("/", claimController.createClaim);
router.get("/:id", claimController.getClaim);
router.put("/:id", claimController.updateClaim);
router.patch("/:id/autosave", claimController.autosaveClaim);
router.delete("/:id", claimController.deleteClaim);

module.exports = router;