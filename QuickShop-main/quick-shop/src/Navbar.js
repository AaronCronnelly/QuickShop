import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './assets/images/logo.png';
import { useAuth } from './AuthContext'; // Import useAuth hook

const Navbar = () => {
  // Access isLoggedIn and logout function from AuthContext
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* Logo */}
        <img src={logo} alt="QuickShop Logo" className="navbar-logo" />
      </div>
      <div className="navbar-links">
        {/* Navigation Links */}
        <NavLink to="/" activeClassName="navbar-active">Home</NavLink>
        <NavLink to="/services" activeClassName="navbar-active">Services</NavLink> 

        {/* NavLink for Admin page (commented out for now) */}
        {/* <NavLink to="/admin" activeClassName="navbar-active">AdminTesting</NavLink> */}
        
        {/* Conditional rendering based on isLoggedIn */}
        {!isLoggedIn ? (
          // If not logged in, show Login and Register links
          <>
            <NavLink to="/login" activeClassName="navbar-active">Login</NavLink>
            <NavLink to="/RegisterPage" activeClassName="navbar-active">Register</NavLink>
          </>
        ) : (
          // If logged in, show Profile link
          <>
            <NavLink to="/profile" activeClassName="navbar-active">Profile</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
