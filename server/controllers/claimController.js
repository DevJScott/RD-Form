
// Create a new claim
const createClaim = async (req, res) => {
  try {
    const { clientId, formData, isDraft = true } = req.body;
    const userId = req.user.userId; // From auth middleware

    // Input validation
    if (!formData || typeof formData !== 'object') {
      return res.status(400).json({ error: "Valid form data is required" });
    }

    // Validate clientId if provided
    if (clientId && !/^\d+$/.test(clientId)) {
      return res.status(400).json({ error: "Invalid client ID" });
    }

    const pool = req.app.locals.db;

    // Create claim
    const result = await pool.query(
      'INSERT INTO claims (client_id, form_data, is_draft, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
      [
        clientId ? parseInt(clientId) : null,
        JSON.stringify(formData),
        isDraft
      ]
    );

    res.status(201).json({
      message: "Claim created successfully",
      claim: result.rows[0]
    });
  } catch (error) {
    console.error("Create claim error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all claims (admin only)
const getAllClaims = async (req, res) => {
  try {
    const pool = req.app.locals.db;

    const result = await pool.query(`
      SELECT c.*, cl.email as client_email, cl.company_name, cl.contact_name
      FROM claims c
      LEFT JOIN clients cl ON c.client_id = cl.id
      ORDER BY c.created_at DESC
    `);

    const claims = result.rows.map(row => ({
      ...row,
      form_data: typeof row.form_data === 'string' ? JSON.parse(row.form_data) : row.form_data,
      client: row.client_id ? {
        id: row.client_id,
        email: row.client_email,
        companyName: row.company_name,
        contactName: row.contact_name
      } : null
    }));

    res.json({ claims });
  } catch (error) {
    console.error("Get all claims error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user's claims
const getUserClaims = async (req, res) => {
  try {
    const pool = req.app.locals.db;

    const result = await pool.query(`
      SELECT c.*, cl.email as client_email, cl.company_name, cl.contact_name
      FROM claims c
      LEFT JOIN clients cl ON c.client_id = cl.id
      ORDER BY c.created_at DESC
    `);

    const claims = result.rows.map(row => ({
      ...row,
      form_data: typeof row.form_data === 'string' ? JSON.parse(row.form_data) : row.form_data,
      client: row.client_id ? {
        id: row.client_id,
        email: row.client_email,
        companyName: row.company_name,
        contactName: row.contact_name
      } : null
    }));

    res.json({ claims });
  } catch (error) {
    console.error("Get user claims error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get unfinished claims
const getUnfinishedClaims = async (req, res) => {
  try {
    const pool = req.app.locals.db;

    const result = await pool.query(`
      SELECT c.*, cl.email as client_email, cl.company_name, cl.contact_name
      FROM claims c
      LEFT JOIN clients cl ON c.client_id = cl.id
      WHERE c.is_draft = true
      ORDER BY c.created_at DESC
    `);

    const claims = result.rows.map(row => ({
      ...row,
      form_data: typeof row.form_data === 'string' ? JSON.parse(row.form_data) : row.form_data,
      client: row.client_id ? {
        id: row.client_id,
        email: row.client_email,
        companyName: row.company_name,
        contactName: row.contact_name
      } : null
    }));

    res.json({ claims });
  } catch (error) {
    console.error("Get unfinished claims error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a claim
const updateClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const { formData, isDraft } = req.body;

    // Validate ID is a number
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid claim ID" });
    }

    // Input validation
    if (formData && typeof formData !== 'object') {
      return res.status(400).json({ error: "Valid form data is required" });
    }

    const pool = req.app.locals.db;

    const result = await pool.query(
      'UPDATE claims SET form_data = COALESCE($1, form_data), is_draft = COALESCE($2, is_draft), updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [
        formData ? JSON.stringify(formData) : null,
        isDraft,
        parseInt(id)
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Claim not found" });
    }

    const claim = result.rows[0];
    claim.form_data = typeof claim.form_data === 'string' ? JSON.parse(claim.form_data) : claim.form_data;

    res.json({
      message: "Claim updated successfully",
      claim
    });
  } catch (error) {
    console.error("Update claim error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a claim
const deleteClaim = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID is a number
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid claim ID" });
    }

    const pool = req.app.locals.db;

    const result = await pool.query(
      'DELETE FROM claims WHERE id = $1 RETURNING *',
      [parseInt(id)]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Claim not found" });
    }

    res.json({ message: "Claim deleted successfully" });
  } catch (error) {
    console.error("Delete claim error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createClaim,
  getAllClaims,
  getUserClaims,
  getUnfinishedClaims,
  updateClaim,
  deleteClaim
};
