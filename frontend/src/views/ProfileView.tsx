import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNotification } from "../components/NotificationProvider";
import { useI18n } from "../context/I18nContext";
import type { User } from "../context/AuthContext";

const ProfileView: React.FC = React.memo(() => {
  const { user, changePassword } = useAuth();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [displayName, setDisplayName] = useState(user?.displayName || user?.username || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const notification = useNotification();
  const t = useI18n();

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const result = changePassword(oldPass, newPass, repeat);
    if (result !== true) {
      setError(result as string);
      return;
    }
    setSuccess("Password has been changed!");
    setOldPass(""); setNewPass(""); setRepeat("");
  };

  const handleProfileSave = () => {
    // Update user in localStorage and context
    const local = localStorage.getItem("users");
    let users: (User & { password?: string })[] = local ? JSON.parse(local) : [];
    const idx = users.findIndex((u) => u.username === user.username);
    if (idx !== -1) {
      users[idx].displayName = displayName;
      users[idx].avatar = avatar;
      localStorage.setItem("users", JSON.stringify(users));
      // Also update in context/localStorage for current user
      const updatedUser = { ...user, displayName, avatar };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      notification(t("profileUpdated"), "success");
      window.location.reload(); // Easiest way to update context for now
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh">
      <Typography variant="h3" fontWeight={700} mb={4} role="heading" aria-level={1}>{t("profile")}</Typography>
      <Typography mb={2}>Logged in as: <b>{user.username}</b></Typography>
      {error && <Typography color="error" mb={2} data-testid="profile-error" role="alert" aria-live="polite">{error}</Typography>}
      {success && <Typography color="primary" mb={2} data-testid="profile-success" role="alert" aria-live="polite">{success}</Typography>}
      <Box mb={2} display="flex" flexDirection="column" alignItems="center">
        <Avatar src={avatar} sx={{ width: 80, height: 80 }} data-testid="profile-avatar" />
        <IconButton color="primary" component="label" data-testid="profile-avatar-upload">
          <PhotoCamera />
          <input hidden accept="image/*" type="file" onChange={handleAvatarChange} data-testid="profile-avatar-input" />
        </IconButton>
      </Box>
      <TextField
        label={t("displayName")}
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        inputProps={{ 'data-testid': 'profile-displayname-input' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleProfileSave}
        fullWidth
        sx={{ mb: 4 }}
        data-testid="profile-save-btn"
      >
        {t("saveProfile")}
      </Button>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: 300, display: 'flex', flexDirection: 'column', gap: 2 }} role="form" aria-label="Change password form">
        <TextField 
          label="Old password" 
          type="password" 
          value={oldPass} 
          onChange={e => setOldPass(e.target.value)} 
          required 
          fullWidth 
          inputProps={{
            'aria-label': 'User old password',
            'aria-required': 'true'
          }}
        />
        <TextField 
          label="New password" 
          type="password" 
          value={newPass} 
          onChange={e => setNewPass(e.target.value)} 
          required 
          fullWidth 
          inputProps={{
            'aria-label': 'User new password',
            'aria-required': 'true'
          }}
        />
        <TextField 
          label="Repeat new password" 
          type="password" 
          value={repeat} 
          onChange={e => setRepeat(e.target.value)} 
          required 
          fullWidth 
          inputProps={{
            'aria-label': 'Repeat user new password',
            'aria-required': 'true'
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          aria-label="Change user password"
        >
          Change password
        </Button>
      </Box>
    </Box>
  );
});

export default ProfileView; 