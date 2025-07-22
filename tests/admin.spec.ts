import { test, expect, testData } from './fixtures/test-fixtures';
import { AdminPage } from './pages/AdminPage';

test.describe('Admin Page', () => {
  test('should load admin page for admin user', async ({ page, setupTestData }) => {
    const adminPage = new AdminPage(page);
    await adminPage.goto();
    await expect(adminPage.usersLink).toBeVisible();
  });

  test('should not load admin page for non-admin user', async ({ page }) => {
    // Set up regular user without admin privileges
    await page.goto('/');
    await page.addInitScript(() => {
      const testUser = { username: 'validUser', role: 'user', displayName: 'validUser', avatar: '' };
      localStorage.setItem('user', JSON.stringify(testUser));
    });
    
    const adminPage = new AdminPage(page);
    await adminPage.goto();
    
    // According to the code analysis, non-admin users should see "Access Denied" message, not be redirected
    await expect(page.getByText(/access denied/i)).toBeVisible({ timeout: 10000 });
    // URL should still be /admin but showing access denied message
    await expect(page).toHaveURL('/admin');
  });
});
