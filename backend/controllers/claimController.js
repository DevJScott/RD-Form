const Claim = require("../models/Claim");

exports.createClaim = async (req, res) => {
  try {
    const claim = new Claim({
      ...req.body,
      userId: req.user._id,
      isComplete: false,
    });
    await claim.save();
    res.status(201).json(claim);
  } catch (err) {
    res.status(500).json({ error: "Error creating claim" });
  }
};

exports.getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find();
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch all claims" });
  }
};

exports.getUserClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ userId: req.user._id });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user's claims" });
  }
};

exports.getUnfinishedClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ userId: req.user._id, isComplete: false });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch unfinished claims" });
  }
};
