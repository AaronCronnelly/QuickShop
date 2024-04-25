import React, { createContext, useContext, useState } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // State to manage the user's authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle user login
  const login = () => setIsLoggedIn(true);

  // Function to handle user logout
  const logout = () => setIsLoggedIn(false);

  // Provide the authentication context value to its children
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children} {/* Render the children components */}
    </AuthContext.Provider>
  );
};
