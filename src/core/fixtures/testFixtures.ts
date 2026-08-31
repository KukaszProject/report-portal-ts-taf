import { test as base } from '@playwright/test';
import { LoginPage } from '../../business/pages/LoginPage';
import { logger } from '../logger/logger';

type AppFixtures = {
  loginPage: LoginPage;
  log: typeof logger;
};

export const test = base.extend<AppFixtures>({
  log: async ({}, use) => {
    await use(logger);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
});

export { expect } from '@playwright/test';