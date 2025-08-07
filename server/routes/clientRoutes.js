
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const clientController = require("../controllers/clientController");

// Apply auth middleware to all routes
router.use(authMiddleware);

// Routes
router.post("/", clientController.createClient);
router.get("/", clientController.getAllClients);
router.get("/:id", clientController.getClientById);
router.put("/:id", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);

module.exports = router;
