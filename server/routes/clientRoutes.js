const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const clientController = require("../controllers/clientController");

// All routes are protected
router.use(authMiddleware);

// Create a new client
router.post("/", clientController.createClient);

// Get all clients for a user
router.get("/", clientController.getAllClients);

// Get a specific client by ID
router.get("/:id", clientController.getClientById);

// Update a client
router.put("/:id", clientController.updateClient);

// Delete a client
router.delete("/:id", clientController.deleteClient);

module.exports = router;