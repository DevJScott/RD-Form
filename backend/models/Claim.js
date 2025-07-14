const mongoose = require("mongoose");

const ClaimSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" }, // link to client
  formData: { type: Object, required: true },
  isDraft: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Claim", ClaimSchema);
