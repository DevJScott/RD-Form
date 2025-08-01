// src/pages/UnfinishedClaimsPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UnfinishedClaimsPage = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnfinishedClaims = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/claims/unfinished", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setClaims(data || []);
      } catch (err) {
        console.error("Failed to load unfinished claims:", err);
        setError("Failed to load unfinished claims. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUnfinishedClaims();
  }, []);

  if (loading) return <div>Loading unfinished claims...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📝 Unfinished Claims</h2>
      {claims.length === 0 ? (
        <p>No unfinished claims found.</p>
      ) : (
        <div>
          {claims.map((claim) => (
            <div key={claim.id} style={{ 
              border: "1px solid #ccc", 
              padding: "1rem", 
              marginBottom: "1rem",
              borderRadius: "4px"
            }}>
              <strong>Company:</strong> {claim.company_name || claim.form_data?.companyName || "Unnamed Company"}<br />
              <strong>Status:</strong> 📝 Draft<br />
              <strong>Created:</strong> {new Date(claim.created_at).toLocaleDateString()}<br />
              <button 
                onClick={() => navigate(`/claim/${claim.id}`)}
                style={{ marginTop: "0.5rem", padding: "0.3rem 0.8rem" }}
              >
                Continue Editing
              </button>
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={() => navigate("/home")}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default UnfinishedClaimsPage;