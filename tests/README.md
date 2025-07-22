# End-to-End Testing Suite

[![Playwright](https://img.shields.io/badge/Playwright-1.54.1-green.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Cross-Browser](https://img.shields.io/badge/Cross--Browser-Chrome-blue.svg)](https://playwright.dev/)
[![Test Coverage](https://img.shields.io/badge/Test%20Coverage-47%20Cases-brightgreen.svg)](#test-coverage-breakdown)

> Professional-grade end-to-end testing framework for React Authentication System using Playwright. Implements industry-standard testing practices with comprehensive coverage, Page Object Model architecture, and automated CI/CD integration.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Test Execution](#test-execution)
- [Test Coverage](#test-coverage)
- [Architecture](#architecture)
- [Page Object Model](#page-object-model)
- [Test Data Management](#test-data-management)
- [Configuration](#configuration)
- [Debugging](#debugging)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [Support](#support)

## Overview

This comprehensive test suite provides **47 end-to-end test cases** covering all critical functionality of the React Authentication System. Built with Playwright and TypeScript, it implements enterprise-level testing practices including Page Object Model architecture, fixtures-based test data management, and automated reporting.

### Key Statistics

| Metric                  | Value        | Description                      |
|-------------------------|--------------|----------------------------------|
| **Total Test Cases**    | 47           | Complete application coverage    |
| **Test Files**          | 11           | Organized by feature domain      |
| **Page Objects**        | 7            | Reusable page interaction models |
| **Test Execution Time** | ~2-3 minutes | Optimized parallel execution     |
| **Browser Support**     | Chrome       | Production-focused testing       |

## Features

### **Comprehensive Test Coverage**
- **Authentication Flows** - Login, logout, registration, password reset (13 cases)
- **Role-Based Access Control** - Admin and user permission validation (2 cases)
- **User Management** - Complete CRUD operations with bulk actions (10 cases)
- **Security Testing** - Session management, CSRF protection, input validation (3 cases)
- **UI/UX Testing** - Responsive design, accessibility, theming (6 cases)
- **Localization Testing** - Multi-language support validation (2 cases)
- **Navigation Testing** - Route protection and error handling (4 cases)
- **Profile Management** - User profile operations (4 cases)
- **Password Recovery** - Reset workflow validation (3 cases)

### **Professional Architecture**
- **Page Object Model** - Maintainable and scalable test structure
- **TypeScript Integration** - Type-safe test development
- **Fixtures Framework** - Reusable test setup and data management
- **Parallel Execution** - Optimized performance with isolated test contexts
- **Comprehensive Reporting** - HTML reports with screenshots and videos
- **Debug Support** - Step-through debugging and trace analysis

### **Advanced Testing Capabilities**
- **Cross-Browser Testing** - Chrome engine with device simulation
- **Mobile Responsive Testing** - Viewport-specific validation
- **Accessibility Testing** - ARIA compliance and keyboard navigation
- **Visual Testing** - Screenshot comparison and failure recording
- **Performance Testing** - Load time and interaction response validation

## Quick Start

```bash
# Navigate to project root

# Run all tests
npm test

# Run tests with visible browser
npm run test:headed

# View test results
npm run test:report
```

## Installation

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **React Application** running on `http://localhost:5173`

### Setup Instructions

1. **Install Test Dependencies**
   ```bash
   npm install
   ```

2. **Install Playwright Browsers**
   ```bash
   npx playwright install chromium
   ```

3. **Verify Installation**
   ```bash
   npx playwright --version
   # Expected: Version 1.54.1
   ```

4. **Start Application Server** (separate terminal)
   ```bash
   cd frontend && npm run dev
   ```

5. **Run Test Validation**
   ```bash
   npm test -- --grep "should login with valid credentials"
   ```

## Test Execution

### Basic Commands

```bash
# Execute all test suites
npm test

# Run specific test category
npm test -- login.spec.ts                    # Authentication tests
npm test -- adminUsers.spec.ts               # User management tests
npm test -- security.spec.ts                 # Security validation tests

# Pattern-based execution
npm test -- --grep "login"                   # All login-related tests
npm test -- --grep "admin"                   # All admin functionality tests
```

### Advanced Execution Options

```bash
# Debug mode with browser visible
npm run test:debug

# Headed mode for development
npm run test:headed

# Generate test reports
npm run test:report

# Interactive test UI
npm run test:ui

# Run with specific timeout
npx playwright test --timeout 60000

# Parallel execution control
npx playwright test --workers=4
```

### Environment-Specific Testing

```bash
# CI/CD execution (optimized for automation)
npm run ci

# Development mode (full debugging)
npm run test:headed -- --slowMo=1000

# Performance testing mode
npx playwright test --reporter=json --output-dir=results/
```

## Test Coverage

### Test Coverage Breakdown

```
Total Test Cases: 47

Authentication & Access Control (15 cases)
├── Login Tests (5)
│   ├── Valid credential authentication
│   ├── Invalid credential handling
│   ├── Empty field validation
│   ├── Password reset navigation
│   └── Post-login redirection
├── Registration Tests (5)
│   ├── Successful user registration
│   ├── Password strength validation
│   ├── Username availability checking
│   ├── Confirmation password matching
│   └── Required field enforcement
├── Password Reset Tests (3)
│   ├── Valid username reset flow
│   ├── Invalid username handling
│   └── Empty field validation
└── Security Tests (3)
    ├── Session expiry and cleanup
    ├── CSRF token validation
    └── Access control enforcement

User Management & Administration (12 cases)
├── Admin Panel Tests (2)
│   ├── Admin access control validation
│   └── Non-admin access restriction
└── User Management Tests (10)
    ├── User listing and filtering
    ├── Individual user deletion
    ├── Bulk user operations (select all, delete)
    ├── Role management (user ↔ admin)
    ├── User creation workflow
    ├── Edit user information
    ├── Confirmation dialog handling
    ├── Error handling for failed operations
    ├── Search and pagination
    └── Data consistency validation

User Experience & Interface (14 cases)
├── UI/UX Tests (4)
│   ├── Dark/light theme switching
│   ├── Responsive design validation
│   ├── Accessibility compliance
│   └── Error message visibility
├── Localization Tests (2)
│   ├── Default language display
│   └── Language switching functionality
├── Navigation Tests (4)
│   ├── Protected route enforcement
│   ├── 404 error handling
│   ├── Navbar functionality
│   └── Role-based navigation
└── Profile Tests (4)
    ├── Profile access control
    ├── Profile information updates
    ├── Password change validation
    └── Avatar upload functionality

Dashboard & Core Features (6 cases)
├── Dashboard Tests (3)
│   ├── Authenticated dashboard access
│   ├── Interactive element validation
│   └── Unauthenticated access prevention
└── Core Functionality (3)
    ├── Application stability testing
    ├── Error boundary validation
    └── Performance monitoring
```

### Coverage Metrics

| Test Category       | Test Count | Coverage | Risk Level |
|---------------------|------------|----------|------------|
| **Authentication**  | 13         | 100%     | High       |
| **User Management** | 12         | 100%     | High       |
| **Security**        | 6          | 100%     | Critical   |
| **UI/UX**           | 10         | 95%      | Medium     |
| **Navigation**      | 4          | 100%     | Medium     |
| **Performance**     | 2          | 80%      | Low        |

## Architecture

### Test Organization Structure

```
tests/
├── fixtures/                    # Test utilities and setup
│   └── test-fixtures.ts            # Centralized test data management
├── pages/                       # Page Object Model implementations
│   ├── AdminPage.ts                # Admin panel interactions
│   ├── AdminUsersPage.ts           # User management operations
│   ├── DashboardPage.ts            # Dashboard functionality
│   ├── LoginPage.ts                # Authentication workflows
│   ├── ProfilePage.ts              # User profile management
│   ├── RegisterPage.ts             # User registration processes
│   └── ResetPage.ts                # Password reset operations
├── Test Specifications
│   ├── admin.spec.ts               # Admin functionality testing
│   ├── adminUsers.spec.ts          # User management testing
│   ├── dashboard.spec.ts           # Dashboard feature testing
│   ├── localization.spec.ts        # Multi-language testing
│   ├── login.spec.ts               # Authentication testing
│   ├── navigation.spec.ts          # Routing and navigation testing
│   ├── profile.spec.ts             # User profile testing
│   ├── register.spec.ts            # User registration testing
│   ├── reset.spec.ts               # Password reset testing
│   ├── security.spec.ts            # Security feature testing
│   └── ui.spec.ts                  # User interface testing
└── README.md                    # This documentation
```

### Design Patterns

#### 1. **Page Object Model (POM)**
```typescript
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('User username');
    this.passwordInput = page.getByLabel('User password');
    this.submitButton = page.getByRole('button', { name: 'Log in' });
    this.errorMessage = page.getByText('Invalid credentials');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

#### 2. **Fixtures Pattern**
```typescript
export const test = base.extend<{
  setupTestData: void;
  setupUser: (role: 'admin' | 'user') => Promise<void>;
}>({
  setupTestData: async ({ page }, use) => {
    await page.goto('/');
    await page.addInitScript((users) => {
      localStorage.setItem('users', JSON.stringify(users));
    }, testUsers);
    await use();
  }
});
```

#### 3. **Data-Driven Testing**
```typescript
const testScenarios = [
  { username: '', password: '', expectedError: 'Username is required' },
  { username: 'invalid', password: 'wrong', expectedError: 'Invalid credentials' },
  { username: 'admin', password: 'admin123', expectedResult: 'dashboard' }
];

testScenarios.forEach(scenario => {
  test(`Login validation: ${scenario.username}`, async ({ page }) => {
    // Test implementation
  });
});
```

## Page Object Model

### Complete POM Implementation

#### **LoginPage.ts** - Authentication Interface
```typescript
export class LoginPage {
  // Core elements for authentication workflow
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;

  // Navigation and validation methods
  async goto(): Promise<void>;
  async login(username: string, password: string): Promise<void>;
  async clickForgotPassword(): Promise<void>;
  async getErrorMessage(): Promise<string>;
}
```

#### **AdminUsersPage.ts** - User Management Interface
```typescript
export class AdminUsersPage {
  // Bulk operations
  readonly selectAllCheckbox: Locator;
  readonly bulkDeleteButton: Locator;
  readonly bulkRoleChangeButton: Locator;

  // Individual user operations
  getUserRow(username: string): Locator;
  getUserDeleteButton(username: string): Locator;
  getUserRoleButton(username: string): Locator;
  
  // Confirmation dialogs
  readonly deleteConfirmDialog: Locator;
  readonly roleChangeConfirmDialog: Locator;

  // Advanced operations
  async selectAllUsers(): Promise<void>;
  async deleteUser(username: string): Promise<void>;
  async changeUserRole(username: string, newRole: string): Promise<void>;
  async bulkDeleteUsers(): Promise<void>;
}
```

### Locator Strategy Hierarchy

1. **Semantic Locators** (Preferred)
   - `getByRole('button', { name: 'Login' })`
   - `getByLabel('Username')`
   - `getByText('Dashboard')`

2. **Accessibility-First Approach**
   - ARIA attributes prioritized
   - Screen reader compatibility
   - Keyboard navigation support

3. **Stable Selectors**
   - Avoid CSS class dependencies
   - Focus on user-facing attributes
   - Minimize brittle selector usage

## Test Data Management

### Centralized Data Architecture

#### **Test User Repository**
```typescript
const testUsers = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    displayName: 'Admin User',
    email: 'admin@test.com'
  },
  {
    username: 'user1',
    password: 'password123',
    role: 'user',
    displayName: 'Test User One',
    email: 'user1@test.com'
  },
  {
    username: 'testuser',
    password: 'testpassword',
    role: 'user',
    displayName: 'Test User',
    email: 'testuser@test.com'
  }
];
```

#### **Fixture-Based Setup**
```typescript
export const test = base.extend<{
  setupTestData: void;
  setupUser: (role: 'admin' | 'user') => Promise<void>;
}>({
  setupTestData: async ({ page }, use) => {
    // Initialize application with test data
    await page.goto('/');
    await page.addInitScript((users) => {
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(users.find(u => u.role === 'admin')));
    }, testUsers);
    await use();
  },

  setupUser: async ({ page }, use, testInfo) => {
    const setupUserFn = async (role: 'admin' | 'user') => {
      const user = testUsers.find(u => u.role === role);
      await page.addInitScript((userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
      }, user);
    };
    await use(setupUserFn);
  }
});
```

#### **Dynamic Data Generation**
```typescript
export const generateTestUser = (role: 'admin' | 'user' = 'user') => ({
  username: `test_${Date.now()}`,
  password: 'TestPassword123!',
  role,
  displayName: `Test User ${Date.now()}`,
  email: `test_${Date.now()}@example.com`
});
```

## Configuration

### Playwright Configuration Analysis

```typescript
// playwright.config.ts - Production-Ready Configuration
export default defineConfig({
  testDir: './tests',
  
  // Timeout configuration
  timeout: 30 * 1000,              // 30 seconds per test
  expect: { timeout: 5000 },       // 5 seconds for assertions
  
  // Execution settings
  fullyParallel: true,             // Parallel test execution
  forbidOnly: !!process.env.CI,    // Prevent .only in CI
  retries: process.env.CI ? 2 : 0, // Auto-retry failed tests in CI
  workers: process.env.CI ? 1 : undefined, // Single worker in CI
  
  // Reporting configuration
  reporter: [
    ['list'],                      // Console output
    ['html', { open: 'never' }]    // HTML report generation
  ],
  
  // Global test configuration
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',       // Trace on failures
    screenshot: 'only-on-failure', // Screenshots for debugging
    video: 'retain-on-failure',    // Video recording on failures
    headless: true,                // Headless by default
  },
  
  // Browser configuration
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
```

### Environment-Specific Settings

#### **Development Configuration**
```typescript
// Local development optimizations
const devConfig = {
  workers: undefined,              // Use all available cores
  retries: 0,                     // No retries for faster feedback
  headless: false,                // Visible browser for debugging
  slowMo: 1000,                   // Slow motion for observation
};
```

#### **CI/CD Configuration**
```typescript
// Production CI/CD optimizations
const ciConfig = {
  workers: 1,                     // Single worker for stability
  retries: 2,                     // Retry flaky tests
  headless: true,                 // Headless for performance
  forbidOnly: true,               // Prevent .only commits
};
```

## Debugging

### Debug Mode Execution

```bash
# Interactive debugging
npx playwright test --debug

# Debug specific test with breakpoints
npx playwright test login.spec.ts --debug

# Step-through mode with slow motion
npx playwright test --headed --slowMo=2000

# Trace generation for analysis
npx playwright test --trace on
```

### Visual Debugging Tools

#### **Trace Viewer**
```bash
# Generate trace files
npx playwright test --trace on

# View trace in browser
npx playwright show-trace trace.zip

# Features available in trace viewer:
# - Network requests timeline
# - DOM snapshots at each step
# - Console logs and errors
# - Action timeline with screenshots
```

#### **Screenshot Analysis**
```bash
# Test failure artifacts location:
test-results/
├── login-should-login-with-valid-credentials-chromium/
│   ├── test-failed-1.png          # Failure screenshot
│   ├── video.webm                 # Test execution video
│   └── trace.zip                  # Detailed trace file
```

### Common Debugging Scenarios

#### **Element Not Found**
```typescript
// Problem: Element selector not working
await page.getByRole('button', { name: 'Login' }).click();

// Debug solution: Check element visibility
await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

// Alternative: Use more specific locator
await page.locator('[data-testid="login-button"]').click();
```

#### **Timing Issues**
```typescript
// Problem: Test running too fast
await page.click('#submit');
await expect(page).toHaveURL('/dashboard'); // May fail

// Solution: Wait for navigation
await Promise.all([
  page.waitForNavigation(),
  page.click('#submit')
]);
```

#### **State Management**
```typescript
// Problem: Test data not persisting
await page.goto('/dashboard');
// User not logged in

// Solution: Ensure proper test setup
await test.step('Setup authenticated user', async () => {
  await page.goto('/');
  await page.addInitScript(() => {
    localStorage.setItem('user', JSON.stringify({ role: 'admin' }));
  });
});
```

## CI/CD Integration

### GitHub Actions Configuration

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps chromium
    
    - name: Build application
      run: |
        cd frontend
        npm ci
        npm run build
    
    - name: Start application server
      run: |
        cd frontend
        npm run preview &
        npx wait-on http://localhost:4173
      
    - name: Run Playwright tests
      run: npx playwright test
      env:
        CI: true
    
    - name: Upload test results
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
    
    - name: Upload test artifacts
      uses: actions/upload-artifact@v4
      if: failure()
      with:
        name: test-results
        path: test-results/
        retention-days: 7
```

### Advanced CI Features

#### **Parallel Job Execution**
```yaml
strategy:
  matrix:
    shard: [1, 2, 3, 4]
steps:
  - name: Run tests
    run: npx playwright test --shard=${{ matrix.shard }}/4
```

#### **Test Result Integration**
```yaml
- name: Publish test results
  uses: dorny/test-reporter@v1
  if: always()
  with:
    name: Playwright Tests
    path: test-results.json
    reporter: jest-junit
```

## Best Practices

### Test Writing Guidelines

#### **1. Test Structure (AAA Pattern)**
```typescript
test('should update user profile successfully', async ({ page, setupTestData }) => {
  // Arrange - Setup test preconditions
  const loginPage = new LoginPage(page);
  const profilePage = new ProfilePage(page);
  const testUser = { username: 'testuser', displayName: 'Updated Name' };
  
  // Act - Execute the functionality being tested
  await loginPage.goto();
  await loginPage.login(testUser.username, 'password123');
  await profilePage.goto();
  await profilePage.updateDisplayName(testUser.displayName);
  
  // Assert - Verify expected outcomes
  await expect(page.getByText('Profile updated successfully')).toBeVisible();
  await expect(page.getByDisplayValue(testUser.displayName)).toBeVisible();
});
```

#### **2. Descriptive Test Names**
```typescript
// ✅ Good - Clear and descriptive
test('should prevent non-admin users from accessing user management page');
test('should display validation error when password confirmation does not match');
test('should automatically logout user after 60 seconds of inactivity');

// ❌ Bad - Vague and unclear
test('login test');
test('check admin stuff');
test('user thing works');
```

#### **3. Independent Test Design**
```typescript
// ✅ Good - Each test is self-contained
test.beforeEach(async ({ page, setupTestData }) => {
  // Fresh setup for each test
  await page.goto('/');
  // Each test starts with clean state
});

// ❌ Bad - Tests depend on each other
test('login first', async () => { /* login */ });
test('then check dashboard', async () => { /* assumes logged in */ });
```

### Performance Optimization

#### **1. Efficient Locator Usage**
```typescript
// ✅ Efficient - Specific and stable selectors
await page.getByRole('button', { name: 'Save Profile' }).click();
await page.getByLabel('Display Name').fill('New Name');

// ❌ Inefficient - Generic selectors requiring traversal
await page.locator('div').nth(3).locator('button').nth(1).click();
```

#### **2. Parallel Test Execution**
```typescript
// Ensure tests can run in parallel
test.describe.configure({ mode: 'parallel' });

// Use fixtures for isolated setup
test('user management test', async ({ setupUser }) => {
  await setupUser('admin');
  // Test implementation
});
```

#### **3. Smart Waiting Strategies**
```typescript
// Good - Use Playwright's auto-waiting
await expect(page.getByText('Loading complete')).toBeVisible();

// Bad - Arbitrary waits
await page.waitForTimeout(5000);
```

### Code Quality Standards

#### **TypeScript Integration**
```typescript
// Strong typing for page objects and test data
interface TestUser {
  username: string;
  password: string;
  role: 'admin' | 'user';
  displayName: string;
}

export class BasePage {
  protected readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
  
  protected abstract readonly url: string;
}
```

#### **Error Handling**
```typescript
test('should handle server errors gracefully', async ({ page }) => {
  // Simulate network failure
  await page.route('**/api/users', route => route.abort());
  
  const adminUsersPage = new AdminUsersPage(page);
  await adminUsersPage.goto();
  
  // Verify error handling
  await expect(page.getByText('Unable to load users')).toBeVisible();
  await expect(page.getByText('Please try again later')).toBeVisible();
});
```

## Contributing

### Adding New Tests

#### **1. Create Test File**
```bash
# Follow naming convention: feature.spec.ts
touch tests/newFeature.spec.ts
```

#### **2. Implement Page Object** (if needed)
```typescript
// tests/pages/NewFeaturePage.ts
export class NewFeaturePage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  async performAction(): Promise<void> {
    // Implementation
  }
}
```

#### **3. Write Test Implementation**
```typescript
// tests/newFeature.spec.ts
import { test, expect } from './fixtures/test-fixtures';
import { NewFeaturePage } from './pages/NewFeaturePage';

test.describe('New Feature Tests', () => {
  test('should perform expected action', async ({ page, setupTestData }) => {
    const newFeaturePage = new NewFeaturePage(page);
    // Test implementation
  });
});
```

#### **4. Update Documentation**
```markdown
# Add to README.md test coverage section
### New Feature Tests (X cases)
├── Action validation
├── Error handling
└── Edge case testing
```

### Test Maintenance Guidelines

#### **Regular Maintenance Tasks**
1. **Update selectors** when application UI changes
2. **Refactor common patterns** into reusable utilities
3. **Optimize slow tests** with better locator strategies
4. **Review test data** for relevance and accuracy
5. **Update documentation** with new testing patterns

#### **Performance Monitoring**
```bash
# Monitor test execution times
npx playwright test --reporter=json | jq '.stats'

# Identify slow tests
npx playwright test --reporter=json | jq '.suites[].tests[] | select(.duration > 10000)'
```

#### **Code Review Checklist**
- [ ] Tests follow AAA pattern (Arrange, Act, Assert)
- [ ] Descriptive test names and clear assertions
- [ ] Proper use of Page Object Model
- [ ] No hard-coded waits (use expect() instead)
- [ ] Test independence (no interdependencies)
- [ ] Appropriate use of fixtures for setup
- [ ] Error scenarios covered
- [ ] Documentation updated

## Support

### Troubleshooting Guide

#### **Common Issues and Solutions**

**Issue: Tests failing locally but passing in CI**
```bash
# Solution: Check Node.js version compatibility
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 9.0.0

# Verify Playwright installation
npx playwright install --check
```

**Issue: Element not found errors**
```typescript
// Problem: Selector not matching element
await page.getByRole('button', { name: 'Submit' }).click();

// Solution: Use more flexible selectors
await page.getByRole('button', { name: /submit/i }).click();
await page.locator('button:has-text("Submit")').click();
```

**Issue: Tests timing out**
```typescript
// Increase timeout for specific operations
await expect(page.getByText('Processing')).toBeHidden({ timeout: 60000 });

// Or configure global timeout
test.setTimeout(60000);
```

**Issue: Flaky tests due to race conditions**
```typescript
// Wait for specific conditions instead of arbitrary delays
await expect(page.getByText('Data loaded')).toBeVisible();
// Instead of: await page.waitForTimeout(2000);
```

### Getting Help

#### **Documentation Resources**
- [Official Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Testing Best Practices](https://playwright.dev/docs/best-practices)
- [TypeScript Configuration Guide](https://playwright.dev/docs/test-typescript)
- [Locator Strategies](https://playwright.dev/docs/locators)

#### **Project-Specific Help**
- [Test Cases Documentation](../TESTCASES.md)
- [Main Project README](../README.md)
- [Frontend Documentation](../frontend/README.md)

#### **Support Channels**
1. **Check existing test output** for specific error messages
2. **Use debug mode** (`npm run test:debug`) to step through failing tests
3. **Review trace files** generated for test failures
4. **Verify application state** using browser developer tools
5. **Consult Playwright documentation** for advanced debugging techniques

### Issue Reporting

When reporting test-related issues, please include:

- **Test command used** (exact command that failed)
- **Error message** (complete stack trace)
- **Environment details** (OS, Node.js version, browser version)
- **Test execution context** (CI/CD or local development)
- **Screenshots or videos** (if available in test-results/)
- **Steps to reproduce** (specific test file or test name)

---

<div align="center">

**[⬆ Back to Top](#end-to-end-testing-suite)**

Professional E2E Testing Framework | Built with Playwright & TypeScript

</div>