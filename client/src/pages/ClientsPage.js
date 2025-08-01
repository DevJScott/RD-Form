// src/pages/ClientsPage.js
import { useEffect, useState } from "react";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("/api/clients", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setClients(data.clients || []))
      .catch((err) => console.error("Failed to load clients"));
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>{client.company_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
