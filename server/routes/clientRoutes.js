
const express = require("express");
const {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
} = require("../controllers/clientController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createClient);
router.get("/", authenticate, getAllClients);
router.get("/:id", authenticate, getClientById);
router.patch("/:id", authenticate, updateClient);
router.delete("/:id", authenticate, deleteClient);

module.exports = router;
