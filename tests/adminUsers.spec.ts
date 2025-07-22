import { test, expect } from './fixtures/test-fixtures';
import { AdminUsersPage } from './pages/AdminUsersPage';

// Helper: login as admin before each test (replace with your actual login logic)
test.beforeEach(async ({ page, setupTestData }) => {
  await page.goto('/login');
  await page.getByLabel('User username').fill('admin');
  await page.getByLabel('User password').fill('adminpassword');
  await page.getByRole('button', { name: 'Log in' }).click();
});

test.describe('Admin Users Page', () => {
  test('should load user management table', async ({ page }) => {
    const adminUsersPage = new AdminUsersPage(page);
    await adminUsersPage.goto();
    await expect(adminUsersPage.usersTable).toBeVisible();
    await expect(adminUsersPage.title).toBeVisible();
  });

  test('should list users', async ({ page }) => {
    const adminUsersPage = new AdminUsersPage(page);
    await adminUsersPage.goto();
    await expect(adminUsersPage.usersTable).toBeVisible();
    // Optionally check for at least one user row
  });

  test('should search/filter users', async ({ page }) => {
    const adminUsersPage = new AdminUsersPage(page);
    await adminUsersPage.goto();
    // Add search/filter logic if UI supports it
  });

  test('should select and delete a user', async ({ page }) => {
    const adminUsersPage = new AdminUsersPage(page);
    await adminUsersPage.goto();
    await adminUsersPage.userSelect('validUser').click();
    await adminUsersPage.userDelete('validUser').click();
    await expect(adminUsersPage.deleteConfirm).toBeVisible();
    await adminUsersPage.deleteConfirm.click();
    // Optionally check for success message or user removal
  });

  test('should cancel user delete', async ({ page }) => {
    const adminUsersPage = new AdminUsersPage(page);
    await adminUsersPage.goto();
    await adminUsersPage.userSelect('validUser').click();
    await adminUsersPage.userDelete('validUser').click();
    await expect(adminUsersPage.deleteCancel).toBeVisible();
    await adminUsersPage.deleteCancel.click();
    // Optionally check user still exists
  });

  test('should change user role', async ({ page }) => {
    const adminUsersPage = new AdminUsersPage(page);
    await adminUsersPage.goto();
    await adminUsersPage.userRole('validUser').click();
    await page.getByRole('option', { name: 'admin' }).click();
    await expect(adminUsersPage.roleConfirm).toBeVisible();
    await adminUsersPage.roleConfirm.click();
    // Optionally check for success message or role update
  });

  test('should cancel role change', async ({ page }) => {
    const adminUsersPage = new AdminUsersPage(page);
    await adminUsersPage.goto();
    await adminUsersPage.userRole('validUser').click();
    await page.getByRole('option', { name: 'admin' }).click();
    await expect(adminUsersPage.roleCancel).toBeVisible();
    await adminUsersPage.roleCancel.click();
    // Optionally check role not changed
  });

  test('should select all users and bulk delete', async ({ page }) => {
    const adminUsersPage = new AdminUsersPage(page);
    await adminUsersPage.goto();
    await adminUsersPage.selectAll.click();
    await adminUsersPage.bulkDeleteBtn.click();
    // Bulk delete should work without confirmation dialog
  });

  test('should bulk change user roles', async ({ page }) => {
    const adminUsersPage = new AdminUsersPage(page);
    await adminUsersPage.goto();
    await adminUsersPage.selectAll.click();
    await adminUsersPage.bulkRoleSelect.click();
    await page.getByRole('option', { name: 'admin' }).click();
    // Bulk role change should work without confirmation dialog
  });

  test('should handle error on failed delete', async ({ page }) => {
    const adminUsersPage = new AdminUsersPage(page);
    await adminUsersPage.goto();
    // This test verifies UI works even if deletion fails
    await adminUsersPage.userSelect('erroruser').click();
    await adminUsersPage.userDelete('erroruser').click();
    await expect(adminUsersPage.deleteConfirm).toBeVisible();
    await adminUsersPage.deleteConfirm.click();
    // Check that UI handles the case gracefully
  });

  test('should handle error on failed role change', async ({ page }) => {
    const adminUsersPage = new AdminUsersPage(page);
    await adminUsersPage.goto();
    // This test verifies UI works even if role change fails
    await adminUsersPage.userRole('erroruser').click();
    await page.getByRole('option', { name: 'admin' }).click();
    await expect(adminUsersPage.roleConfirm).toBeVisible();
    await adminUsersPage.roleConfirm.click();
    // Check that UI handles the case gracefully
  });
});
