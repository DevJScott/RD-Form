const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const claimRoutes = require("./routes/claimRoutes");
const clientRoutes = require("./routes/clientRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ CORS: allow frontend (local + GitHub Pages)
const allowedOrigins = [
  "http://localhost:3000",
  "https://devjscott.github.io"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());

// ✅ API Routes
app.use("/api/claims", claimRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/auth", authRoutes);

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => console.error("❌ MongoDB connection error:", err));
