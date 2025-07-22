import { Locator, Page } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly avatar: Locator;
  readonly avatarUpload: Locator;
  readonly avatarInput: Locator;
  readonly displayNameInput: Locator;
  readonly saveBtn: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.avatar = page.getByTestId('profile-avatar');
    this.avatarUpload = page.getByTestId('profile-avatar-upload');
    this.avatarInput = page.getByTestId('profile-avatar-input');
    this.displayNameInput = page.getByTestId('profile-displayname-input');
    this.saveBtn = page.getByTestId('profile-save-btn');
    this.errorMessage = page.getByTestId('profile-error');
    this.successMessage = page.getByTestId('profile-success');
  }

  async goto() {
    await this.page.goto('/profile');
  }
}
