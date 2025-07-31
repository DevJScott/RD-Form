
const Claim = require("../models/Claim");
const Client = require("../models/Client");

// Create a new claim
const createClaim = async (req, res) => {
  try {
    const { clientId, formData, isDraft = true } = req.body;

    // Validate required fields
    if (!formData) {
      return res.status(400).json({ error: "Form data is required" });
    }

    // Create new claim
    const claim = new Claim({
      client: clientId || null,
      formData,
      isDraft,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await claim.save();

    res.status(201).json({
      message: "Claim created successfully",
      claim
    });
  } catch (error) {
    console.error("Create claim error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all claims (admin only)
const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate('client')
      .sort({ createdAt: -1 });

    res.json({ claims });
  } catch (error) {
    console.error("Get all claims error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user's claims
const getUserClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate('client')
      .sort({ createdAt: -1 });

    res.json({ claims });
  } catch (error) {
    console.error("Get user claims error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get unfinished claims
const getUnfinishedClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ isDraft: true })
      .populate('client')
      .sort({ createdAt: -1 });

    res.json({ claims });
  } catch (error) {
    console.error("Get unfinished claims error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a claim
const updateClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const { formData, isDraft } = req.body;

    const claim = await Claim.findByIdAndUpdate(
      id,
      { 
        formData, 
        isDraft, 
        updatedAt: new Date() 
      },
      { new: true }
    ).populate('client');

    if (!claim) {
      return res.status(404).json({ error: "Claim not found" });
    }

    res.json({
      message: "Claim updated successfully",
      claim
    });
  } catch (error) {
    console.error("Update claim error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a claim
const deleteClaim = async (req, res) => {
  try {
    const { id } = req.params;

    const claim = await Claim.findByIdAndDelete(id);

    if (!claim) {
      return res.status(404).json({ error: "Claim not found" });
    }

    res.json({ message: "Claim deleted successfully" });
  } catch (error) {
    console.error("Delete claim error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createClaim,
  getAllClaims,
  getUserClaims,
  getUnfinishedClaims,
  updateClaim,
  deleteClaim
};
