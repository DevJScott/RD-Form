import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewClaimsPage() {
  const [claims, setClaims] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/claims/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setClaims(data);
      } catch (err) {
        console.error("Failed to fetch claims:", err);
      }
    };

    fetchClaims();
  }, []);

  const filteredClaims = claims.filter((claim) => {
    return (
      claim.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.claimStartDate?.includes(searchTerm) ||
      claim.claimEndDate?.includes(searchTerm)
    );
  });

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

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Company Name</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClaims.map((claim) => (
            <tr key={claim._id}>
              <td className="border p-2">{claim.companyName || "—"}</td>
              <td className="border p-2">{claim.claimStartDate || "—"}</td>
              <td className="border p-2">{claim.claimEndDate || "—"}</td>
              <td className="border p-2">
                {claim.isComplete ? "✅ Complete" : "📝 Draft"}
              </td>
              <td className="border p-2">
                <button
                  className="text-blue-600 underline"
                  onClick={() => navigate(`/claim/${claim._id}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
          {filteredClaims.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                No matching claims found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewClaimsPage;