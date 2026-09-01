import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../core/base/BasePage';
import { logger } from '../../core/logger/logger';

export class DashboardPage extends BasePage {
  private readonly addNewDashboardBtn: Locator;
  private readonly pageTitle: Locator;
  private readonly dashboardGrid: Locator;
  private readonly userAvatar: Locator;
  private readonly addDashboardModalTitle: Locator;

  constructor(page: Page) {
    super(page, '/ui/#default_personal/dashboard');

    this.addNewDashboardBtn = page.locator('button:not([disabled])', {
      hasText: 'Add New Dashboard',
    });
    this.pageTitle = page.getByRole('heading', { name: /dashboards/i });
    this.dashboardGrid = page.locator('.grid-container, [class*="gridRow"]');
    this.userAvatar = page.getByRole('img', { name: 'avatar' });
    this.addDashboardModalTitle = page.locator('#modal-root').getByText('Add New Dashboard');
  }

  async clickAddNewDashboard(): Promise<void> {
    logger.info('Clicking "Add New Dashboard" button');
    await this.addNewDashboardBtn.click();
  }

  async isDashboardEmpty(): Promise<boolean> {
    const emptyStateText = this.page.getByText(/no dashboards found/i, { exact: false });
    return await emptyStateText.isVisible();
  }

  getAddNewDashboardBtn(): Locator {
    return this.addNewDashboardBtn;
  }

  getPageTitle(): Locator {
    return this.pageTitle;
  }

  getUserAvatar(): Locator {
    return this.userAvatar;
  }

  getAddDashboardModalTitle(): Locator {
    return this.addDashboardModalTitle;
  }

  getDashboardByName(dashboardName: string): Locator {
    return this.dashboardGrid.getByText(dashboardName, { exact: true });
  }
}
