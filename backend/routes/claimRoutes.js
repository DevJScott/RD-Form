const express = require("express");
const { createClaim, getClaims } = require("../controllers/claimController");

const router = express.Router();

router.post("/", createClaim);
router.get("/", getClaims);

module.exports = router;
