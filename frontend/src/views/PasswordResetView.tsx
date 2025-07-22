import React, { useState, useId } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "../components/NotificationProvider";
import { useI18n } from "../context/I18nContext";
import type { User } from "../context/AuthContext";

const PasswordResetView: React.FC = React.memo(() => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const usernameId = useId();
  const passwordId = useId();
  const repeatId = useId();
  const navigate = useNavigate();
  const notification = useNotification();
  const t = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!username) {
      setError(t("enterUsername"));
      notification(t("enterUsername"), "error");
      return;
    }
    if (!password) {
      setError(t("enterPassword"));
      notification(t("enterPassword"), "error");
      return;
    }
    if (password.length < 6) {
      setError(t("passwordMinLength"));
      notification(t("passwordMinLength"), "error");
      return;
    }
    if (password !== repeat) {
      setError(t("passwordsDoNotMatch"));
      notification(t("passwordsDoNotMatch"), "error");
      return;
    }
    // Try to update user in localStorage
    const local = localStorage.getItem("users");
    let users: (User & { password?: string })[] = local ? JSON.parse(local) : [];
    const idx = users.findIndex((u) => u.username === username);
    if (idx === -1) {
      setError(t("userDoesNotExist"));
      notification(t("userDoesNotExist"), "error");
      return;
    }
    users[idx].password = password;
    localStorage.setItem("users", JSON.stringify(users));
    setSuccess(t("passwordResetSuccess"));
    notification(t("passwordResetSuccess"), "success");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh">
      <Typography variant="h3" fontWeight={700} mb={4} role="heading" aria-level={1} data-testid="reset-title">{t("resetPassword")}</Typography>
      {error && <Typography color="error" mb={2} data-testid="reset-error" role="alert">{error}</Typography>}
      {success && <Typography color="primary" mb={2} data-testid="reset-success" role="alert">{success}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: 300, display: 'flex', flexDirection: 'column', gap: 2 }} role="form" aria-label="Password reset form" data-testid="reset-form">
        <TextField
          id={usernameId}
          label={t("username")}
          value={username}
          onChange={e => setUsername(e.target.value)}
          fullWidth
          inputProps={{
            'aria-label': t("userUsername"),
            'aria-required': 'true',
            'data-testid': 'reset-username-input'
          }}
        />
        <TextField
          id={passwordId}
          label={t("password")}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          inputProps={{
            'aria-label': t("userPassword"),
            'aria-required': 'true',
            'data-testid': 'reset-password-input',
            minLength: 6
          }}
        />
        <TextField
          id={repeatId}
          label={t("repeatPassword")}
          type="password"
          value={repeat}
          onChange={e => setRepeat(e.target.value)}
          fullWidth
          inputProps={{
            'aria-label': t("repeatUserPassword"),
            'aria-required': 'true',
            'data-testid': 'reset-repeat-input',
            minLength: 6
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          aria-label={t("resetPassword")}
          data-testid="reset-submit-btn"
        >
          {t("resetPassword")}
        </Button>
      </Box>
      <Typography mt={2}>
        <Link to="/login" aria-label="Go to login page" data-testid="reset-back-login">{t("backToLogin")}</Link>
      </Typography>
    </Box>
  );
});

export default PasswordResetView; 