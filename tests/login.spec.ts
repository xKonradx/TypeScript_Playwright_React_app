import { test, expect } from './fixtures/test-fixtures';
import { LoginPage } from './pages/LoginPage';

test.describe('Login Page', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.usernameInput.fill('admin');
    await loginPage.passwordInput.fill('adminpassword');
    await loginPage.submitButton.click();
    await expect(page).toHaveURL(/dashboard|profile/);
  });

  test('should display error on invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.usernameInput.fill('admin');
    await loginPage.passwordInput.fill('wrongPassword');
    await loginPage.submitButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('should display error on empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.usernameInput.fill('');
    await loginPage.passwordInput.fill('');
    await loginPage.submitButton.click();
    await expect(page.getByText('Enter username')).toBeVisible();
    await expect(page.getByText('Enter password')).toBeVisible();
  });

  test('should navigate to password reset via forgot password link', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL(/reset/);
  });

  test('should redirect to dashboard/profile after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.usernameInput.fill('admin');
    await loginPage.passwordInput.fill('adminpassword');
    await loginPage.submitButton.click();
    await expect(page).toHaveURL(/dashboard|profile/);
  });
});
