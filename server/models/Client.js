const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  companyName: String,
  contactName: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", ClientSchema);
