import { test as setup, expect } from '../../src/core/fixtures/testFixtures';
import { UserBuilder } from '../../src/business/builders/UserBuilder';
import * as path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/admin.json');

setup('Authenticate as Default User', async ({ page, loginPage, log }) => {
  log.info('Running global authentication setup...');
  
  const adminUser = new UserBuilder().asDefault().build();
  
  await loginPage.navigate();
  await loginPage.login(adminUser);
  
  await expect(page).toHaveURL(/.*#default_personal\/.*/);
  
  await page.context().storageState({ path: authFile });
  log.info(`Authentication state saved to ${authFile}`);
});