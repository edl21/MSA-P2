import React from "react";
import { Link } from "react-router-dom";
// import Button from '@mui/material/Button';
import logo from '../assets/dblogo.png'; 
import "./Navbar.css";

const NavBar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <h1 className="navbar-title">BodyHub</h1>
        <Link to="/" className="nav-button">
          Home
        </Link>
        {/* <Link to="/bmi" className="nav-button">
          BMI
        </Link> */}
        <Link to="/about" className="nav-button">
          About
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/signup" className="nav-button">
          Sign Up
        </Link>
        <Link to="/login" className="nav-button">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
