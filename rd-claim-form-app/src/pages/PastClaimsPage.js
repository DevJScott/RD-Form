// src/pages/PastClaimsPage.js
import { useEffect, useState } from "react";

const PastClaimsPage = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/claims/USER_ID", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setClaims(data);
      } catch (err) {
        console.error("Failed to fetch claims");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  return (
    <div className="claims-list">
      <h2>Past Claims</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {claims.map((claim) => (
            <li key={claim._id}>
              📄 Claim starting {claim.claimStartDate} to {claim.claimEndDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PastClaimsPage;
