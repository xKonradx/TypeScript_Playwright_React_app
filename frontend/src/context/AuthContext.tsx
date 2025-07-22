import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import usersData from "../data/users.json";
import { useNotification } from "../components/NotificationProvider";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../context/I18nContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export type UserRole = "admin" | "user";
export interface User {
  username: string;
  role: UserRole;
  displayName?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string) => string | true;
  changePassword: (oldPass: string, newPass: string, repeat: string) => string | true;
  generateCSRFToken: () => string;
  validateCSRFToken: (token: string) => boolean;
  isRateLimited: (username: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getAllUsers(): Array<User & { password?: string }> {
  const local = localStorage.getItem("users");
  if (local) return JSON.parse(local);
  // Add displayName and avatar defaults if missing
  return usersData.map((u: Record<string, unknown>) => ({
    username: String(u.username),
    password: typeof u.password === "string" ? u.password : undefined,
    role: (u.role === "admin" || u.role === "user") ? u.role as UserRole : "user",
    displayName: typeof u.displayName === "string" ? u.displayName : String(u.username),
    avatar: typeof u.avatar === "string" ? u.avatar : ""
  }));
}

function saveUsers(users: Array<User & { password?: string }>) {
  localStorage.setItem("users", JSON.stringify(users));
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const local = localStorage.getItem("user");
    return local ? JSON.parse(local) : null;
  });
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const sessionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notification = useNotification();
  const navigate = useNavigate();
  const t = useI18n();
  // Session expiry logic with warning
  useEffect(() => {
    if (!user) return;
    function clearTimers() {
      if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    }
    function startTimers() {
      clearTimers();
      // Show warning 10s before expiry (50s)
      warningTimeoutRef.current = setTimeout(() => {
        setShowSessionWarning(true);
      }, 50000);
      // Logout at 60s
      sessionTimeoutRef.current = setTimeout(() => {
        setShowSessionWarning(false);
        setUser(null);
        localStorage.removeItem("user");
        notification(t("sessionExpired"), "warning");
        navigate("/login");
      }, 60000);
    }
    const resetTimer = () => {
      setShowSessionWarning(false);
      startTimers();
    };
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach(e => window.addEventListener(e, resetTimer));
    startTimers();
    return () => {
      clearTimers();
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [user, notification, navigate, t]);

  const loginAttempts = useRef<{ [key: string]: { count: number; lastAttempt: number } }>({});
  const csrfTokens = useRef<Set<string>>(new Set());

  // Enhanced input validation and sanitization
  const sanitizeInput = (input: string): string => {
    // Remove dangerous characters and patterns
    return input
      .replace(/[<>\"'&]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/data:text\/html/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/';?\s*drop\s+table/gi, '')
      .replace(/union\s+select/gi, '')
      .replace(/insert\s+into/gi, '')
      .replace(/delete\s+from/gi, '')
      .replace(/update\s+set/gi, '')
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  };

  const validateInput = (input: string): boolean => {
    const dangerousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /data:text\/html/gi,
      /on\w+\s*=/gi,
      /';?\s*drop\s+table/gi,
      /union\s+select/gi,
      /insert\s+into/gi,
      /delete\s+from/gi,
      /update\s+set/gi,
      /<iframe/gi,
      /<object/gi,
      /<embed/gi,
      /<form/gi,
      /<input/gi,
      /<textarea/gi,
      /<select/gi,
      /<button/gi,
      /<link/gi,
      /<meta/gi,
      /<style/gi
    ];

    return !dangerousPatterns.some(pattern => pattern.test(input));
  };

  const generateCSRFToken = (): string => {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    csrfTokens.current.add(token);
    return token;
  };

  const validateCSRFToken = (token: string): boolean => {
    return csrfTokens.current.has(token);
  };

  const checkRateLimit = (username: string): boolean => {
    const now = Date.now();
    const attempts = loginAttempts.current[username] || { count: 0, lastAttempt: 0 };

    // Reset if more than 5 minutes have passed
    if (now - attempts.lastAttempt > 5 * 60 * 1000) {
      attempts.count = 0;
    }

    // Block if more than 5 attempts in 5 minutes
    if (attempts.count >= 5) {
      return false;
    }

    attempts.count++;
    attempts.lastAttempt = now;
    loginAttempts.current[username] = attempts;

    return true;
  };

  const login = (username: string, password: string) => {
    // Input validation
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);

    if (!validateInput(sanitizedUsername) || !validateInput(sanitizedPassword)) {
      return false;
    }

    // Rate limiting
    if (!checkRateLimit(sanitizedUsername)) {
      return false;
    }

    const users = getAllUsers();
    const found = users.find((u: User & { password?: string }) => u.username === sanitizedUsername && u.password === sanitizedPassword);
    if (found) {
      const userObj = { username: found.username, role: found.role };
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
      // Clear login attempts on successful login
      delete loginAttempts.current[sanitizedUsername];
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Clear all CSRF tokens on logout
    csrfTokens.current.clear();
    // Clear login attempts on logout
    loginAttempts.current = {};
  };

  const register = (username: string, password: string) => {
    // Input validation
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);

    if (!validateInput(sanitizedUsername) || !validateInput(sanitizedPassword)) {
      return "Invalid input data.";
    }

    const users = getAllUsers();
    if (users.find((u: User & { password?: string }) => u.username === sanitizedUsername)) {
      return "This username already exists.";
    }
    const newUser = { username: sanitizedUsername, password: sanitizedPassword, role: "user" as UserRole, displayName: sanitizedUsername, avatar: "" };
    const updated = [...users, newUser];
    saveUsers(updated);
    return true;
  };

  const changePassword = (oldPass: string, newPass: string, repeat: string) => {
    if (!user) return "You must be logged in.";

    // Input validation
    const sanitizedOldPass = sanitizeInput(oldPass);
    const sanitizedNewPass = sanitizeInput(newPass);
    const sanitizedRepeat = sanitizeInput(repeat);

    if (!validateInput(sanitizedOldPass) || !validateInput(sanitizedNewPass) || !validateInput(sanitizedRepeat)) {
      return "Invalid input data.";
    }

    const users = getAllUsers();
    const idx = users.findIndex((u: User & { password?: string }) => u.username === user.username);
    if (idx === -1) return "User does not exist.";
    if (users[idx].password !== sanitizedOldPass) return "Old password is incorrect.";
    if (sanitizedNewPass.length < 6) return "New password must be at least 6 characters.";
    if (sanitizedNewPass !== sanitizedRepeat) return "New passwords do not match.";
    users[idx].password = sanitizedNewPass;
    saveUsers(users);
    return true;
  };

  const isRateLimited = (username: string): boolean => {
    const now = Date.now();
    const attempts = loginAttempts.current[username] || { count: 0, lastAttempt: 0 };

    // Reset if more than 5 minutes have passed
    if (now - attempts.lastAttempt > 5 * 60 * 1000) {
      return false;
    }

    // Return true if more than 5 attempts in 5 minutes
    return attempts.count >= 5;
  };

  return (
    <>
      <AuthContext.Provider value={React.useMemo(() => ({ user, login, logout, register, changePassword, generateCSRFToken, validateCSRFToken, isRateLimited }), [user])}>
        {children}
      </AuthContext.Provider>
      <Dialog open={showSessionWarning} onClose={() => setShowSessionWarning(false)}>
        <DialogTitle>{t("sessionExpiringSoonTitle")}</DialogTitle>
        <DialogContent>{t("sessionExpiringSoonDesc")}</DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSessionWarning(false)} color="error">{t("logout")}</Button>
          <Button onClick={() => setShowSessionWarning(false)} color="primary" autoFocus>{t("stayLoggedIn")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
