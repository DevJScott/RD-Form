const Client = require("../models/Client");

// Create a new client
const createClient = async (req, res) => {
  try {
    const { email, companyName, contactName } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if client already exists
    const existingClient = await Client.findOne({ email: email.toLowerCase() });
    if (existingClient) {
      return res.status(400).json({ error: "Client with this email already exists" });
    }

    // Create client
    const client = new Client({
      email: email.toLowerCase(),
      companyName: companyName || "",
      contactName: contactName || ""
    });

    await client.save();

    res.status(201).json({
      message: "Client created successfully",
      client
    });
  } catch (error) {
    console.error("Create client error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json({ clients });
  } catch (error) {
    console.error("Get clients error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get client by ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json({ client });
  } catch (error) {
    console.error("Get client error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, companyName, contactName } = req.body;

    const client = await Client.findByIdAndUpdate(
      id,
      { 
        email: email ? email.toLowerCase() : undefined,
        companyName,
        contactName
      },
      { new: true }
    );

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json({
      message: "Client updated successfully",
      client
    });
  } catch (error) {
    console.error("Update client error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete client
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Delete client error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
};