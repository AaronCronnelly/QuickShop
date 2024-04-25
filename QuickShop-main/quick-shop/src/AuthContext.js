import React, { createContext, useContext, useState } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // State to manage the user's authentication status and user data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Function to handle user login
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); // Set the user data upon login
  };

  // Function to handle user logout
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null); // Clear the user data upon logout
  };

  // Provide the authentication context value to its children
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children} {/* Render the children components */}
    </AuthContext.Provider>
  );
};
