// src/pages/ClaimsPage.js
import React, { useEffect, useState } from "react";

const ClaimsPage = () => {
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await fetch("/api/claims", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch claims");
        setClaims(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchClaims();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📂 Your Submitted Claims</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {claims.length === 0 ? (
        <p>No claims found.</p>
      ) : (
        <ul>
          {claims.map((claim, index) => (
            <li key={claim.id || index} style={{ marginBottom: "1rem" }}>
              <strong>Company:</strong> {claim.company_name || claim.form_data?.companyName || "Unnamed Company"}<br />
              <strong>Claim Period:</strong> {claim.form_data?.claimStartDate} – {claim.form_data?.claimEndDate}<br />
              <strong>Status:</strong> {claim.is_draft ? "📝 In Progress" : "✅ Complete"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClaimsPage;
