// src/pages/ClientsPage.js
import { useEffect, useState } from "react";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error("Failed to load clients"));
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map((client) => (
          <li key={client._id}>{client.companyName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
