import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClaimApp from "./components/ClaimApp";
import HomePage from "./pages/HomePage";
import ViewClaimsPage from "./pages/ViewClaimsPage";
import PrivateRoute from "./components/PrivateRoute"; // ✅
//Import the new page UnfinishedClaimsPage
import UnfinishedClaimsPage from "./pages/UnfinishedClaimsPage";
import ClientsPage from "./pages/ClientsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 Initial route (Login) */}
        <Route path="/" element={<LoginPage />} />

        {/* 👇 Public route */}
        <Route path="/register" element={<RegisterPage />} />

        {/* 👇 Protected routes */}
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/claim" element={<PrivateRoute><ClaimApp /></PrivateRoute>} />
        <Route path="/claim/:claimId" element={<PrivateRoute><ClaimApp /></PrivateRoute>} />
        <Route path="/claims" element={<PrivateRoute><ViewClaimsPage /></PrivateRoute>} />
        <Route path="/unfinished-claims" element={<PrivateRoute><UnfinishedClaimsPage /></PrivateRoute>} />
        <Route path="/clients" element={<PrivateRoute><ClientsPage /></PrivateRoute>} />

        {/* Optional fallback route (404) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;