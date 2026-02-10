import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const admin = localStorage.getItem("admin");
  console.log("AdminProtectedRoute - admin from localStorage:", admin);

  if (!admin) {
    console.log("No admin found, redirecting to /admin-login");
    return <Navigate to="/admin-login" replace />;
  }

  console.log("Admin found, rendering children");
  return children;
};

export default AdminProtectedRoute;
