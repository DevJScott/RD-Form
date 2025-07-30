const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const claimRoutes = require("./routes/claimRoutes");
const clientRoutes = require("./routes/clientRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ CORS: allow frontend (localhost + GitHub Pages + Replit)
const allowedOrigins = [
  "http://localhost:3000",
  "https://devjscott.github.io",
  "https://<your-replit-username>.<your-replit-project>.repl.co"  // replace this with your actual Replit URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());

// ✅ API Routes
app.use("/api/claims", claimRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/auth", authRoutes);

// ✅ Serve frontend static files (React build)
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  const PORT = process.env.PORT || 3000; // Replit prefers 3000
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => console.error("❌ MongoDB connection error:", err));
