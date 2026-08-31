import { test, expect } from '../../src/core/fixtures/testFixtures';
import { User } from '../../src/business/models/User';

test.describe('ReportPortal Authentication Flows', () => {
  
  const defaultUser: User = { 
    username: 'default', 
    password: '1q2w3e',
    email: 'admin@reportportal.io',
    role: 'ADMIN'
  };

  test('Should login successfully with valid admin credentials', async ({ loginPage, log, page }) => {
    log.info('Starting valid login test scenario');
    
    await loginPage.navigate();
    await loginPage.login(defaultUser);
    
    await expect(page).toHaveURL(/.*#default_personal*/);
    log.info('Login successful');
  });
});