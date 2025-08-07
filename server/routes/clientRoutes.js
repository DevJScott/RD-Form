
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const clientController = require("../controllers/clientController");

// Apply auth middleware to all routes
router.use(authMiddleware);

// Routes with proper parameter syntax
router.post("/", clientController.createClient);
router.get("/", clientController.getAllClients);
router.get("/:id([0-9]+)", clientController.getClientById);
router.put("/:id([0-9]+)", clientController.updateClient);
router.delete("/:id([0-9]+)", clientController.deleteClient);

module.exports = router;
