import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants/app.constants';

export interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (enabled: boolean) => void;
}

/**
 * Enhanced dark mode hook with improved state management
 */
export const useDarkMode = (): DarkModeState => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
      if (saved !== null) {
        return saved === 'true';
      }
      
      // Check system preference if no saved preference
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      return false;
    } catch (error) {
      console.warn('Failed to load dark mode preference:', error);
      return false;
    }
  });

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no user preference is saved
      const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
      if (saved === null) {
        setIsDarkMode(e.matches);
      }
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
    
    // Return empty cleanup function if no listeners were added
    return () => {};
  }, []);

  // Save to localStorage whenever dark mode changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, isDarkMode.toString());
      
      // Update document attributes for CSS styling
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', isDarkMode);
      }
    } catch (error) {
      console.warn('Failed to save dark mode preference:', error);
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const setDarkMode = useCallback((enabled: boolean) => {
    setIsDarkMode(enabled);
  }, []);

  return { 
    isDarkMode, 
    toggleDarkMode, 
    setDarkMode 
  };
};

// Legacy function for backward compatibility
export function useDarkModeDeprecated(): [boolean, (v: boolean) => void] {
  const { isDarkMode, setDarkMode } = useDarkMode();
  return [isDarkMode, setDarkMode];
}
