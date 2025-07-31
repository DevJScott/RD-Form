
const express = require("express");
const {
  createClaim,
  getAllClaims,
  getUserClaims,
  getUnfinishedClaims,
  updateClaim,
  autosaveClaim,
  deleteClaim,
} = require("../controllers/claimController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createClaim);
router.get("/", authenticate, getUserClaims);
router.get("/all", authenticate, getAllClaims);
router.get("/unfinished", authenticate, getUnfinishedClaims);
router.patch("/:id", authenticate, updateClaim);
router.post("/:id/autosave", authenticate, autosaveClaim);
router.delete("/:id", authenticate, deleteClaim);

module.exports = router;
