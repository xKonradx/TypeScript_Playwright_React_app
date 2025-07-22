## License
The code is provided for review purposes only as part of a recruitment process. All rights reserved. Modification, copying, or use for any other purposes is strictly prohibited.

# React Authentication System with Playwright E2E Testing

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/username/repository/actions)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](package.json)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

> A comprehensive React-based user authentication and role-based access control system with extensive end-to-end testing coverage using Playwright. Features secure authentication, admin panel, internationalization, dark mode, and production-ready security practices.

<img width="1230" height="959" alt="image" src="https://github.com/user-attachments/assets/3c5d4de5-2a6a-4131-95f2-b6872007f078" />
<img width="1934" height="598" alt="image" src="https://github.com/user-attachments/assets/4c58293c-54fd-4397-8e61-d17248558525" />
<img width="1925" height="740" alt="image" src="https://github.com/user-attachments/assets/9a08ada6-d578-4557-9a51-ef9cb0e542ae" />


## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Development](#development)
- [Security Features](#security-features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

- **Complete Authentication System** - Login, registration, password reset with secure session management
- **Role-Based Access Control** - Admin and user roles with protected routes and permissions
- **Advanced Security** - Input sanitization, CSRF protection, rate limiting, and session timeout
- **Internationalization** - English and Polish language support with real-time switching
- **Dark Mode Toggle** - Persistent theme switching with Material-UI integration
- **Profile Management** - User profile updates, avatar upload, and password changes
- **Admin Panel** - Complete user management interface with bulk operations
- **Comprehensive Testing** - 47 end-to-end tests covering all functionality with Playwright
- **Responsive Design** - Mobile-first approach with Material Design components
- **Performance Optimized** - Lazy loading, code splitting, and bundle analysis

## Demo

### Key Functionality Screenshots

| Login Interface                       | Admin Dashboard             | User Management          |
|---------------------------------------|-----------------------------|--------------------------|
| Secure authentication with validation | Role-based dashboard access | Complete CRUD operations |

### User Roles and Access Levels

- **Regular Users**: Dashboard access, profile management, password changes
- **Admin Users**: All user features plus admin panel and user management capabilities

### Default Test Users

| Username   | Password       |Role   | Access Level                         |
|------------|----------------|-------|--------------------------------------|
| `admin`    | `admin123`     | Admin | Full system access + user management |
| `user1`    | `password123`  | User  | Dashboard and profile access         |
| `testuser` | `testpassword` | User  | Standard user privileges             |

## Technology Stack

### Frontend
- **React** 19.1.0 - Modern UI library for building interactive user interfaces
- **TypeScript** 5.8.3 - Static type checking for enhanced code quality and developer experience
- **Material-UI** 7.1.2 - Comprehensive React component library implementing Google's Material Design
- **React Router** 6.30.1 - Declarative routing for React applications with protected routes
- **Zustand** 5.0.6 - Lightweight state management solution
- **Emotion** 11.14.0 - CSS-in-JS styling with theme support
- **Vite** 6.3.5 - Next-generation frontend build tool for fast development

### Testing
- **Playwright** 1.54.1 - Reliable end-to-end testing framework for modern web applications
- **TypeScript** 5.8.3 - Type-safe test development with custom page object models
- **Custom Test Fixtures** - Reusable test setup and utilities

### Development Tools
- **ESLint** 9.25.0 - Static code analysis for identifying problematic patterns
- **Rollup Plugin Visualizer** 6.0.3 - Bundle analysis and visualization for optimization

## Quick Start

```bash

# Navigate to project directory
cd react-auth-system

# Install all dependencies (root and frontend)
npm run setup

# Start development server
npm run dev

# Open your browser to http://localhost:5173
```

## Installation

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Step-by-step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/xKonradx/TypeScript_Playwright_React_app
   cd react-auth-system
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Install Playwright browsers**
   ```bash
   playwright install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Run tests (optional)**
   ```bash
   npm test
   ```

## Usage

### User Authentication

```typescript
// Default test users available
const users = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  },
  {
    username: 'user1',
    password: 'password123',
    role: 'user'
  }
];
```

### Authentication Flow

1. **Registration**: Create new user accounts with validation
2. **Login**: Authenticate with username/password
3. **Session Management**: Automatic 60-second session timeout with warnings
4. **Password Reset**: Secure password recovery flow
5. **Profile Management**: Update user information and avatars

### Role-Based Access

```typescript
// Route protection based on user roles
const protectedRoutes = {
  '/dashboard': ['user', 'admin'],
  '/profile': ['user', 'admin'],
  '/admin': ['admin'],
  '/admin/users': ['admin']
};
```

### Admin Features

- **User Management**: Create, read, update, delete users
- **Bulk Operations**: Select all, bulk delete, bulk role changes
- **Role Management**: Change user roles between 'user' and 'admin'
- **User Search**: Find users by username or display name

### Internationalization

```typescript
// Language switching
const supportedLanguages = ['en', 'pl'];

// Usage in components
const { t, language, setLanguage } = useI18n();
```

## Testing

### Running Tests

```bash
# Run all end-to-end tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Show test results in browser
npm run test:report

# Interactive test UI
npm run test:ui
```

### Test Coverage (47 Test Cases)

```
Authentication Tests (5 cases)
├── Successful login
├── Failed login with invalid credentials
├── Login validation
├── Logout functionality
└── Login redirects

Registration Tests (5 cases)
├── Successful user registration
├── Registration validation
├── Duplicate username handling
├── Registration form validation
└── Registration redirect

Admin & User Management (14 cases)
├── Admin panel access control
├── User management interface
├── Create, update, delete operations
├── Bulk user operations
└── Role management

Security & Session Tests (6 cases)
├── Session timeout warnings
├── Automatic logout
├── Rate limiting
├── Input sanitization
└── CSRF protection

UI/UX & Accessibility (8 cases)
├── Dark mode toggle
├── Responsive design
├── Language switching
├── Navigation tests
└── Error handling

Performance & Edge Cases (9 cases)
├── Lazy loading
├── Error boundaries
├── 404 handling
└── Network error scenarios
```

### Test Structure

```
tests/
├── fixtures/
│   └── test-fixtures.ts     # Reusable test setup
├── pages/
│   ├── LoginPage.ts         # Login page object model
│   ├── DashboardPage.ts     # Dashboard page object model
│   ├── AdminPage.ts         # Admin page object model
│   └── ...
├── admin.spec.ts            # Admin functionality tests
├── login.spec.ts            # Authentication tests
├── security.spec.ts         # Security feature tests
└── ...
```

## Development

### Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
npm run test         # Run end-to-end tests
npm run clean        # Clean build artifacts
npm run ci           # Build and test (CI pipeline)
```

### Project Structure

```
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── AdminRoute.tsx
│   │   │   ├── DarkModeToggle.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── ...
│   │   ├── views/           # Page components
│   │   │   ├── LoginView.tsx
│   │   │   ├── DashboardView.tsx
│   │   │   ├── AdminView.tsx
│   │   │   ├── ProfileView.tsx
│   │   │   └── ...
│   │   ├── context/         # React contexts
│   │   │   ├── AuthContext.tsx
│   │   │   └── I18nContext.tsx
│   │   ├── routes/          # Application routing
│   │   │   └── AppRouter.tsx
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   ├── config/          # Application configuration
│   │   └── constants/       # Application constants
│   ├── package.json         # Frontend dependencies
│   └── vite.config.ts       # Vite configuration
├── tests/                   # Playwright test files
│   ├── fixtures/            # Test fixtures and utilities
│   ├── pages/               # Page Object Models
│   └── *.spec.ts            # Test specifications
├── package.json             # Root package configuration
├── playwright.config.ts     # Playwright configuration
└── TESTCASES.md            # Detailed test case documentation
```

### Code Style Guidelines

- Use TypeScript for all new code with strict type checking
- Follow ESLint configuration for consistent code style
- Implement functional components with React hooks
- Use Material-UI components for consistent design
- Write comprehensive tests for new features
- Follow security best practices for authentication

## Security Features

### Authentication Security
- **Session Timeout**: Automatic logout after 60 seconds of inactivity
- **Rate Limiting**: Protection against brute force attacks (5 attempts per 5 minutes)
- **Input Validation**: Comprehensive validation against malicious inputs
- **Password Security**: Secure password handling (demo uses localStorage)

### Application Security
- **Input Sanitization**: XSS protection through input cleaning
- **CSRF Protection**: Token-based CSRF attack prevention
- **Route Protection**: Authentication and authorization guards
- **Role-Based Access**: Granular permission system

### Data Protection
- **Secure Headers**: Security headers for enhanced protection
- **Validation Pipeline**: Multi-layer input validation
- **Error Handling**: Secure error messages without information leakage

## Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper tests
4. Run the test suite (`npm test`)
5. Ensure all tests pass and linting is clean
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Testing Requirements

- All new features must include comprehensive test coverage
- Tests should follow the existing Page Object Model pattern
- Security features require additional security test cases
- UI changes need accessibility and responsiveness tests

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

### Getting Help

- [Test Cases Documentation](./TESTCASES.md)
-  [Frontend Documentation](./frontend/README.md)
- [Tests Documentation](./tests/README.md)


---

<div align="center">

**[⬆ Back to Top](#react-authentication-system-with-playwright-e2e-testing)**

Built with React, TypeScript, Material-UI, and Playwright for comprehensive end-to-end testing

</div>
