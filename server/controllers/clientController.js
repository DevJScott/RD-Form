
// Create a new client
const createClient = async (req, res) => {
  try {
    const { email, company_name, contact_name, phone, address } = req.body;
    const userId = req.user.id;
    const pool = req.app.locals.db;
    
    const result = await pool.query(
      'INSERT INTO clients (user_id, email, company_name, contact_name, phone, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, email, company_name, contact_name, phone, address]
    );
    
    res.status(201).json({ success: true, client: result.rows[0] });
  } catch (error) {
    console.error('Create client error:', error);
    if (error.code === '23505') { // Unique constraint violation
      res.status(400).json({ error: 'Client with this email already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create client' });
    }
  }
};

// Get all clients for a user
const getAllClients = async (req, res) => {
  try {
    const userId = req.user.id;
    const pool = req.app.locals.db;
    
    const result = await pool.query(
      'SELECT * FROM clients WHERE user_id = $1 ORDER BY company_name ASC',
      [userId]
    );
    
    res.json({ success: true, clients: result.rows });
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ error: 'Failed to get clients' });
  }
};

// Get a specific client by ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const pool = req.app.locals.db;
    
    const result = await pool.query(
      'SELECT * FROM clients WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    res.json({ success: true, client: result.rows[0] });
  } catch (error) {
    console.error('Get client error:', error);
    res.status(500).json({ error: 'Failed to get client' });
  }
};

// Update a client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { email, company_name, contact_name, phone, address } = req.body;
    const pool = req.app.locals.db;
    
    const result = await pool.query(
      'UPDATE clients SET email = $1, company_name = $2, contact_name = $3, phone = $4, address = $5 WHERE id = $6 AND user_id = $7 RETURNING *',
      [email, company_name, contact_name, phone, address, id, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    res.json({ success: true, client: result.rows[0] });
  } catch (error) {
    console.error('Update client error:', error);
    if (error.code === '23505') { // Unique constraint violation
      res.status(400).json({ error: 'Client with this email already exists' });
    } else {
      res.status(500).json({ error: 'Failed to update client' });
    }
  }
};

// Delete a client
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const pool = req.app.locals.db;
    
    const result = await pool.query(
      'DELETE FROM clients WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    res.json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({ error: 'Failed to delete client' });
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
};
