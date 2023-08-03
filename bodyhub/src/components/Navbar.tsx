import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/dblogo.png";
import "./Navbar.css";
import { useAuth } from "../AuthContext"; // Import the auth context

const NavBar: React.FC = () => {
  const { user, logout } = useAuth(); // Access user and logout function from context

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <h1 className="navbar-title">BodyHub</h1>
        <Link to="/" className="nav-button">
          Home
        </Link>
        <Link to="/about" className="nav-button">
          About
        </Link>
        {user && (
          <Link to="/history" className="nav-button">
            History
          </Link>
        )}
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <div className="welcome-message">Welcome, {user.username}</div>

            <button onClick={logout} className="nav-button">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="nav-button">
              Sign Up
            </Link>
            <Link to="/login" className="nav-button">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
