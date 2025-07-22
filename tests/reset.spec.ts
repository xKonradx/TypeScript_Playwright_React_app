import { test, expect, testData } from './fixtures/test-fixtures';
import { ResetPage } from './pages/ResetPage';

test.describe('Password Reset Page', () => {
  test('should request password reset with valid email', async ({ page }) => {
    // Set up users data in localStorage before the test using helper
    await page.goto('/');
    await page.addInitScript((users) => {
      localStorage.setItem('users', JSON.stringify(users));
    }, testData.users);
    
    const resetPage = new ResetPage(page);
    await resetPage.goto();
    const adminUser = testData.getAdminUser();
    await resetPage.reset(adminUser.username);
    await expect(resetPage.successMessage).toBeVisible();
  });

  test('should show error for invalid/nonexistent email', async ({ page }) => {
    const resetPage = new ResetPage(page);
    await resetPage.goto();
    await resetPage.reset('nonexistentuser');
    await expect(resetPage.errorMessage).toBeVisible({ timeout: 10000 });
  });

  test('should show error on empty field', async ({ page }) => {
    const resetPage = new ResetPage(page);
    await resetPage.goto();
    await resetPage.reset('');
    await expect(resetPage.errorMessage).toBeVisible({ timeout: 10000 });
  });
});
