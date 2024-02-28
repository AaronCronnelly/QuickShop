// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './assets/images/logo.png'; // Ensure the path to the logo is correct


const Navbar = () => {
  return (
    <nav className="navbar">
      {/* The logo image is now placed inside an img tag and wrapped with a div */}
      <div className="navbar-brand">
        <img src={logo} alt="QuickShop Logo" className="navbar-logo" />
      </div>
      <div className="navbar-links">
        <NavLink to="/" exact activeClassName="navbar-active">Home</NavLink>
        <NavLink to="/about" activeClassName="navbar-active">About</NavLink>
        <NavLink to="/login" activeClassName="navbar-active">Login</NavLink>
        <NavLink to="/services" activeClassName="navbar-active">Services</NavLink>
        {/* Make sure your route paths are correctly defined */}
      </div>
    </nav>
  );
};

export default Navbar;

