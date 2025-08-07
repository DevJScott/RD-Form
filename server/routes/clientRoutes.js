
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Safely require controller with error handling
let clientController;
try {
  clientController = require("../controllers/clientController");
} catch (err) {
  console.error("Error loading clientController:", err.message);
  clientController = {};
}

// Apply auth middleware to all routes
router.use(authMiddleware);

// Fallback function for missing controllers
const fallback = (req, res) => res.status(501).json({ error: "Controller method not implemented" });

// Routes
router.post("/", clientController.createClient || fallback);
router.get("/", clientController.getAllClients || fallback);
router.get("/:id", clientController.getClientById || fallback);
router.put("/:id", clientController.updateClient || fallback);
router.delete("/:id", clientController.deleteClient || fallback);

module.exports = router;
