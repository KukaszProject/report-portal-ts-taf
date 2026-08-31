import { Page } from '@playwright/test';
import { logger } from '../logger/logger';

export abstract class BasePage {
  constructor(protected page: Page, public url: string = '') {}

  async navigate(path: string = this.url): Promise<void> {
    logger.info(`Navigating to: ${path}`);
    await this.page.goto(path);
  }

  async waitForPageLoad(): Promise<void> {
    logger.info('Waiting for network to be idle...');
    await this.page.waitForLoadState('networkidle');
  }
}