const express = require("express");
const mongoose = require("mongoose");
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

// ✅ Debug environment variables
console.log("🔍 MONGO_URI:", process.env.MONGO_URI ? "Found" : "Not found");
console.log("🔍 JWT_SECRET:", process.env.JWT_SECRET ? "Found" : "Not found");
console.log("🔍 Full MONGO_URI (first 20 chars):", process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 20) + "..." : "undefined");

// ✅ Validate MongoDB URI before connecting
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI environment variable is not set!");
  process.exit(1);
}

if (!process.env.MONGO_URI.startsWith('mongodb://') && !process.env.MONGO_URI.startsWith('mongodb+srv://')) {
  console.error("❌ Invalid MongoDB URI format. Must start with mongodb:// or mongodb+srv://");
  console.error("Current URI:", process.env.MONGO_URI);
  process.exit(1);
}

// ✅ Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI.trim())
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
