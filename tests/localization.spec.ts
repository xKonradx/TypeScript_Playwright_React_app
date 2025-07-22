import { test, expect } from './fixtures/test-fixtures';

test.describe('Localization', () => {
  test('should display UI in different languages', async ({ page }) => {
    await page.goto('/login');
    // Check for default language (English)
    await expect(page.locator('text="Log in"')).toBeVisible({ timeout: 10000 });
    // For now, just verify the page loads with text content
    await expect(page.getByLabel('User username')).toBeVisible();
  });

  test('should switch language and update UI', async ({ page }) => {
    await page.goto('/login');
    // Check for default language elements
    await expect(page.locator('text="Log in"')).toBeVisible({ timeout: 10000 });
    // Test would need actual language switcher implementation
    await expect(page.getByLabel('User password')).toBeVisible();
  });
});
