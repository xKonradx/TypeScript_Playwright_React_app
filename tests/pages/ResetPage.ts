import { Locator, Page } from '@playwright/test';

export class ResetPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('reset-username-input');
    this.passwordInput = page.getByTestId('reset-password-input');
    this.repeatInput = page.getByTestId('reset-repeat-input');
    this.submitButton = page.getByTestId('reset-submit-btn');
    this.successMessage = page.getByTestId('reset-success');
    this.errorMessage = page.getByTestId('reset-error');
  }

  async goto() {
    await this.page.goto('/reset');
  }

  async reset(username: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill('newpassword123');
    await this.repeatInput.fill('newpassword123');
    await this.submitButton.click();
  }
}
