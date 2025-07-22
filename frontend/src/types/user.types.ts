/**
 * User-related TypeScript interfaces and types
 */

export type UserRole = 'admin' | 'user';

export interface User {
  username: string;
  role: UserRole;
  displayName?: string;
  avatar?: string;
}

export interface UserWithPassword extends User {
  password?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
  displayName?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ProfileUpdateData {
  displayName?: string;
  avatar?: string;
}

// Authentication context types
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  changePassword: (data: ChangePasswordData) => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  generateCSRFToken: () => string;
  validateCSRFToken: (token: string) => boolean;
  isRateLimited: (username: string) => boolean;
}

// Session management types
export interface SessionState {
  isActive: boolean;
  expiresAt: number;
  showWarning: boolean;
}

// Rate limiting types
export interface LoginAttempt {
  username: string;
  timestamp: number;
  attempts: number;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse extends ApiResponse<User> {
  token?: string;
  refreshToken?: string;
  expiresAt?: number;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Utility types
export type Nullable<T> = T | null;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Route protection types
export interface RouteProtectionProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  fallback?: React.ReactNode;
}

// Admin panel types
export interface AdminUserAction {
  type: 'delete' | 'changeRole' | 'bulkDelete' | 'bulkChangeRole';
  usernames: string[];
  newRole?: UserRole;
}

export interface AdminUserState {
  users: User[];
  selectedUsers: string[];
  isLoading: boolean;
  error: string | null;
}