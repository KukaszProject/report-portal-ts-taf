import { test as base } from '@playwright/test';
import { LoginPage } from '../../business/pages/LoginPage';
import { logger } from '../logger/logger';
import { DashboardPage } from '../../business/pages/DashboardPage';

type AppFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  log: typeof logger;
};

export const test = base.extend<AppFixtures>({
  log: async ({}, use) => {
    await use(logger);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  }
});

export { expect } from '@playwright/test';