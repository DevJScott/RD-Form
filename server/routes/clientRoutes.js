const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

// Apply auth middleware to protected routes
router.post("/", authMiddleware, createClient);
router.get("/", authMiddleware, getClients);
router.get("/:id", authMiddleware, getClientById);
router.put("/:id", authMiddleware, updateClient);
router.delete("/:id", authMiddleware, deleteClient);

module.exports = router;