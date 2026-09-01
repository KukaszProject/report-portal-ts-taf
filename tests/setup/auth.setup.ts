import { test as setup, expect } from '../../src/core/fixtures/testFixtures';
import { UserBuilder } from '../../src/business/builders/UserBuilder';
import { DashboardPage } from '../../src/business/pages/DashboardPage';
import * as path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/admin.json');

setup('Authenticate as default user', async ({ page, loginPage, log }) => {
  log.info('Running global authentication setup...');

  const defaultUser = new UserBuilder().asDefault().build();

  await loginPage.navigate();
  await loginPage.login(defaultUser);

  const dashboard = new DashboardPage(page);
  await expect(dashboard.getUserAvatar()).toBeVisible({ timeout: 15000 });

  log.info('Dashboard fully loaded. Saving storage state...');

  await page.context().storageState({ path: authFile });
  log.info(`Authentication state saved to ${authFile}`);
});
