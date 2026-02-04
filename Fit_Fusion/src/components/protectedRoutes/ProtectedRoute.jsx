/*
  Component: ProtectedRoute
  Purpose: Protects routes from unauthorized access.
           Only logged-in users can access protected pages.
  How it works:
  - Checks if user is logged in using useUser hook
  - If logged in: Shows the page
  - If not logged in: Redirects to login page with a notification
*/

import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  // Get user authentication status from context
  const { isAuthenticated, isLoading } = useUser();
  // Check for authentication status
  // Note: We removed the toast notification here to avoid race conditions 
  // where a user logs in, navigates, and sees a "Please login" error momentarily.


  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'white',
        fontSize: '1.5rem',
      }}>
        Loading...
      </div>
    );
  }

  // If user is NOT logged in, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user IS logged in, show the protected page
  return children;
}

export default ProtectedRoute;
