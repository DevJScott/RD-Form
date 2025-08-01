import { useNavigate } from "react-router-dom";
import "../styles/home.css";


const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // redirect to login page
  };

  return (
    <div className="home-container">
  <img src="/assets/branding/logo-dark-bg.png" alt="Logo" className="top-left-logo" />

  <h1>Welcome to the R&D Claim App</h1>

  <div className="button-group">
    <button onClick={() => navigate("/claim")}>➕ Create New Claim</button>
    <button onClick={() => navigate("/claims")}>📂 View All Claims</button>
    <button onClick={() => navigate("/unfinished-claims")}>📝 Unfinished Claims</button>
    <button onClick={() => navigate("/clients")}>👥 Client Info</button>
  </div>

  <button className="logout-button" onClick={handleLogout}>
    🚪 Sign Out
  </button>
</div>

  );
};

export default HomePage;
