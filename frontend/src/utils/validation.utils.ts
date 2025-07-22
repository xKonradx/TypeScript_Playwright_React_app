/**
 * Input validation and sanitization utilities
 */

import type { 
  LoginCredentials, 
  RegisterData, 
  ChangePasswordData, 
  ProfileUpdateData, 
  FormValidationResult, 
  ValidationError 
} from '../types/user.types';

// Validation patterns
const VALIDATION_PATTERNS = {
  username: /^[a-zA-Z0-9_-]{3,20}$/,
  password: /^.{6,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  displayName: /^[a-zA-Z0-9\s._-]{2,50}$/,
} as const;

// Validation messages
const VALIDATION_MESSAGES = {
  username: {
    required: 'Username is required',
    invalid: 'Username must be 3-20 characters long and contain only letters, numbers, underscores, and hyphens',
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 6 characters long',
    mismatch: 'Passwords do not match',
  },
  displayName: {
    invalid: 'Display name must be 2-50 characters long and contain only letters, numbers, spaces, dots, underscores, and hyphens',
  },
  general: {
    required: 'This field is required',
  },
} as const;

/**
 * Basic input sanitization (client-side only - server validation required)
 * Note: This is for UI feedback only and should not be relied upon for security
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .slice(0, 1000); // Limit input length
};

/**
 * Validate username
 */
export const validateUsername = (username: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!username || username.trim().length === 0) {
    errors.push({
      field: 'username',
      message: VALIDATION_MESSAGES.username.required,
    });
  } else if (!VALIDATION_PATTERNS.username.test(username)) {
    errors.push({
      field: 'username',
      message: VALIDATION_MESSAGES.username.invalid,
    });
  }
  
  return errors;
};

/**
 * Validate password
 */
export const validatePassword = (password: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!password || password.length === 0) {
    errors.push({
      field: 'password',
      message: VALIDATION_MESSAGES.password.required,
    });
  } else if (!VALIDATION_PATTERNS.password.test(password)) {
    errors.push({
      field: 'password',
      message: VALIDATION_MESSAGES.password.minLength,
    });
  }
  
  return errors;
};

/**
 * Validate display name
 */
export const validateDisplayName = (displayName: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (displayName && displayName.trim().length > 0) {
    if (!VALIDATION_PATTERNS.displayName.test(displayName)) {
      errors.push({
        field: 'displayName',
        message: VALIDATION_MESSAGES.displayName.invalid,
      });
    }
  }
  
  return errors;
};

/**
 * Validate login credentials
 */
export const validateLoginCredentials = (credentials: LoginCredentials): FormValidationResult => {
  const errors: ValidationError[] = [];
  
  errors.push(...validateUsername(credentials.username));
  errors.push(...validatePassword(credentials.password));
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate registration data
 */
export const validateRegistrationData = (data: RegisterData): FormValidationResult => {
  const errors: ValidationError[] = [];
  
  errors.push(...validateUsername(data.username));
  errors.push(...validatePassword(data.password));
  
  if (data.password !== data.confirmPassword) {
    errors.push({
      field: 'confirmPassword',
      message: VALIDATION_MESSAGES.password.mismatch,
    });
  }
  
  if (data.displayName) {
    errors.push(...validateDisplayName(data.displayName));
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate password change data
 */
export const validatePasswordChange = (data: ChangePasswordData): FormValidationResult => {
  const errors: ValidationError[] = [];
  
  errors.push(...validatePassword(data.currentPassword));
  errors.push(...validatePassword(data.newPassword));
  
  if (data.newPassword !== data.confirmNewPassword) {
    errors.push({
      field: 'confirmNewPassword',
      message: VALIDATION_MESSAGES.password.mismatch,
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate profile update data
 */
export const validateProfileUpdate = (data: ProfileUpdateData): FormValidationResult => {
  const errors: ValidationError[] = [];
  
  if (data.displayName) {
    errors.push(...validateDisplayName(data.displayName));
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Get validation error message for a specific field
 */
export const getFieldError = (errors: ValidationError[], fieldName: string): string | undefined => {
  const error = errors.find(err => err.field === fieldName);
  return error?.message;
};

/**
 * Check if a field has validation errors
 */
export const hasFieldError = (errors: ValidationError[], fieldName: string): boolean => {
  return errors.some(err => err.field === fieldName);
};

/**
 * Password strength checker
 */
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Use at least 8 characters');
  }
  
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add lowercase letters');
  }
  
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add uppercase letters');
  }
  
  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add numbers');
  }
  
  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add special characters');
  }
  
  return { score, feedback };
};