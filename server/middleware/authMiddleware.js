
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No valid token provided." });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database to ensure they still exist
    const pool = req.app.locals.db;
    const result = await pool.query(
      'SELECT id, email, name, role FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid token. User not found." });
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      ...result.rows[0]
    };
    
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Invalid token." });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token expired." });
    }
    
    res.status(500).json({ error: "Server error during authentication." });
  }
};

module.exports = authenticate;
