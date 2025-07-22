/**
 * Error handling utilities
 */

import { ERROR_MESSAGES } from '../constants/app.constants';

export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
  stack?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: AppError | null;
  errorInfo: any;
}

// Error types
export const ERROR_TYPES = {
  VALIDATION: 'VALIDATION_ERROR',
  NETWORK: 'NETWORK_ERROR',
  AUTHENTICATION: 'AUTHENTICATION_ERROR',
  AUTHORIZATION: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  RATE_LIMIT: 'RATE_LIMIT_ERROR',
  SESSION_EXPIRED: 'SESSION_EXPIRED_ERROR',
  GENERIC: 'GENERIC_ERROR',
} as const;

export type ErrorType = typeof ERROR_TYPES[keyof typeof ERROR_TYPES];

/**
 * Create a standardized error object
 */
export const createError = (
  code: ErrorType,
  message: string,
  details?: any,
  originalError?: Error
): AppError => {
  return {
    code,
    message,
    details,
    timestamp: Date.now(),
    ...(originalError?.stack && { stack: originalError.stack }),
  };
};

/**
 * Handle validation errors
 */
export const handleValidationError = (details: any): AppError => {
  return createError(
    ERROR_TYPES.VALIDATION,
    ERROR_MESSAGES.VALIDATION_ERROR,
    details
  );
};

/**
 * Handle network errors
 */
export const handleNetworkError = (error: Error): AppError => {
  return createError(
    ERROR_TYPES.NETWORK,
    ERROR_MESSAGES.NETWORK_ERROR,
    { originalMessage: error.message },
    error
  );
};

/**
 * Handle authentication errors
 */
export const handleAuthenticationError = (details?: any): AppError => {
  return createError(
    ERROR_TYPES.AUTHENTICATION,
    ERROR_MESSAGES.UNAUTHORIZED,
    details
  );
};

/**
 * Handle authorization errors
 */
export const handleAuthorizationError = (details?: any): AppError => {
  return createError(
    ERROR_TYPES.AUTHORIZATION,
    ERROR_MESSAGES.FORBIDDEN,
    details
  );
};

/**
 * Handle not found errors
 */
export const handleNotFoundError = (resource?: string): AppError => {
  return createError(
    ERROR_TYPES.NOT_FOUND,
    ERROR_MESSAGES.NOT_FOUND,
    { resource }
  );
};

/**
 * Handle rate limit errors
 */
export const handleRateLimitError = (details?: any): AppError => {
  return createError(
    ERROR_TYPES.RATE_LIMIT,
    ERROR_MESSAGES.RATE_LIMITED,
    details
  );
};

/**
 * Handle session expired errors
 */
export const handleSessionExpiredError = (): AppError => {
  return createError(
    ERROR_TYPES.SESSION_EXPIRED,
    ERROR_MESSAGES.SESSION_EXPIRED
  );
};

/**
 * Handle generic errors
 */
export const handleGenericError = (error: Error | unknown): AppError => {
  const message = error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC_ERROR;
  const originalError = error instanceof Error ? error : undefined;
  
  return createError(
    ERROR_TYPES.GENERIC,
    message,
    { originalError: error },
    originalError
  );
};

/**
 * Get user-friendly error message
 */
export const getUserFriendlyMessage = (error: AppError): string => {
  switch (error.code) {
    case ERROR_TYPES.VALIDATION:
      return ERROR_MESSAGES.VALIDATION_ERROR;
    case ERROR_TYPES.NETWORK:
      return ERROR_MESSAGES.NETWORK_ERROR;
    case ERROR_TYPES.AUTHENTICATION:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case ERROR_TYPES.AUTHORIZATION:
      return ERROR_MESSAGES.FORBIDDEN;
    case ERROR_TYPES.NOT_FOUND:
      return ERROR_MESSAGES.NOT_FOUND;
    case ERROR_TYPES.RATE_LIMIT:
      return ERROR_MESSAGES.RATE_LIMITED;
    case ERROR_TYPES.SESSION_EXPIRED:
      return ERROR_MESSAGES.SESSION_EXPIRED;
    default:
      return ERROR_MESSAGES.GENERIC_ERROR;
  }
};

/**
 * Log error for debugging
 */
export const logError = (error: AppError, context?: string): void => {
  const logMessage = `[${error.code}] ${error.message}`;
  
  if (context) {
    console.error(`${context}: ${logMessage}`, error.details);
  } else {
    console.error(logMessage, error.details);
  }
  
  // Log stack trace if available
  if (error.stack) {
    console.error('Stack trace:', error.stack);
  }
};

/**
 * Error boundary helper
 */
export const createErrorBoundaryState = (error: Error, errorInfo: any): ErrorBoundaryState => {
  const appError = handleGenericError(error);
  logError(appError, 'Error Boundary');
  
  return {
    hasError: true,
    error: appError,
    errorInfo,
  };
};

/**
 * Reset error boundary state
 */
export const resetErrorBoundaryState = (): ErrorBoundaryState => {
  return {
    hasError: false,
    error: null,
    errorInfo: null,
  };
};

/**
 * Check if error is recoverable
 */
export const isRecoverableError = (error: AppError): boolean => {
  const recoverableErrors: ErrorType[] = [
    ERROR_TYPES.NETWORK,
    ERROR_TYPES.RATE_LIMIT,
    ERROR_TYPES.VALIDATION,
  ];
  
  return recoverableErrors.includes(error.code as ErrorType);
};

/**
 * Get error retry delay based on error type
 */
export const getRetryDelay = (error: AppError, attempt: number): number => {
  const baseDelay = 1000; // 1 second
  const maxDelay = 30000; // 30 seconds
  
  let delay = baseDelay;
  
  switch (error.code) {
    case ERROR_TYPES.NETWORK:
      delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      break;
    case ERROR_TYPES.RATE_LIMIT:
      delay = Math.min(baseDelay * (attempt + 1) * 2, maxDelay);
      break;
    default:
      delay = baseDelay;
  }
  
  return delay;
};

/**
 * Error reporting utility (for future integration with error tracking services)
 */
export const reportError = (error: AppError, context?: string): void => {
  // Log locally
  logError(error, context);
  
  // In production, this would send to error tracking service
  // Example: Sentry, LogRocket, Bugsnag, etc.
  if (import.meta.env.PROD) {
    // Example: Sentry.captureException(error);
    console.info('Error reported to tracking service:', error.code);
  }
};

/**
 * Create error from HTTP response
 */
export const createErrorFromResponse = (response: Response, details?: any): AppError => {
  switch (response.status) {
    case 400:
      return handleValidationError(details);
    case 401:
      return handleAuthenticationError(details);
    case 403:
      return handleAuthorizationError(details);
    case 404:
      return handleNotFoundError(details);
    case 429:
      return handleRateLimitError(details);
    case 500:
    default:
      return handleGenericError(new Error(`HTTP ${response.status}: ${response.statusText}`));
  }
};