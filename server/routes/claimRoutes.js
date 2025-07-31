const express = require("express");
const {
  createClaim,
  getAllClaims,
  getUserClaims,
  getUnfinishedClaims,
} = require("../controllers/claimController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createClaim);
router.get("/", authenticate, getUserClaims);
router.get("/all", authenticate, getAllClaims);
router.get("/unfinished", authenticate, getUnfinishedClaims);

module.exports = router;
