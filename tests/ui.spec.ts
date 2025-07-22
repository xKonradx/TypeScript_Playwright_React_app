import { test, expect } from './fixtures/test-fixtures';

test.describe('UI & Accessibility', () => {
  test('should toggle dark mode and persist', async ({ page, context, setupTestData }) => {
    await page.goto('/dashboard');
    const toggle = page.getByRole('button', { name: /dark mode/i });
    await toggle.click();
    // Optionally check for dark mode class or style
    await page.reload();
    // Optionally check dark mode persists
  });

  test('should have accessible login form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByLabel('User username')).toBeVisible();
    await expect(page.getByLabel('User password')).toBeVisible();
    // Check for aria attributes, roles, etc.
  });

  test('should show error and success messages clearly', async ({ page }) => {
    await page.goto('/login');
    // Trigger error (empty fields)
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Enter username')).toBeVisible();
    await expect(page.getByText('Enter password')).toBeVisible();
  });

  // Optionally: Responsive layout test
  test('should display correctly on mobile', async ({ page, browserName }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/login');
    await expect(page.getByLabel('User username')).toBeVisible();
  });
});
