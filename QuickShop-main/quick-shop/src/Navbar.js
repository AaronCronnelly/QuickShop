// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './assets/images/logo.png'; 


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="QuickShop Logo" className="navbar-logo" />
      </div>
      <div className="navbar-links">
        <NavLink to="/" exact activeClassName="navbar-active">Home</NavLink>
        {/*<NavLink to="#about-section" activeClassName="navbar-active">About</NavLink>*/}
        <NavLink to="/login" activeClassName="navbar-active">Login</NavLink>
        <NavLink to="/RegisterPage" activeClassName="navbar-active">Register</NavLink>
        <NavLink to="/services" activeClassName="navbar-active">Services</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

