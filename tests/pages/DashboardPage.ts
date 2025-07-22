import { Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardBtn: Locator;
  readonly crashTestBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardBtn = page.getByTestId('dashboard-btn');
    this.crashTestBtn = page.getByTestId('crash-test-btn');
  }

  async goto() {
    await this.page.goto('/dashboard');
  }
}
