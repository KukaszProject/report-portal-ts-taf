import * as dotenv from 'dotenv';
import { logger } from '../logger/logger';

const envName = process.env.TEST_ENV ? `.env.${process.env.TEST_ENV}` : '.env';
dotenv.config({ path: envName });

logger.info(`Loaded environment configuration from: ${envName}`);

export class EnvironmentConfig {
  /** 
   * The base URL for the application under test. 
   * Falls back to the Demo environment if not provided in the .env file.
   */
  public static readonly BASE_URL: string = process.env.BASE_URL || 'https://demo.reportportal.io';
  
  public static readonly LOG_LEVEL: string = process.env.LOG_LEVEL || 'info';
  
  public static readonly DEFAULT_TIMEOUT: number = process.env.DEFAULT_TIMEOUT 
    ? parseInt(process.env.DEFAULT_TIMEOUT, 10) 
    : 30000;
}