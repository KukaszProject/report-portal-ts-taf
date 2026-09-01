import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../core/base/BasePage';
import { logger } from '../../core/logger/logger';
import { User } from '../models/User';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, '/ui/#login');
    this.usernameInput = page.locator('input[name="login"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.getByText('An error occurred', { exact: false }).first();
  }

  async login(user: User): Promise<void> {
    logger.info(`Logging in with user: ${user.username}`);
    await this.usernameInput.fill(user.username);
    if (user.password) await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }

  getErrorMessage(): Locator {
    logger.info('Retrieving error message locator');
    return this.errorMessage;
  }
}
