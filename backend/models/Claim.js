const mongoose = require("mongoose");

const ClaimSchema = new mongoose.Schema({
  formData: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Claim", ClaimSchema);
