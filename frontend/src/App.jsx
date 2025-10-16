import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjetsPage from "./pages/ProjetsPage";
import TachesPage from "./pages/TachesPage";
import UserDashboard from "./pages/utilisateur/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TimeTrackingPage from "./pages/TimeTrackingPage";
import ReportsPage from "./pages/ReportsPage";
import UserProfilePage from "./pages/UserProfilePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./pages/NavBar";

const App = () => {
  return (
    <Router>
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projets" element={<ProjetsPage />} />
          <Route path="/taches" element={<TachesPage />} />
          <Route path="/suivi-temps" element={<TimeTrackingPage />} />
          <Route path="/rapports" element={<ReportsPage />} />
          <Route path="/profil" element={<UserProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
