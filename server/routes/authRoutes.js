const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Use the controller functions that work with PostgreSQL
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;