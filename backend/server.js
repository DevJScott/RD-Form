const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const claimRoutes = require("./routes/claimRoutes");
const clientRoutes = require("./routes/clientRoutes"); 
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/claims", claimRoutes);
app.use("/api/clients", clientRoutes); 
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));
