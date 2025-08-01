
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UnfinishedClaimsPage() {
  const [claims, setClaims] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
        console.log("Fetched unfinished claims:", data);
        setClaims(data.claims || []);
      } catch (err) {
        console.error("Failed to fetch unfinished claims:", err);
        setError("Failed to load unfinished claims. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUnfinishedClaims();
  }, []);

  const filteredClaims = claims.filter((claim) => {
    const companyName = claim.client?.companyName || claim.form_data?.companyName || "";
    const startDate = claim.form_data?.claimStartDate || "";
    const endDate = claim.form_data?.claimEndDate || "";
    
    return (
      companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startDate.includes(searchTerm) ||
      endDate.includes(searchTerm)
    );
  });

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">📝 Unfinished Claims</h2>
        <p>Loading unfinished claims...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">📝 Unfinished Claims</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📝 Unfinished Claims</h2>

      <input
        type="text"
        placeholder="Search by company or date..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-3 py-2 mb-4 w-full max-w-md"
      />

      {claims.length === 0 ? (
        <p>No unfinished claims found. All your claims appear to be complete!</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Company Name</th>
              <th className="border p-2">Claim Title</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">End Date</th>
              <th className="border p-2">Current Step</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClaims.map((claim) => (
              <tr key={claim.id}>
                <td className="border p-2">
                  {claim.client?.companyName || claim.form_data?.companyName || "—"}
                </td>
                <td className="border p-2">
                  {claim.claim_title || "R&D Claim"}
                </td>
                <td className="border p-2">
                  {claim.form_data?.claimStartDate || "—"}
                </td>
                <td className="border p-2">
                  {claim.form_data?.claimEndDate || "—"}
                </td>
                <td className="border p-2">
                  Step {claim.current_step || 1} of 6
                </td>
                <td className="border p-2">
                  <button
                    className="text-blue-600 underline mr-2"
                    onClick={() => navigate(`/claim/${claim.id}`)}
                  >
                    Continue
                  </button>
                  <button
                    className="text-red-600 underline"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this unfinished claim?")) {
                        // Add delete functionality here
                        console.log("Delete claim:", claim.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredClaims.length === 0 && claims.length > 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No matching unfinished claims found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UnfinishedClaimsPage;
