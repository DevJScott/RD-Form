const Claim = require("../models/Claim");

exports.createClaim = async (req, res) => {
  try {
    const newClaim = new Claim({ formData: req.body });
    const saved = await newClaim.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getClaims = async (req, res) => {
  try {
    const claims = await Claim.find();
    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
