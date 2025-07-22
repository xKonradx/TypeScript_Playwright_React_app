import React, { Suspense, useMemo } from "react";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";
import { ThemeProvider, createTheme, CssBaseline, CircularProgress, Box } from "@mui/material";
import { NotificationProvider } from "./components/NotificationProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import { I18nProvider } from "./context/I18nContext";
import { BrowserRouter } from "react-router-dom";
import { useDarkMode } from "./components/useDarkMode";

const LoadingFallback: React.FC = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

const App: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
        // Enhanced theme configuration
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none', // Prevent uppercase transformation
              },
            },
          },
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <I18nProvider>
        <ErrorBoundary>
          <NotificationProvider>
            <BrowserRouter>
              <AuthProvider>
                <Suspense fallback={<LoadingFallback />}>
                  <AppRouter darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                </Suspense>
              </AuthProvider>
            </BrowserRouter>
          </NotificationProvider>
        </ErrorBoundary>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default App;
