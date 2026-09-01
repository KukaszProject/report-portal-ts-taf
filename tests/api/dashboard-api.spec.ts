import { test, expect } from '../../src/core/fixtures/testFixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Dashboard API Endpoint Tests', () => {
  let createdDashboardId: number;
  const apiDashName = `API_Only_${Date.now()}`;
  const apiDashDesc = 'Created entirely via API layer';

  test.afterEach(async ({ dashboardApiService, log }) => {
    if (createdDashboardId) {
      await dashboardApiService.deleteDashboard(createdDashboardId);
      log.info(`API Teardown complete for ID: ${createdDashboardId}`);
    }
  });

  test('Should perform full CRUD lifecycle for a Dashboard', async ({ dashboardApiService }) => {
    await test.step('POST /dashboard - Create a new dashboard', async () => {
      createdDashboardId = await dashboardApiService.createDashboard({
        name: apiDashName,
        description: apiDashDesc,
        share: false,
      });

      expect(createdDashboardId).toBeDefined();
      expect(typeof createdDashboardId).toBe('number');
    });

    await test.step('GET /dashboard/{id} - Retrieve and validate schema', async () => {
      const dashboardDetails = await dashboardApiService.getDashboard(createdDashboardId);

      expect(dashboardDetails.id).toEqual(createdDashboardId);
      expect(dashboardDetails.name).toEqual(apiDashName);
      expect(dashboardDetails.description).toEqual(apiDashDesc);

      expect(dashboardDetails.owner).toBeDefined();
    });
  });
});
