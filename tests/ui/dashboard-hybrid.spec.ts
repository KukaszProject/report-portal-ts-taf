import { test, expect } from '../../src/core/fixtures/testFixtures';

test.describe('Dashboard Hybrid Flows (API Setup / UI Assert)', () => {
  let createdDashboardId: number;
  const dashboardName = `Test_Dash_${Date.now()}`;

  test.afterEach(async ({ dashboardApiService, log }) => {
    if (createdDashboardId) {
      await test.step('Teardown: Delete dashboard via API', async () => {
        await dashboardApiService.deleteDashboard(createdDashboardId);
        log.info(`Teardown complete for Dashboard ID: ${createdDashboardId}`);
      });
    }
  });

  test('Should display newly created dashboard in the UI', async ({ dashboardApiService, dashboardPage, page }) => {
    
    await test.step('Arrange: Create a dashboard via API', async () => {
      createdDashboardId = await dashboardApiService.createDashboard({
        name: dashboardName,
        description: 'Dashboard created via automated API test setup',
        share: false
      });
    });

    await test.step('Act: Navigate to dashboards page and wait for load', async () => {
      await dashboardPage.navigate();
      await expect(dashboardPage.getAddNewDashboardBtn()).toBeVisible();
    });

    await test.step(`Assert: Dashboard "${dashboardName}" is visible`, async () => {
      // Use the newly created POM method to safely get the locator
      const targetDashboard = dashboardPage.getDashboardByName(dashboardName);
      
      // Assert visibility
      await expect(targetDashboard).toBeVisible();
    });
  });
});