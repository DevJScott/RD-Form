import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2>Welcome to Your R&D Dashboard</h2>
      <div className="home-actions">
        <button onClick={() => navigate("/claim")}>➕ Start New Claim</button>
        <button onClick={() => alert("Feature not implemented yet")}>📁 View Past Claims</button>
        <button onClick={() => alert("Feature not implemented yet")}>👥 View Clients</button>
        <button onClick={() => alert("Feature not implemented yet")}>📝 Unfinished Claims</button>
      </div>
    </div>
  );
};

export default HomePage;
