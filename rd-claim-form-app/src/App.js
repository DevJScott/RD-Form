import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage"; // ✅ New import
import ClaimApp from "./components/ClaimApp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />         {/* ✅ Home route */}
        <Route path="/claim" element={<ClaimApp />} />
      </Routes>
    </Router>
  );
}

export default App;
