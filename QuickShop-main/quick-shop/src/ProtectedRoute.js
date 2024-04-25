import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { useAuth } from './AuthContext'; // Import useAuth hook

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Access isLoggedIn state from AuthContext

  // If user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the children (i.e., the protected content)
  return children;
};

export default ProtectedRoute;


