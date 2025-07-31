const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });

// ✅ Import your route handlers
const claimRoutes = require("./routes/claimRoutes");
const clientRoutes = require("./routes/clientRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ CORS setup (adjust origins as needed)
const allowedOrigins = [
  "http://localhost:3000",
  "https://devjscott.github.io",
  `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

// ✅ Middleware
app.use(express.json());

// ✅ API routes
app.use("/api/claims", claimRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/auth", authRoutes);

// ✅ Serve React frontend (built version)
app.use(express.static(path.join(__dirname, "../client/build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// ✅ Clean and validate environment variables
let databaseUrl = process.env.DATABASE_URL;
let jwtSecret = process.env.JWT_SECRET;

// Clean up potential formatting issues
if (jwtSecret && jwtSecret.startsWith('JWT_SECRET=')) {
  jwtSecret = jwtSecret.substring('JWT_SECRET='.length);
}

// Trim any whitespace
databaseUrl = databaseUrl ? databaseUrl.trim() : null;
jwtSecret = jwtSecret ? jwtSecret.trim() : null;

// ✅ Debug environment variables
console.log("🔍 DATABASE_URL:", databaseUrl ? "Found" : "Not found");
console.log("🔍 JWT_SECRET:", jwtSecret ? "Found" : "Not found");

// ✅ Set up PostgreSQL connection pool
let pool;
if (databaseUrl) {
  pool = new Pool({
    connectionString: databaseUrl,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
} else {
  console.error("❌ DATABASE_URL environment variable is not set!");
  console.log("💡 Please create a PostgreSQL database in Replit");
  process.exit(1);
}

// ✅ Test database connection and start server
async function startServer() {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL connected");
    
    // Create tables if they don't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        email VARCHAR(255) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        contact_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, email)
      )
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS claims (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
        claim_title VARCHAR(255),
        form_data JSONB NOT NULL DEFAULT '{}',
        is_draft BOOLEAN DEFAULT true,
        current_step INTEGER DEFAULT 1,
        last_saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    client.release();
    console.log("✅ Database tables created/verified");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ PostgreSQL connection error:", err);
    process.exit(1);
  }
}

// Export pool for use in other files
app.locals.db = pool;

startServer();
