// App.js
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './Navbar';

import Login from './Login';
import Register from './Register';
//Bejelentkezés nélküli menük

import Termekek from './Termekek/Termekek';
import KeresNev from './Kereses/KeresNev';
import MarkaKeres from './Marka/MarkaKeres';
import Hirek from './Hirek/Hirek';
//Admin menük
import Vezerlopult from './pages/admin/vezerlopult';
import Kezdolap from './pages/admin/kezdolap';
import Termek from './pages/admin/termek';
import Marka from './pages/admin/marka';
import Tipus from './pages/admin/tipus';
import Velemeny from './pages/admin/velemeny';
import Akcio from './pages/admin/akcio/Akcio';
//Sidebar
import Sidebar from './components/Sidebar';
//User menük
import User from './User/User';
import { Import } from 'lucide-react';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  if (role && userRole !== role) return <Navigate to="/Hirek" />;

  return children;
};


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Hirek />} />
      <Route path="/Hirek" element={<Hirek />} />
      <Route path="/Termekek" element={<Termekek />} />
      <Route path="/KeresNev" element={<KeresNev />} />
      <Route path="/MarkaKeres" element={<MarkaKeres />} />

      {/* Bejelentkezés */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <User />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <Vezerlopult />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/vezerlopult"
        element={
          <ProtectedRoute role="admin">
            <Vezerlopult />
          </ProtectedRoute>
        }
      />
      {/* Bejelentkezés vége */}
    </Routes>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      {/* Admin route-ok */}
      <Route path="/admin/*" element={
        <Routes>
          <Route path="/" element={
            <ProtectedRoute role="admin">
              <Vezerlopult />
            </ProtectedRoute>
          } />
          <Route path="vezerlopult" element={
            <ProtectedRoute role="admin">
              <Vezerlopult />
            </ProtectedRoute>
          } />
          <Route path="kezdolap" element={
            <ProtectedRoute role="admin">
              <Kezdolap />
          </ProtectedRoute>
          } />
          <Route path="termek" element={
            <ProtectedRoute role="admin">
              <Termek />
            </ProtectedRoute>
          } />
          <Route path="marka" element={
            <ProtectedRoute role="admin">
              <Marka />
            </ProtectedRoute>
          } />
          <Route path="tipus" element={
            <ProtectedRoute role="admin">
              <Tipus />
            </ProtectedRoute>
          } />
          <Route path="akcio" element={
            <ProtectedRoute role="admin">
              <Akcio />
            </ProtectedRoute>
          } />
          <Route path="velemeny" element={
            <ProtectedRoute role="admin">
              <Velemeny />
          </ProtectedRoute>
          } />
        </Routes>
      } />
    </Routes>
  );
}

function AppLayout() {
  const location = useLocation();
  const adminOldal = location.pathname.startsWith('/admin');
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      {adminOldal ? (
        <>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
          <div style={{
                marginLeft: sidebar ? "250px" : "0",
                transition: "margin-left 350ms",
                paddingTop: "15px"
            }}>
              <AdminRoutes />
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className="container mt-3">
            <AppRoutes />
          </div>
        </>
      )}
    </>
  );
}

// App komponens
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
