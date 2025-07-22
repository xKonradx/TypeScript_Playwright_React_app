import React, { useState, useId, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNotification } from "../components/NotificationProvider";
import { useI18n } from "../context/I18nContext";

const RegisterView: React.FC = React.memo(() => {
  const { register, generateCSRFToken } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string; repeat?: string }>({});
  const [success, setSuccess] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();
  
  const usernameId = useId();
  const passwordId = useId();
  const repeatId = useId();
  const notification = useNotification();
  const t = useI18n();

  useEffect(() => {
    setCsrfToken(generateCSRFToken());
  }, [generateCSRFToken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    setGeneralError("");
    
    const newErrors: { username?: string; password?: string; repeat?: string } = {};
    
    if (!username) {
      newErrors.username = "Enter username.";
    }
    if (!password) {
      newErrors.password = "Enter password.";
    } else if (password.length < 6) {
      setGeneralError("Password must be at least 6 characters.");
      return;
    }
    if (!repeat) {
      newErrors.repeat = "Repeat password.";
    } else if (password !== repeat) {
      setGeneralError("Passwords do not match.");
      return;
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    const result = register(username, password);
    if (result !== true) {
      setGeneralError(result as string);
      notification(t(result as string) || (result as string), "error");
      return;
    }
    setSuccess(t("registrationSuccess"));
    notification(t("registrationSuccess"), "success");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh">
      <Typography variant="h3" fontWeight={700} mb={4} role="heading" aria-level={1}>{t("register")}</Typography>
      {success && <Typography color="primary" mb={2} data-testid="register-success" role="alert">{success}</Typography>}
      {generalError && <Typography color="error" mb={2} data-testid="register-error" role="alert">{generalError}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: 300, display: 'flex', flexDirection: 'column', gap: 2 }} role="form" aria-label="Registration form">
        <input type="hidden" name="csrf_token" value={csrfToken} />
        <TextField 
          id={usernameId}
          label={t("username")} 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          fullWidth 
          error={!!errors.username}
          helperText={errors.username}
          aria-describedby={errors.username ? `${usernameId}-error` : undefined}
          aria-invalid={!!errors.username}
          inputProps={{
            'aria-label': t("userUsername"),
            'aria-required': 'true'
          }}
        />
        <TextField 
          id={passwordId}
          label={t("password")} 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          fullWidth 
          error={!!errors.password}
          helperText={errors.password}
          aria-describedby={errors.password ? `${passwordId}-error` : undefined}
          aria-invalid={!!errors.password}
          inputProps={{
            'aria-label': t("userPassword"),
            'aria-required': 'true'
          }}
        />
        <TextField 
          id={repeatId}
          label={t("repeatPassword")} 
          type="password" 
          value={repeat} 
          onChange={e => setRepeat(e.target.value)} 
          fullWidth 
          error={!!errors.repeat}
          helperText={errors.repeat}
          aria-describedby={errors.repeat ? `${repeatId}-error` : undefined}
          aria-invalid={!!errors.repeat}
          inputProps={{
            'aria-label': t("repeatUserPassword"),
            'aria-required': 'true'
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          aria-label={t("registerInSystem")}
        >
          {t("register")}
        </Button>
      </Box>
      <Typography mt={2}>
        {t("login").includes("Zaloguj") ? (
          <span>{t("login")}? <Link to="/login" aria-label="Go to login page">{t("login")}</Link></span>
        ) : (
          <>Already have an account? <Link to="/login" aria-label="Go to login page">{t("login")}</Link></>
        )}
      </Typography>
    </Box>
  );
});

export default RegisterView; 