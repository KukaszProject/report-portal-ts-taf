import { test as base } from '@playwright/test';
import { LoginPage } from '../../business/pages/LoginPage';
import { logger } from '../logger/logger';
import { DashboardPage } from '../../business/pages/DashboardPage';
import { DashboardApiService } from '../../business/api/DashboardApiService';

type AppFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  dashboardApiService: DashboardApiService;
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
  },
  dashboardApiService: async ({ request }, use) => {
    await use(new DashboardApiService(request));
  },
});

export { expect } from '@playwright/test';
