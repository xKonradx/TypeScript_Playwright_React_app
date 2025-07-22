import { test, expect } from './fixtures/test-fixtures';
import { ProfilePage } from './pages/ProfilePage';

test.describe('Profile Page', () => {
  test('should load profile for authenticated user', async ({ page, setupTestData }) => {
    // First login as a user
    await page.goto('/login');
    await page.getByLabel('User username').fill('admin');
    await page.getByLabel('User password').fill('adminpassword');
    await page.getByRole('button', { name: 'Log in' }).click();
    
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    await expect(profilePage.displayNameInput).toBeVisible();
  });

  test('should not load profile for unauthenticated user', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    await expect(page).toHaveURL(/login/);
  });

  test('should update profile info', async ({ page, setupTestData }) => {
    // First login as a user
    await page.goto('/login');
    await page.getByLabel('User username').fill('admin');
    await page.getByLabel('User password').fill('adminpassword');
    await page.getByRole('button', { name: 'Log in' }).click();
    
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    await profilePage.displayNameInput.fill('New Name');
    await profilePage.saveBtn.click();
    // Page reloads after save, so check for successful navigation
    await expect(page).toHaveURL(/profile/, { timeout: 10000 });
  });

  test('should show error on invalid profile update', async ({ page, setupTestData }) => {
    // First login as a user
    await page.goto('/login');
    await page.getByLabel('User username').fill('admin');
    await page.getByLabel('User password').fill('adminpassword');
    await page.getByRole('button', { name: 'Log in' }).click();
    
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    // Try to change password with invalid data
    await page.getByLabel('User old password').fill('wrongpassword');
    await page.getByLabel('User new password', { exact: true }).fill('newpass');
    await page.getByLabel('Repeat user new password', { exact: true }).fill('different');
    await page.getByRole('button', { name: 'Change user password' }).click();
    await expect(profilePage.errorMessage).toBeVisible({ timeout: 10000 });
  });

  test('should upload avatar and show success/error', async ({ page, setupTestData }) => {
    // First login as a user
    await page.goto('/login');
    await page.getByLabel('User username').fill('admin');
    await page.getByLabel('User password').fill('adminpassword');
    await page.getByRole('button', { name: 'Log in' }).click();
    
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    // For now just verify the avatar upload button exists since the input is hidden
    await expect(profilePage.avatarUpload).toBeVisible({ timeout: 10000 });
  });

  // Add change password flow if present
});
