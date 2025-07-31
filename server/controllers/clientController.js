
// Create a new client
const createClient = async (req, res) => {
  try {
    const { email, companyName, contactName } = req.body;

    // Input validation
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const pool = req.app.locals.db;

    // Check if client already exists
    const existingClient = await pool.query(
      'SELECT id FROM clients WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (existingClient.rows.length > 0) {
      return res.status(400).json({ error: "Client with this email already exists" });
    }

    // Create client
    const result = await pool.query(
      'INSERT INTO clients (email, company_name, contact_name) VALUES ($1, $2, $3) RETURNING *',
      [
        email.toLowerCase().trim(),
        companyName ? companyName.trim() : null,
        contactName ? contactName.trim() : null
      ]
    );

    res.status(201).json({
      message: "Client created successfully",
      client: result.rows[0]
    });
  } catch (error) {
    console.error("Create client error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const pool = req.app.locals.db;
    
    const result = await pool.query(
      'SELECT * FROM clients ORDER BY created_at DESC'
    );

    res.json({ clients: result.rows });
  } catch (error) {
    console.error("Get clients error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get client by ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID is a number
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid client ID" });
    }

    const pool = req.app.locals.db;
    
    const result = await pool.query(
      'SELECT * FROM clients WHERE id = $1',
      [parseInt(id)]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json({ client: result.rows[0] });
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

    // Validate ID is a number
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid client ID" });
    }

    // Email validation if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
    }

    const pool = req.app.locals.db;

    const result = await pool.query(
      'UPDATE clients SET email = COALESCE($1, email), company_name = COALESCE($2, company_name), contact_name = COALESCE($3, contact_name) WHERE id = $4 RETURNING *',
      [
        email ? email.toLowerCase().trim() : null,
        companyName ? companyName.trim() : null,
        contactName ? contactName.trim() : null,
        parseInt(id)
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json({
      message: "Client updated successfully",
      client: result.rows[0]
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

    // Validate ID is a number
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid client ID" });
    }

    const pool = req.app.locals.db;

    const result = await pool.query(
      'DELETE FROM clients WHERE id = $1 RETURNING *',
      [parseInt(id)]
    );

    if (result.rows.length === 0) {
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
