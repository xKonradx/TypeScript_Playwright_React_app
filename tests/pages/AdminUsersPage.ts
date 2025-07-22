import { Locator, Page } from '@playwright/test';

export class AdminUsersPage {
  readonly page: Page;
  readonly usersTable: Locator;
  readonly selectAll: Locator;
  readonly bulkDeleteBtn: Locator;
  readonly bulkRoleSelect: Locator;
  readonly userRow: (username: string) => Locator;
  readonly userSelect: (username: string) => Locator;
  readonly userRole: (username: string) => Locator;
  readonly userDelete: (username: string) => Locator;
  readonly deleteCancel: Locator;
  readonly deleteConfirm: Locator;
  readonly roleCancel: Locator;
  readonly roleConfirm: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usersTable = page.getByTestId('admin-users-table');
    this.selectAll = page.getByTestId('admin-users-select-all');
    this.bulkDeleteBtn = page.getByTestId('admin-bulk-delete-btn');
    this.bulkRoleSelect = page.getByTestId('admin-bulk-role-select');
    this.userRow = (username: string) => page.getByTestId(`admin-user-row-${username}`);
    this.userSelect = (username: string) => page.getByTestId(`admin-user-select-${username}`);
    this.userRole = (username: string) => page.getByTestId(`admin-user-role-${username}`);
    this.userDelete = (username: string) => page.getByTestId(`admin-user-delete-${username}`);
    this.deleteCancel = page.getByTestId('admin-delete-cancel');
    this.deleteConfirm = page.getByTestId('admin-delete-confirm');
    this.roleCancel = page.getByTestId('admin-role-cancel');
    this.roleConfirm = page.getByTestId('admin-role-confirm');
    this.title = page.getByTestId('admin-users-title');
  }

  async goto() {
    await this.page.goto('/admin/users');
  }
}
