import * as dotenv from 'dotenv';
import { logger } from '../logger/logger';

const envName = process.env.TEST_ENV ? `.env.${process.env.TEST_ENV}` : '.env';
dotenv.config({ path: envName });

logger.info(`Loaded environment configuration from: ${envName}`);

export class EnvironmentConfig {
  public static readonly BASE_URL: string = process.env.BASE_URL || 'https://demo.reportportal.io';
  public static readonly LOG_LEVEL: string = process.env.LOG_LEVEL || 'info';
  public static readonly DEFAULT_TIMEOUT: number = process.env.DEFAULT_TIMEOUT 
    ? parseInt(process.env.DEFAULT_TIMEOUT, 10) 
    : 30000;

  public static readonly DEFAULT_USERNAME = process.env.DEFAULT_USERNAME || 'default';
  public static readonly DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD;
}