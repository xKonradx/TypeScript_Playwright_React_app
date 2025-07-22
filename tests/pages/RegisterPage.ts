import { Locator, Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel(/username/i);
    // Use more specific labels for password fields to avoid strict mode violation
    this.passwordInput = page.getByLabel('User password', { exact: true });
    this.repeatPasswordInput = page.getByLabel('Repeat user password', { exact: true });
    this.submitButton = page.getByRole('button', { name: /register/i });
    this.successMessage = page.getByTestId('register-success');
    this.errorMessage = page.getByTestId('register-error');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async register(username: string, password: string, repeat: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeat);
    await this.submitButton.click();
  }
}
