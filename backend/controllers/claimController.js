const Claim = require("../models/Claim");

exports.createClaim = async (req, res) => {
  try {
    const claim = new Claim(req.body);
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
    const claims = await Claim.find({ userId: req.params.userId });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user's claims" });
  }
};

exports.getUnfinishedClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ userId: req.params.userId, isComplete: false });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch unfinished claims" });
  }
};
