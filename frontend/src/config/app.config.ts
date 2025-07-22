/**
 * Application Configuration
 * Centralized configuration management for the application
 */

export interface AppConfig {
  // Session Management
  sessionTimeout: number;
  sessionWarningTime: number;
  
  // Security
  maxLoginAttempts: number;
  loginAttemptWindowMs: number;
  
  // UI Configuration
  defaultLanguage: string;
  supportedLanguages: string[];
  
  // Development
  isDevelopment: boolean;
  enableDebugMode: boolean;
}

// Environment-based configuration with fallback values
const config: AppConfig = {
  // Session timeout in milliseconds (default: 1 hour)
  sessionTimeout: Number(import.meta.env.VITE_SESSION_TIMEOUT) || 3600000,
  
  // Session warning time in milliseconds (default: 5 minutes before expiry)
  sessionWarningTime: Number(import.meta.env.VITE_SESSION_WARNING_TIME) || 300000,
  
  // Maximum login attempts before rate limiting
  maxLoginAttempts: Number(import.meta.env.VITE_MAX_LOGIN_ATTEMPTS) || 5,
  
  // Login attempt window in milliseconds (default: 5 minutes)
  loginAttemptWindowMs: Number(import.meta.env.VITE_LOGIN_ATTEMPT_WINDOW_MS) || 300000,
  
  // Default language
  defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || 'en',
  
  // Supported languages
  supportedLanguages: ['en', 'pl'],
  
  // Development flags
  isDevelopment: import.meta.env.MODE === 'development',
  enableDebugMode: import.meta.env.VITE_DEBUG === 'true',
};

// Validation of configuration values
const validateConfig = (config: AppConfig): void => {
  if (config.sessionTimeout < 60000) {
    console.warn('Session timeout is very short (< 1 minute)');
  }
  
  if (config.sessionWarningTime >= config.sessionTimeout) {
    console.warn('Session warning time should be less than session timeout');
  }
  
  if (config.maxLoginAttempts < 1) {
    console.warn('Max login attempts should be at least 1');
  }
  
  if (!config.supportedLanguages.includes(config.defaultLanguage)) {
    console.warn('Default language is not in supported languages list');
  }
};

// Validate configuration on load
validateConfig(config);

export default config;

// Configuration constants for easy access
export const SESSION_CONFIG = {
  TIMEOUT: config.sessionTimeout,
  WARNING_TIME: config.sessionWarningTime,
} as const;

export const SECURITY_CONFIG = {
  MAX_LOGIN_ATTEMPTS: config.maxLoginAttempts,
  LOGIN_ATTEMPT_WINDOW: config.loginAttemptWindowMs,
} as const;

export const I18N_CONFIG = {
  DEFAULT_LANGUAGE: config.defaultLanguage,
  SUPPORTED_LANGUAGES: config.supportedLanguages,
} as const;