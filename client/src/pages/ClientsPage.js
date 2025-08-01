// src/pages/ClientsPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setClients(data.clients || []);
      } catch (err) {
        console.error("Failed to load clients:", err);
        setError("Failed to load clients. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <div>Loading clients...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👥 Client Information</h2>
      {clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <div>
          {clients.map((client) => (
            <div key={client.id} style={{ 
              border: "1px solid #ccc", 
              padding: "1rem", 
              marginBottom: "1rem",
              borderRadius: "4px"
            }}>
              <strong>Company:</strong> {client.company_name}<br />
              <strong>Contact:</strong> {client.contact_name}<br />
              <strong>Email:</strong> {client.email}<br />
              {client.phone && <><strong>Phone:</strong> {client.phone}<br /></>}
              {client.address && <><strong>Address:</strong> {client.address}<br /></>}
              <strong>Added:</strong> {new Date(client.created_at).toLocaleDateString()}
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

export default ClientsPage;
