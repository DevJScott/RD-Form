const express = require("express");
const router = express.Router();
const {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
} = require("../controllers/clientController");

// Create a new client
router.post("/", createClient);

// Get all clients for a user
router.get("/", getAllClients);

// Get a specific client by ID
router.get("/:id([0-9]+)", getClientById);

// Update a client
router.put("/:id([0-9]+)", updateClient);

// Delete a client
router.delete("/:id([0-9]+)", deleteClient);

module.exports = router;