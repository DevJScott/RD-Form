
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registration logic
exports.registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  // Input validation
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Email, password, and name are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const pool = req.app.locals.db;
    
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1', 
      [email.toLowerCase().trim()]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
      [email.toLowerCase().trim(), passwordHash, name.trim(), 'user']
    );

    res.status(201).json({ 
      message: "User registered successfully",
      user: result.rows[0]
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login logic
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  let client;
  try {
    const pool = req.app.locals.db;
    const normalizedEmail = email.toLowerCase().trim();
    
    // Get a dedicated client from the pool with timeout
    client = await pool.connect();
    
    // Find user with timeout
    const result = await Promise.race([
      client.query('SELECT id, email, password, name, role FROM users WHERE email = $1', [normalizedEmail]),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Database query timeout')), 5000))
    ]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    
    // Ensure we always return JSON, never HTML
    if (!res.headersSent) {
      if (err.message === 'Database query timeout') {
        res.status(503).json({ error: "Database temporarily unavailable. Please try again." });
      } else {
        res.status(500).json({ error: "Login failed. Please try again." });
      }
    }
  } finally {
    // Always release the client back to the pool
    if (client) {
      client.release();
    }
  }
};
