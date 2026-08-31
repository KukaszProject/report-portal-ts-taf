import { test, expect } from '../../src/core/fixtures/testFixtures';
import { UserBuilder } from '../../src/business/builders/UserBuilder';

test.describe('ReportPortal Authentication Flows', () => {

  test('Should login successfully with valid admin credentials', async ({ loginPage, log, page }) => {
    const defaultUser = new UserBuilder().asDefault().build();
    
    await test.step('Navigate to the application and login', async () => {
      await loginPage.navigate();
      await loginPage.login(defaultUser);
    });
    
    await test.step('Verify successful navigation to the dashboard', async () => {
      await expect(page).toHaveURL(/.*#default_personal\/.*/);
    });
  });

    test('Should show error with invalid credentials', async ({ loginPage, log }) => {

    const invalidUser = new UserBuilder()
      .asDefault()
      .withPassword('WrongPassword123!')
      .build();

    await test.step('Attempt login with invalid password', async () => {
      await loginPage.navigate();
      await loginPage.login(invalidUser);
    });
    
    await test.step('Verify invalid credentials error message is displayed', async () => {
      await expect(loginPage.getErrorMessage()).toBeVisible();
    });
  });
});