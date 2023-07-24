import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/dblogo.png";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <img src={logo} alt="Logo" className="navbar-logo" />

      <div className="navbar-menu">
        <Link to="/" className="nav-link">
          <button className="nav-button">Home</button>
        </Link>
        <Link to="/bmi" className="nav-link">
          <button className="nav-button">BMI</button>
        </Link>
        <Link to="/about" className="nav-link">
          <button className="nav-button">About</button>
        </Link>
      </div>

      <div>
        <Link to="/login" className="nav-link">
          <button className="login-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
