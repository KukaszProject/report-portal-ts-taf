import { test, expect } from '../../src/core/fixtures/testFixtures';

test.describe('ReportPortal Dashboard Flows', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.navigate();

    // ANTI-FLAKE FIX: The demo environment can be slow to clear the "Loading..." screen.
    // We wait for a reliable element (the Add button) and give it up to 15 seconds
    // to appear before failing the test.
    await expect(dashboardPage.getAddNewDashboardBtn()).toBeVisible({ timeout: 15000 });
  });

  test('Should display core dashboard elements upon load', async ({ dashboardPage, page }) => {
    await test.step('Verify navigation to dashboard URL', async () => {
      await expect(page).toHaveURL(/.*#default_personal\/dashboard/);
    });

    await test.step('Verify essential UI elements are visible', async () => {
      // We can still assert the avatar here, but we aren't relying on it for page sync anymore
      await expect(dashboardPage.getUserAvatar()).toBeVisible();
      await expect(dashboardPage.getAddNewDashboardBtn()).toBeVisible();
    });
  });

  test('Should open "Add New Dashboard" modal when button is clicked', async ({
    dashboardPage,
  }) => {
    await test.step('Click the Add New Dashboard button', async () => {
      // The button is already guaranteed to be visible from the beforeEach hook
      await dashboardPage.clickAddNewDashboard();
    });

    await test.step('Verify the modal window opens', async () => {
      await expect(dashboardPage.getAddDashboardModalTitle()).toBeVisible();
    });
  });
});
