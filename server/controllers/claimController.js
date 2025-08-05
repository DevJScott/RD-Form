// Create a new claim with client association
const createClaim = async (req, res) => {
  try {
    const { formData, isDraft = true, clientId, claimTitle } = req.body;
    const userId = req.user.userId;

    // Input validation
    if (!formData || typeof formData !== "object") {
      return res.status(400).json({ error: "Valid form data is required" });
    }

    // Validate clientId if provided
    if (clientId && !/^\d+$/.test(clientId)) {
      return res.status(400).json({ error: "Invalid client ID" });
    }

    const pool = req.app.locals.db;
    const result = await pool.query(
      "INSERT INTO claims (user_id, client_id, claim_title, form_data, is_draft, current_step) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        userId,
        clientId || null,
        claimTitle || "New R&D Claim",
        JSON.stringify(formData),
        isDraft,
        1,
      ],
    );

    res.status(201).json({
      message: "Claim created successfully",
      claim: result.rows[0],
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

    const claims = result.rows.map((row) => ({
      ...row,
      form_data:
        typeof row.form_data === "string"
          ? JSON.parse(row.form_data)
          : row.form_data,
      client: row.client_id
        ? {
            id: row.client_id,
            email: row.client_email,
            companyName: row.company_name,
            contactName: row.contact_name,
          }
        : null,
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
    const userId = req.user.userId;
    const result = await req.app.locals.db.query(
      `SELECT c.*, cl.company_name, cl.contact_name 
       FROM claims c 
       LEFT JOIN clients cl ON c.client_id = cl.id 
       WHERE c.user_id = $1 
       ORDER BY c.updated_at DESC`,
      [userId],
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching user claims:", error);
    res.status(500).json({ error: "Failed to fetch claims" });
  }
};

const getClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await req.app.locals.db.query(
      `SELECT c.*, cl.company_name, cl.contact_name 
       FROM claims c 
       LEFT JOIN clients cl ON c.client_id = cl.id 
       WHERE c.id = $1 AND c.user_id = $2`,
      [id, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Claim not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching claim:", error);
    res.status(500).json({ error: "Failed to fetch claim" });
  }
};

// Get unfinished claims
const getUnfinishedClaims = async (req, res) => {
  try {
    const userId = req.user.userId;
    const pool = req.app.locals.db;

    const result = await pool.query(
      `
      SELECT c.*, cl.email as client_email, cl.company_name, cl.contact_name
      FROM claims c
      LEFT JOIN clients cl ON c.client_id = cl.id
      WHERE c.is_draft = true AND c.user_id = $1
      ORDER BY c.created_at DESC
    `,
      [userId],
    );

    const claims = result.rows.map((row) => ({
      ...row,
      form_data:
        typeof row.form_data === "string"
          ? JSON.parse(row.form_data)
          : row.form_data,
      client: row.client_id
        ? {
            id: row.client_id,
            email: row.client_email,
            companyName: row.company_name,
            contactName: row.contact_name,
          }
        : null,
    }));

    res.json(claims); // <-- send array directly (not { claims })
  } catch (error) {
    console.error("Get unfinished claims error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update claim with autosave
const updateClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const { formData, isDraft, currentStep, claimTitle } = req.body;
    const userId = req.user.userId;

    const pool = req.app.locals.db;
    const result = await pool.query(
      `UPDATE claims 
       SET form_data = $1, is_draft = $2, current_step = $3, claim_title = $4, 
           last_saved_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $5 AND user_id = $6 
       RETURNING *`,
      [
        JSON.stringify(formData),
        isDraft,
        currentStep || 1,
        claimTitle || "R&D Claim",
        id,
        userId,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Claim not found" });
    }

    const claim = result.rows[0];
    claim.form_data =
      typeof claim.form_data === "string"
        ? JSON.parse(claim.form_data)
        : claim.form_data;

    res.json({
      message: "Claim updated successfully",
      claim,
    });
  } catch (error) {
    console.error("Update claim error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Autosave claim (lightweight update)
const autosaveClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const { formData, currentStep } = req.body;
    const userId = req.user.userId;

    const pool = req.app.locals.db;
    const result = await pool.query(
      `UPDATE claims 
       SET form_data = $1, current_step = $2, last_saved_at = CURRENT_TIMESTAMP 
       WHERE id = $3 AND user_id = $4 
       RETURNING id, last_saved_at`,
      [JSON.stringify(formData), currentStep || 1, id, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Claim not found" });
    }

    res.json({
      message: "Claim autosaved",
      lastSaved: result.rows[0].last_saved_at,
    });
  } catch (err) {
    console.error("Autosave claim error:", err);
    res.status(500).json({ error: "Failed to autosave claim" });
  }
};

const deleteClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const pool = req.app.locals.db;
    const result = await pool.query(
      "DELETE FROM claims WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Claim not found" });
    }

    res.json({ message: "Claim deleted successfully" });
  } catch (err) {
    console.error("Delete claim error:", err);
    res.status(500).json({ error: "Failed to delete claim" });
  }
};

module.exports = {
  createClaim,
  getAllClaims,
  getUserClaims,
  getUnfinishedClaims,
  getClaim,
  updateClaim,
  autosaveClaim,
  deleteClaim,
};
