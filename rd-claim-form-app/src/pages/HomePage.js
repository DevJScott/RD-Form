import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header>
        <h1>Welcome Back 🎉</h1>
        <p>Select an action below:</p>
      </header>

      <main className="button-grid">
        <button onClick={() => navigate("/claim")}>➕ New Claim</button>
        <button onClick={() => navigate("/claims")}>📂 View All Claims</button>
        <button onClick={() => navigate("/unfinished")}>📝 Unfinished Claims</button>
        <button onClick={() => navigate("/clients")}>👥 Client Info</button>
        <button onClick={() => navigate("/claims")}>📂 View All Claims</button>

      </main>
    </div>
  );
};

export default HomePage;
