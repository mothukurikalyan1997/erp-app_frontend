import React from "react";
import { Navigate } from "react-router-dom"; // Use Navigate to redirect
import { useLocation } from "react-router-dom"; // To track the current location

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const location = useLocation(); // Get the current location for redirect

  

  // If there is no token (user is not authenticated), redirect to login page
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the requested component
  return element;
};

export default ProtectedRoute;
