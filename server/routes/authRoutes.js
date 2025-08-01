
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

// Debug route to reset password (remove in production)
router.post("/debug/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const bcrypt = require("bcryptjs");
    const pool = req.app.locals.db;
    const passwordHash = await bcrypt.hash(newPassword, 12);
    
    const result = await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2 RETURNING id, email',
      [passwordHash, email.toLowerCase().trim()]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({ message: "Password updated successfully", user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
