import React, { useMemo, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const LogoutModal = React.lazy(() => import("./LogoutModal"));
import DarkModeToggle from "./DarkModeToggle";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useI18n, useSetLanguage } from "../context/I18nContext";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = React.memo(({ darkMode, toggleDarkMode }) => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const t = useI18n();
  const { lang, setLang } = useSetLanguage();

  const links = useMemo(() => {
    if (!user) return [{ to: "/login", label: t("login") }];
    const base = [
      { to: "/dashboard", label: t("dashboard") },
      { to: "/profile", label: t("profile") },
    ];
    if (user.role === "admin") base.push({ to: "/admin", label: t("adminPanel") });
    return base;
  }, [user, t]);

  const handleLogout = useCallback(() => setShowModal(true), []);
  const handleCancelLogout = useCallback(() => setShowModal(false), []);
  const confirmLogout = useCallback(() => {
    logout();
    setShowModal(false);
    navigate("/login", { replace: true });
    window.location.href = "/login";
  }, [logout, navigate]);

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {links.map((l) => (
            <Button key={l.to} color="inherit" component={Link} to={l.to} sx={{ textTransform: 'none', mr: 2 }}>
              {l.label}
            </Button>
          ))}
        </Typography>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Select
          value={lang}
          onChange={e => setLang(e.target.value)}
          size="small"
          sx={{ ml: 2, minWidth: 80 }}
          data-testid="lang-switcher"
        >
          <MenuItem value="en" data-testid="lang-en">EN</MenuItem>
          <MenuItem value="pl" data-testid="lang-pl">PL</MenuItem>
        </Select>
        {user && (
          <>
            <Typography sx={{ ml: 2 }}>{user.username}</Typography>
            <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
              {t("logout")}
            </Button>
            {showModal && (
              <React.Suspense fallback={<div>Loading modal...</div>}>
                <LogoutModal onConfirm={confirmLogout} onCancel={handleCancelLogout} />
              </React.Suspense>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default Navbar;
