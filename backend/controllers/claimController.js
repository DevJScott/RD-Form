const Claim = require("../models/Claim");

exports.createClaim = async (req, res) => {
  try {
    const { formData, isDraft, clientId } = req.body;

    const newClaim = new Claim({
      formData,
      isDraft: isDraft ?? true,
      client: clientId,
    });

    const saved = await newClaim.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getClaims = async (req, res) => {
  try {
    const claims = await Claim.find().populate("client");
    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
