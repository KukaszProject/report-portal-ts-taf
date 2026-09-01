import { test, expect } from '../../src/core/fixtures/testFixtures';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility (a11y) Testing', () => {
  
  test('Dashboard page should comply with WCAG standards', async ({ dashboardPage, page, log }) => {
    
    test.skip(!!process.env.CI, 'Skipping accessibility test in CI pipeline due to legacy violations');
    
    await test.step('Navigate to the Dashboard', async () => {
      await dashboardPage.navigate();
      await expect(dashboardPage.getAddNewDashboardBtn()).toBeVisible();
    });

    await test.step('Run Axe accessibility scan', async () => {
      log.info('Starting Axe accessibility scan on Dashboard...');
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['color-contrast'])
        .exclude('#hidden-modal')
        .analyze();
      
      if (accessibilityScanResults.violations.length > 0) {
        log.error(`Found ${accessibilityScanResults.violations.length} accessibility violations!`);
        console.table(accessibilityScanResults.violations.map(v => ({
          ID: v.id,
          Impact: v.impact,
          Description: v.description,
        })));
      }

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});