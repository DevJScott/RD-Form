// Create client
const createClient = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { email, company_name, contact_name, phone, address } = req.body;

    const result = await req.app.locals.db.query(
      `INSERT INTO clients (user_id, email, company_name, contact_name, phone, address)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, email, company_name, contact_name, phone, address]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({ error: "Failed to create client" });
  }
};

// Get all clients
const getClients = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await req.app.locals.db.query(
      `SELECT * FROM clients WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};

// Get client by ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await req.app.locals.db.query(
      `SELECT * FROM clients WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({ error: "Failed to fetch client" });
  }
};

// Update client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { email, company_name, contact_name, phone, address } = req.body;

    const result = await req.app.locals.db.query(
      `UPDATE clients 
       SET email = $1, company_name = $2, contact_name = $3, phone = $4, address = $5
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [email, company_name, contact_name, phone, address, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ error: "Failed to update client" });
  }
};

// Delete client
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await req.app.locals.db.query(
      `DELETE FROM clients WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ error: "Failed to delete client" });
  }
};

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};