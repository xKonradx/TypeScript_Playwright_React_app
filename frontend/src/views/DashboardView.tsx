import React, { useState, Suspense } from "react";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../context/I18nContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const HeavyComponent = React.lazy(() => import("../components/HeavyComponent"));

const DashboardView: React.FC = React.memo(() => {
  const { user } = useAuth();
  const t = useI18n();
  const [crash, setCrash] = useState(false);
  const [showHeavy, setShowHeavy] = useState(false);
  if (crash) throw new Error("Crash test error!");
  return (
    <Box p={4} minHeight="80vh">
      <Typography variant="h4" fontWeight={700} mb={2} role="heading" aria-level={1}>{t("dashboard")}</Typography>
      <Typography mb={1} role="status" aria-live="polite">Welcome, {user?.username}!</Typography>
      <Typography mb={2} role="status">Your role: {user?.role}</Typography>
      <Button 
        variant="contained" 
        color="primary"
        aria-label="Dashboard button"
        data-testid="dashboard-btn"
        onClick={() => setShowHeavy(true)}
      >
        {t("dashboard")}
      </Button>
      <Button
        variant="outlined"
        color="error"
        sx={{ ml: 2 }}
        onClick={() => setCrash(true)}
        data-testid="crash-test-btn"
      >
        {t("crashTest")}
      </Button>
      {showHeavy && (
        <Suspense fallback={<div>Loading heavy component...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </Box>
  );
});

export default DashboardView;
