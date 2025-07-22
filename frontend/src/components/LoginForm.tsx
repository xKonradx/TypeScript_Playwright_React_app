import React, { useId, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNotification } from "./NotificationProvider";
import { useI18n } from "../context/I18nContext";

interface Props {
  onError: (msg: string) => void;
}

const LoginForm: React.FC<Props> = ({ onError }) => {
  const { login, generateCSRFToken, isRateLimited } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [csrfToken, setCsrfToken] = useState("");
  const usernameId = useId();
  const passwordId = useId();
  const navigate = useNavigate();
  const notification = useNotification();
  const t = useI18n();

  useEffect(() => {
    setCsrfToken(generateCSRFToken());
  }, [generateCSRFToken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { username?: string; password?: string } = {};
    
    if (!username) {
      newErrors.username = "Enter username";
    }
    if (!password) {
      newErrors.password = "Enter password";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    // Check rate limiting
    if (isRateLimited(username)) {
      onError(t("tooManyAttempts"));
      notification(t("tooManyAttempts"), "error");
      return;
    }
    
    if (!login(username, password)) {
      onError(t("invalidCredentials"));
      notification(t("invalidCredentials"), "error");
      return;
    }
    onError("");
    notification(t("loginSuccess"), "success");
    navigate("/dashboard");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 300, display: 'flex', flexDirection: 'column', gap: 2 }} role="form" aria-label="Login form">
      <input type="hidden" name="csrf_token" value={csrfToken} />
      <TextField
        id={usernameId}
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        fullWidth
        error={!!errors.username}
        helperText={errors.username}
        aria-describedby={errors.username ? `${usernameId}-error` : undefined}
        aria-invalid={!!errors.username}
        inputProps={{
          'aria-label': 'User username',
          'aria-required': 'true'
        }}
      />
      <TextField
        id={passwordId}
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        error={!!errors.password}
        helperText={errors.password}
        aria-describedby={errors.password ? `${passwordId}-error` : undefined}
        aria-invalid={!!errors.password}
        inputProps={{ 
          minLength: 6,
          'aria-label': 'User password',
          'aria-required': 'true'
        }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth
        aria-label="Log in to the system"
      >
        Log in
      </Button>
    </Box>
  );
};

export default LoginForm;
