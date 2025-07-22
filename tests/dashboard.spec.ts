import { test, expect } from './fixtures/test-fixtures';
import { DashboardPage } from './pages/DashboardPage';

test.describe('Dashboard', () => {
  test('should load dashboard for authenticated user', async ({ page, setupTestData }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await expect(dashboardPage.dashboardBtn).toBeVisible();
  });

  test('should not load dashboard for unauthenticated user', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await expect(page).toHaveURL(/login/);
  });

  test('should interact with all dashboard buttons/links', async ({ page, setupTestData }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.dashboardBtn.click();
    await dashboardPage.crashTestBtn.click();
    // Optionally check for expected results after clicks
  });
});
