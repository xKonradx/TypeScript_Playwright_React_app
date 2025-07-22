import { test as base, expect, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

// Load test user data
const testUsersPath = path.join(__dirname, '..', '..', 'frontend', 'src', 'data', 'users.json');
const testUsers = JSON.parse(fs.readFileSync(testUsersPath, 'utf8'));

// Test data helper functions
export const testData = {
  users: testUsers,
  getUser: (role: 'admin' | 'user') => testUsers.find(u => u.role === role),
  getValidUser: () => testUsers.find(u => u.username === 'validUser'),
  getAdminUser: () => testUsers.find(u => u.role === 'admin'),
};

export const test = base.extend<{ 
  setupTestData: void;
  setupUser: (user: any) => Promise<void>;
}>({
  setupTestData: async ({ page }, use) => {
    // Initialize localStorage with test user data before each test
    await page.goto('/');
    await page.addInitScript((users) => {
      localStorage.setItem('users', JSON.stringify(users));
      // Also set up a logged-in admin user for protected routes
      const adminUser = users.find(u => u.role === 'admin');
      if (adminUser) {
        localStorage.setItem('user', JSON.stringify({
          username: adminUser.username,
          role: adminUser.role,
          displayName: adminUser.displayName || adminUser.username,
          avatar: adminUser.avatar || ''
        }));
      }
    }, testUsers);
    await use();
  },
  
  setupUser: async ({ page }, use) => {
    const setupUserHelper = async (user: any) => {
      await page.goto('/');
      await page.addInitScript((users, currentUser) => {
        localStorage.setItem('users', JSON.stringify(users));
        if (currentUser) {
          localStorage.setItem('user', JSON.stringify({
            username: currentUser.username,
            role: currentUser.role,
            displayName: currentUser.displayName || currentUser.username,
            avatar: currentUser.avatar || ''
          }));
        }
      }, testUsers, user);
    };
    await use(setupUserHelper);
  },
});

export { expect };
