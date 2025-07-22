import { Locator, Page } from '@playwright/test';

export class AdminPage {
  readonly page: Page;
  readonly usersLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usersLink = page.getByTestId('admin-users-link');
  }

  async goto() {
    await this.page.goto('/admin');
  }
}
