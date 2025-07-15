// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function LoginPage() {
  return <h1 style={{ textAlign: "center", marginTop: "3rem" }}>Login Page Rendered ✅</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
