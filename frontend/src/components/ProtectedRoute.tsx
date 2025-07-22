import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ProtectedRoute: React.FC = () => {
  const { user } = useAuth();
  // If user is null, check localStorage
  if (!user) {
    const local = localStorage.getItem("user");
    if (!local) {
      return <Navigate to="/login" replace />;
    }
  }
  // Fallback: if something goes wrong, show an English message
  if (!user || !user.username) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh">
        <Typography variant="h4" color="error" mb={2}>
          Access denied
        </Typography>
        <Typography variant="body1">
          You must be logged in to view this page.
        </Typography>
      </Box>
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
