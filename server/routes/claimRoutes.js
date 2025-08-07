const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createClaim,
  getClaims,
  getClaimById,
  updateClaim,
  deleteClaim,
} = require("../controllers/claimController");

// Apply auth middleware to protected routes
router.post("/", authMiddleware, createClaim);
router.get("/", authMiddleware, getClaims);
router.get("/:id", authMiddleware, getClaimById);
router.put("/:id", authMiddleware, updateClaim);
router.delete("/:id", authMiddleware, deleteClaim);

module.exports = router;