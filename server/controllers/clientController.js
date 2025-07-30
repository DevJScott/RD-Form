const Client = require("../models/Client");

exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    const saved = await client.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
