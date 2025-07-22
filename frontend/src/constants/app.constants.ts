/**
 * Application Constants
 * Centralized constants to avoid magic numbers and strings
 */

// Storage keys
export const STORAGE_KEYS = {
  USER: 'user',
  USERS: 'users',
  DARK_MODE: 'darkMode',
  LANGUAGE: 'language',
  LAST_ACTIVITY: 'lastActivity',
} as const;

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  RESET: '/reset',
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  NOT_FOUND: '*',
} as const;

// Test IDs for consistent testing
export const TEST_IDS = {
  // Authentication
  LOGIN_FORM: 'login-form',
  LOGIN_USERNAME: 'login-username-input',
  LOGIN_PASSWORD: 'login-password-input',
  LOGIN_SUBMIT: 'login-submit-btn',
  LOGIN_ERROR: 'login-error',
  FORGOT_PASSWORD_LINK: 'forgot-password-link',
  
  // Registration
  REGISTER_FORM: 'register-form',
  REGISTER_USERNAME: 'register-username-input',
  REGISTER_PASSWORD: 'register-password-input',
  REGISTER_CONFIRM_PASSWORD: 'register-confirm-password-input',
  REGISTER_DISPLAY_NAME: 'register-display-name-input',
  REGISTER_SUBMIT: 'register-submit-btn',
  REGISTER_ERROR: 'register-error',
  
  // Password Reset
  RESET_FORM: 'reset-form',
  RESET_USERNAME: 'reset-username-input',
  RESET_PASSWORD: 'reset-password-input',
  RESET_REPEAT: 'reset-repeat-input',
  RESET_SUBMIT: 'reset-submit-btn',
  RESET_SUCCESS: 'reset-success',
  RESET_ERROR: 'reset-error',
  RESET_BACK_LOGIN: 'reset-back-login',
  RESET_TITLE: 'reset-title',
  
  // Navigation
  NAVBAR: 'navbar',
  LOGOUT_BUTTON: 'logout-button',
  DARK_MODE_TOGGLE: 'dark-mode-toggle',
  LANGUAGE_SELECTOR: 'language-selector',
  
  // Admin Panel
  ADMIN_USERS_TABLE: 'admin-users-table',
  ADMIN_USERS_TITLE: 'admin-users-title',
  ADMIN_USERS_SELECT_ALL: 'admin-users-select-all',
  ADMIN_BULK_DELETE_BTN: 'admin-bulk-delete-btn',
  ADMIN_BULK_ROLE_SELECT: 'admin-bulk-role-select',
  ADMIN_DELETE_CANCEL: 'admin-delete-cancel',
  ADMIN_DELETE_CONFIRM: 'admin-delete-confirm',
  ADMIN_ROLE_CANCEL: 'admin-role-cancel',
  ADMIN_ROLE_CONFIRM: 'admin-role-confirm',
  
  // Dynamic test IDs (functions)
  ADMIN_USER_ROW: (username: string) => `admin-user-row-${username}`,
  ADMIN_USER_SELECT: (username: string) => `admin-user-select-${username}`,
  ADMIN_USER_ROLE: (username: string) => `admin-user-role-${username}`,
  ADMIN_USER_DELETE: (username: string) => `admin-user-delete-${username}`,
  
  // Profile
  PROFILE_FORM: 'profile-form',
  PROFILE_DISPLAY_NAME: 'profile-display-name-input',
  PROFILE_AVATAR_INPUT: 'profile-avatar-input',
  PROFILE_SUBMIT: 'profile-submit-btn',
  PROFILE_ERROR: 'profile-error',
  PROFILE_SUCCESS: 'profile-success',
  
  // Common
  LOADING_SPINNER: 'loading-spinner',
  ERROR_BOUNDARY: 'error-boundary',
  CRASH_TEST_BUTTON: 'crash-test-button',
} as const;

// API endpoints (for future backend integration)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    RESET_PASSWORD: '/api/auth/reset-password',
    CHANGE_PASSWORD: '/api/auth/change-password',
  },
  USERS: {
    LIST: '/api/users',
    GET: (id: string) => `/api/users/${id}`,
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
    BULK_DELETE: '/api/users/bulk-delete',
    BULK_UPDATE: '/api/users/bulk-update',
  },
  PROFILE: {
    GET: '/api/profile',
    UPDATE: '/api/profile',
    AVATAR: '/api/profile/avatar',
  },
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Theme constants
export const THEME = {
  MODES: {
    LIGHT: 'light',
    DARK: 'dark',
  },
  BREAKPOINTS: {
    XS: 0,
    SM: 600,
    MD: 900,
    LG: 1200,
    XL: 1536,
  },
} as const;

// Animation durations (in milliseconds)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// File upload constants
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ACCEPTED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
} as const;

// Validation limits
export const VALIDATION_LIMITS = {
  USERNAME: {
    MIN: 3,
    MAX: 20,
  },
  PASSWORD: {
    MIN: 6,
    MAX: 128,
  },
  DISPLAY_NAME: {
    MIN: 2,
    MAX: 50,
  },
  INPUT_MAX_LENGTH: 1000,
} as const;

// Session constants
export const SESSION = {
  ACTIVITY_CHECK_INTERVAL: 5000, // 5 seconds
  WARNING_DISPLAY_TIME: 10000, // 10 seconds
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please correct the errors and try again.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again later.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  RATE_LIMITED: 'Too many attempts. Please wait before trying again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Welcome back.',
  REGISTRATION_SUCCESS: 'Registration successful! You can now log in.',
  PASSWORD_RESET_SUCCESS: 'Password reset successful! You can now log in with your new password.',
  PROFILE_UPDATE_SUCCESS: 'Profile updated successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  USER_DELETED: 'User deleted successfully.',
  ROLE_UPDATED: 'User role updated successfully.',
} as const;