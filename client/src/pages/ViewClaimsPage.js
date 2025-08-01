import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ViewClaimsPage() {
  const [claims, setClaims] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/claims/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setClaims(data);
      } catch (err) {
        console.error("Failed to fetch claims:", err);
        setError("Failed to load claims. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const filteredClaims = claims.filter((claim) => {
    const companyName =
      claim.company_name || claim.form_data?.companyName || "";
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
        <h2 className="text-2xl font-semibold mb-4">📁 All Submitted Claims</h2>
        <p>Loading claims...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">📁 All Submitted Claims</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📁 All Submitted Claims</h2>

      <input
        type="text"
        placeholder="Search by company or date..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-3 py-2 mb-4 w-full max-w-md"
      />

      {claims.length === 0 ? (
        <p>No claims found. Start by creating your first claim!</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Company Name</th>
              <th className="border p-2">Claim Title</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">End Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClaims.map((claim) => (
              <tr key={claim.id}>
                <td className="border p-2">
                  {claim.company_name || claim.form_data?.companyName || "—"}
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
                  {claim.is_draft ? "📝 Draft" : "✅ Complete"}
                </td>
                <td className="border p-2">
                  <button
                    className="text-blue-600 underline mr-2"
                    onClick={() => navigate(`/claim/${claim.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-green-600 underline"
                    onClick={() => navigate(`/claim/${claim.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filteredClaims.length === 0 && claims.length > 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No matching claims found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewClaimsPage;
