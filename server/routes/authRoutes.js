
const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Use the controller functions that work with PostgreSQL
router.post("/register", registerUser);
router.post("/login", loginUser);

// Debug route to check users (remove in production)
router.get("/debug/users", async (req, res) => {
  try {
    const pool = req.app.locals.db;
    const result = await pool.query('SELECT id, email, name, role FROM users');
    res.json({ users: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
