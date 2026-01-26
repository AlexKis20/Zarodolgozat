import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const loggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("kosar");
    navigate("/Hirek");
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <Link to="/Hirek" className="link" onClick={() => setMenuOpen(false)}>
            Nyitólap
          </Link>
          <Link to="/Termekek" className="link" onClick={() => setMenuOpen(false)}>
            Termékek
          </Link>
          <Link to="/KeresNev" className="link" onClick={() => setMenuOpen(false)}>
            Keresés
          </Link>
          <Link to="/MarkaKeres" className="link" onClick={() => setMenuOpen(false)}>
            Márkák
          </Link>
          {loggedIn && role === "admin" && (
            <Link to="/admin" className="link" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          )}
          {loggedIn && role === "user" && (
            <Link to="/user" className="link" onClick={() => setMenuOpen(false)}>
              Kosár
            </Link>
          )}
        </div>
      </div>
      
        {/* 🔥 KÖZÉPSŐ DÍSZ FELIRAT */}
  <div className="navbar-center">
    NEXTIFY
  </div>
{/*jobb oldal */}

      <div className="navbar-right">
        {loggedIn ? (
          <button className="logoutButton" onClick={handleLogout}>
            Kijelentkezés
          </button>
        ) : (
          <Link to="/login" className="loginButton">
            Bejelentkezés
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
