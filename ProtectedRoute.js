import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(UserContext);

  // Check if user is authenticated
  if (!user.isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/" />;
  }

  // Check if user's role is allowed for this route
  if (!allowedRoles.includes(user.role)) {
    // Redirect to their dashboard if not authorized for the current route
    return <Navigate to={`/${user.role}dashboard`} />;
  }

  // If authenticated and authorized, render the child components
  return children;
};

export default ProtectedRoute;
