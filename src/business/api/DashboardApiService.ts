import { APIRequestContext, expect } from '@playwright/test';
import { EnvironmentConfig } from '../../core/config/EnvironmentConfig';
import {
  CreateDashboardRequest,
  DashboardDetails,
  DashboardResponse,
} from '../models/DashboardDTO';
import { logger } from '../../core/logger/logger';

export class DashboardApiService {
  private readonly baseUrl = `${EnvironmentConfig.BASE_URL}/api/v1/${EnvironmentConfig.PROJECT_NAME}`;

  private readonly headers = {
    Authorization: `Bearer ${EnvironmentConfig.API_KEY}`,
    'Content-Type': 'application/json',
  };

  constructor(private request: APIRequestContext) {}

  async getDashboard(dashboardId: number): Promise<DashboardDetails> {
    logger.info(`API: Fetching dashboard with ID: ${dashboardId}`);
    const response = await this.request.get(`${this.baseUrl}/dashboard/${dashboardId}`, {
      headers: this.headers,
    });

    expect(response.status()).toBe(200);

    return await response.json();
  }

  async createDashboard(payload: CreateDashboardRequest): Promise<number> {
    logger.info(`API: Creating dashboard with name: ${payload.name}`);

    const response = await this.request.post(`${this.baseUrl}/dashboard`, {
      headers: this.headers,
      data: payload,
    });

    expect(response.ok(), `Failed to create dashboard. Status: ${response.status()}`).toBeTruthy();

    const responseBody: DashboardResponse = await response.json();
    logger.info(`API: Successfully created dashboard with ID: ${responseBody.id}`);

    return responseBody.id;
  }

  async deleteDashboard(dashboardId: number): Promise<void> {
    logger.info(`API: Deleting dashboard with ID: ${dashboardId}`);

    const response = await this.request.delete(`${this.baseUrl}/dashboard/${dashboardId}`, {
      headers: this.headers,
    });

    expect(response.ok(), `Failed to delete dashboard. Status: ${response.status()}`).toBeTruthy();
    logger.info(`API: Successfully deleted dashboard with ID: ${dashboardId}`);
  }
}
