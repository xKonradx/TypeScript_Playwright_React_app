import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { create } from "zustand";

// Zustand notification store
type NotificationSeverity = "success" | "error" | "info" | "warning";
interface NotificationState {
  open: boolean;
  message: string;
  severity: NotificationSeverity;
  showNotification: (message: string, severity?: NotificationSeverity) => void;
  closeNotification: () => void;
}

export const useNotificationStore = create<NotificationState>((set: (fn: Partial<NotificationState> | ((state: NotificationState) => Partial<NotificationState>)) => void) => ({
  open: false,
  message: "",
  severity: "info",
  showNotification: (message: string, severity: NotificationSeverity = "info") => set({ open: true, message, severity }),
  closeNotification: () => set({ open: false }),
}));

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { open, message, severity, closeNotification } = useNotificationStore();
  return (
    <>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        data-testid="notification-snackbar"
      >
        <Alert onClose={closeNotification} severity={severity} sx={{ width: "100%" }} data-testid="notification-alert">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export function useNotification() {
  return useNotificationStore((state: NotificationState) => state.showNotification);
} 