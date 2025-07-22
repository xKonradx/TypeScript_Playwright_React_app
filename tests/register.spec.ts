import { test, expect } from './fixtures/test-fixtures';
import { RegisterPage } from './pages/RegisterPage';

test.describe('Register Page', () => {
  test('should register successfully with valid data', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register('newuser', 'StrongPass123!', 'StrongPass123!');
    await expect(registerPage.successMessage).toBeVisible();
  });

  test('should show error for existing username/email', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register('existinguser', 'StrongPass123!', 'StrongPass123!');
    await expect(registerPage.errorMessage).toBeVisible();
  });

  test('should show error for invalid/weak password', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register('user', '123', '123');
    await expect(registerPage.errorMessage).toBeVisible();
  });

  test('should show error for mismatched passwords', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register('user', 'pass1', 'pass2');
    await expect(registerPage.errorMessage).toBeVisible();
  });

  test('should show error on empty fields', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register('', '', '');
    await expect(page.locator('text="Enter username."')).toBeVisible();
    await expect(page.locator('text="Enter password."')).toBeVisible();
    await expect(page.locator('text="Repeat password."')).toBeVisible();
  });
});
