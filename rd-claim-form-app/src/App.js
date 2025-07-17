import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClaimApp from "./components/ClaimApp";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute"; // ✅ new


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ⛔ Only allow access with token */}
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/claim" element={<PrivateRoute><ClaimApp /></PrivateRoute>} />
        

        {/* Optional future protected pages */}
        {/* <Route path="/claims" element={<PrivateRoute><ClaimsPage /></PrivateRoute>} /> */}
      </Routes>
    </Router>
  );
}
export default App;
