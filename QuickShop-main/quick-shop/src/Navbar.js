import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './assets/images/logo.png';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="QuickShop Logo" className="navbar-logo" />
      </div>
      <div className="navbar-links">
        <NavLink to="/" activeClassName="navbar-active">Home</NavLink>
        <NavLink to="/services" activeClassName="navbar-active">Services</NavLink> {/* Always visible */}
        
        {/* Conditional rendering based on isLoggedIn */}
        {!isLoggedIn ? (
          <>
            <NavLink to="/login" activeClassName="navbar-active">Login</NavLink>
            <NavLink to="/RegisterPage" activeClassName="navbar-active">Register</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/profile" activeClassName="navbar-active">Profile</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



