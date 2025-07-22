import React from "react";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../context/I18nContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const AdminView: React.FC = React.memo(() => {
  const { user } = useAuth();
  const t = useI18n();
  return (
    <Box p={4} minHeight="80vh">
      <Typography variant="h4" fontWeight={700} mb={2} role="heading" aria-level={1}>{t("adminPanel")}</Typography>
      <Typography mb={2} role="status" aria-live="polite">Welcome, {user?.username}! You are an admin.</Typography>
      <Button 
        variant="contained" 
        color="primary"
        aria-label="Admin button"
        sx={{ mr: 2 }}
        component={Link}
        to="/admin/users"
        data-testid="admin-users-link"
      >
        {t("userManagement")}
      </Button>
    </Box>
  );
});

export default AdminView;
