import React from "react";
import { useI18n } from "../context/I18nContext";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryInner extends React.Component<{ children: React.ReactNode; t: (key: string) => string }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode; t: (key: string) => string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // Optionally log error
    // console.error(error);
  }

  handleReset = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const t = this.props.t;
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
          <h2 data-testid="error-boundary-title">{t("somethingWentWrong")}</h2>
          <pre data-testid="error-boundary-message">{this.state.error?.message}</pre>
          <button onClick={this.handleReset} data-testid="error-boundary-reset">{t("reloadApp")}</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useI18n();
  return <ErrorBoundaryInner t={t}>{children}</ErrorBoundaryInner>;
};

export default ErrorBoundary; 