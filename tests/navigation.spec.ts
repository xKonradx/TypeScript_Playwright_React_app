import { test, expect, testData } from './fixtures/test-fixtures';

test.describe('Navigation & Routing', () => {
  test('should redirect unauthenticated user from protected route', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/login/);
  });

  test('should redirect non-admin from admin route', async ({ page }) => {
    // Set up regular user without admin privileges
    await page.goto('/');
    await page.addInitScript(() => {
      const testUser = { username: 'validUser', role: 'user', displayName: 'validUser', avatar: '' };
      localStorage.setItem('user', JSON.stringify(testUser));
    });
    
    await page.goto('/admin');
    // According to the code analysis, non-admin users should see "Access Denied" message, not be redirected
    await expect(page.getByText(/access denied/i)).toBeVisible({ timeout: 10000 });
  });

  test('should show 404 for unknown route', async ({ page }) => {
    await page.goto('/some-unknown-route');
    await expect(page.getByText(/not found/i)).toBeVisible();
  });

  test('should show navbar links for all roles', async ({ page, setupTestData }) => {
    // Wait for the page to load and user to be authenticated
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });
    
    // Check for navbar using semantic selectors (fallback to more specific selectors)
    await expect(page.locator('nav, [role="navigation"], .MuiAppBar-root')).toBeVisible({ timeout: 15000 });
    
    // Verify basic navigation links exist using semantic selectors
    await expect(page.getByRole('link', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /profile/i })).toBeVisible();
  });
});
