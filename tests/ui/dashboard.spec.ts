import { test, expect } from '../../src/core/fixtures/testFixtures';
import { UserBuilder } from '../../src/business/builders/UserBuilder';
import { DashboardPage } from '../../src/business/pages/DashboardPage';

test.describe('ReportPortal Dashboard Flows', () => {
  
  test.beforeEach(async ({ loginPage, dashboardPage }) => {
    const defaultUser = new UserBuilder().asDefault().build();
    
    await test.step('Precondition: Authenticate as Default user', async () => {
      await loginPage.navigate();
      await loginPage.login(defaultUser);
      await dashboardPage.navigate();
    });
  });

  test('Should display core dashboard elements upon load', async ({ dashboardPage, page }) => {
    await test.step('Verify navigation to dashboard URL', async () => {
      await expect(page).toHaveURL(/.*#default_personal\/dashboard/);
    });

    await test.step('Verify essential UI elements are visible', async () => {
      await expect(dashboardPage.getUserAvatar()).toBeVisible();
      await expect(dashboardPage.getAddNewDashboardBtn()).toBeVisible();
    });
  });

  test('Should open "Add New Dashboard" modal when button is clicked', async ({ dashboardPage }) => {
    await test.step('Click the Add New Dashboard button', async () => {
      await expect(dashboardPage.getAddNewDashboardBtn()).toBeVisible();
      await dashboardPage.clickAddNewDashboard();
    });

    await test.step('Verify the modal window opens', async () => {
      await expect(dashboardPage.getAddDashboardModalTitle()).toBeVisible();
    });
  });
});