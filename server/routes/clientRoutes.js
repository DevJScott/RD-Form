const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

// All routes are protected
router.use(authMiddleware);

// Create a new client
router.post("/", createClient);

// Get all clients for the authenticated user
router.get("/", getAllClients);

// Get a specific client by ID
router.get("/:id", getClientById);

// Update a client
router.put("/:id", updateClient);

// Delete a client
router.delete("/:id", deleteClient);

module.exports = router;