import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useI18n } from "../context/I18nContext";

const LoginView: React.FC = React.memo(() => {
  const [error, setError] = useState("");
  const t = useI18n();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh">
      <Typography variant="h3" fontWeight={700} mb={4} role="heading" aria-level={1}>{t("login")}</Typography>
      {error && <Typography color="error" mb={2} data-testid="login-error" role="alert" aria-live="polite">{error}</Typography>}
      <LoginForm onError={setError} />
      <Typography mt={2}>
        {t("register").includes("Zarejestruj") ? (
          <span>{t("register")}? <Link to="/register" aria-label="Go to registration page">{t("register")}</Link></span>
        ) : (
          <>Don't have an account? <Link to="/register" aria-label="Go to registration page">{t("register")}</Link></>
        )}
      </Typography>
      <Typography mt={1}>
        <Link to="/reset" aria-label="Go to password reset page" data-testid="forgot-password-link">{t("forgotPassword")}</Link>
      </Typography>
    </Box>
  );
});

export default LoginView;
