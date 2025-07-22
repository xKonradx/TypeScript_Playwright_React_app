/**
 * Session management utilities
 */

import { STORAGE_KEYS } from '../constants/app.constants';
import { SESSION_CONFIG } from '../config/app.config';

export interface SessionData {
  userId: string;
  username: string;
  role: string;
  createdAt: number;
  lastActivity: number;
  expiresAt: number;
}

export interface SessionState {
  isActive: boolean;
  isExpired: boolean;
  timeRemaining: number;
  shouldShowWarning: boolean;
}

/**
 * Generate a more secure session token
 * Note: This is still client-side and should not be used for production security
 */
export const generateSessionToken = (): string => {
  const array = new Uint8Array(32);
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback for environments without crypto.getRandomValues
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Create a new session
 */
export const createSession = (userId: string, username: string, role: string): SessionData => {
  const now = Date.now();
  return {
    userId,
    username,
    role,
    createdAt: now,
    lastActivity: now,
    expiresAt: now + SESSION_CONFIG.TIMEOUT,
  };
};

/**
 * Update session activity
 */
export const updateSessionActivity = (session: SessionData): SessionData => {
  const now = Date.now();
  return {
    ...session,
    lastActivity: now,
    expiresAt: now + SESSION_CONFIG.TIMEOUT,
  };
};

/**
 * Get current session state
 */
export const getSessionState = (session: SessionData | null): SessionState => {
  if (!session) {
    return {
      isActive: false,
      isExpired: true,
      timeRemaining: 0,
      shouldShowWarning: false,
    };
  }

  const now = Date.now();
  const timeRemaining = Math.max(0, session.expiresAt - now);
  const isExpired = timeRemaining <= 0;
  const shouldShowWarning = timeRemaining <= SESSION_CONFIG.WARNING_TIME && timeRemaining > 0;

  return {
    isActive: !isExpired,
    isExpired,
    timeRemaining,
    shouldShowWarning,
  };
};

/**
 * Check if session is valid
 */
export const isSessionValid = (session: SessionData | null): boolean => {
  if (!session) return false;
  
  const now = Date.now();
  return now < session.expiresAt;
};

/**
 * Get session from storage
 */
export const getStoredSession = (): SessionData | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (!stored) return null;
    
    const userData = JSON.parse(stored);
    
    // Check if this is legacy user data or session data
    if (userData.expiresAt) {
      return userData as SessionData;
    }
    
    // Convert legacy user data to session format
    const now = Date.now();
    return {
      userId: userData.username, // Use username as userId for legacy compatibility
      username: userData.username,
      role: userData.role,
      createdAt: now,
      lastActivity: now,
      expiresAt: now + SESSION_CONFIG.TIMEOUT,
    };
  } catch (error) {
    console.warn('Failed to load session from storage:', error);
    return null;
  }
};

/**
 * Store session in storage
 */
export const storeSession = (session: SessionData): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(session));
  } catch (error) {
    console.warn('Failed to store session:', error);
  }
};

/**
 * Clear session from storage
 */
export const clearSession = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.LAST_ACTIVITY);
  } catch (error) {
    console.warn('Failed to clear session:', error);
  }
};

/**
 * Activity tracking utilities
 */
export const trackUserActivity = (): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
  } catch (error) {
    console.warn('Failed to track user activity:', error);
  }
};

export const getLastActivity = (): number => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
    return stored ? parseInt(stored, 10) : 0;
  } catch (error) {
    console.warn('Failed to get last activity:', error);
    return 0;
  }
};

/**
 * Format time remaining for display
 */
export const formatTimeRemaining = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
};

/**
 * Session cleanup utility
 */
export const cleanupExpiredSessions = (): void => {
  const session = getStoredSession();
  if (session && !isSessionValid(session)) {
    clearSession();
  }
};

/**
 * Initialize session monitoring
 */
export const initializeSessionMonitoring = (): (() => void) => {
  const activities = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
  
  const handleActivity = () => {
    trackUserActivity();
  };
  
  // Add event listeners
  activities.forEach(activity => {
    document.addEventListener(activity, handleActivity, true);
  });
  
  // Cleanup function
  return () => {
    activities.forEach(activity => {
      document.removeEventListener(activity, handleActivity, true);
    });
  };
};