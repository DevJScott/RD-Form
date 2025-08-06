const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Make pool available to routes
app.locals.db = pool;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const claimRoutes = require("./routes/claimRoutes");
const clientRoutes = require("./routes/clientRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/clients", clientRoutes);

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../client/build")));

// Catch all handler for React Router - make sure this doesn't conflict with API routes
app.get("*", (req, res) => {
  // Only serve index.html for non-API routes
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  } else {
    res.status(404).json({ error: "API endpoint not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});