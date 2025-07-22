import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import Navbar from "../components/Navbar";
const LoginView = lazy(() => import("../views/LoginView"));
const DashboardView = lazy(() => import("../views/DashboardView"));
const AdminView = lazy(() => import("../views/AdminView"));
const NotFound = lazy(() => import("../views/NotFound"));
import RegisterView from "../views/RegisterView";
import ProfileView from "../views/ProfileView";
import PasswordResetView from "../views/PasswordResetView";
import AdminUsersView from "../views/AdminUsersView";

interface AppRouterProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppRouter: React.FC<AppRouterProps> = ({ darkMode, toggleDarkMode }) => (
  <>
    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    <Suspense fallback={<div>Ładowanie...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/reset" element={<PasswordResetView />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminView />} />
            <Route path="/admin/users" element={<AdminUsersView />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </>
);

export default AppRouter;
