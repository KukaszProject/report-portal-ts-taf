import { faker } from '@faker-js/faker';
import { User } from '../models/User';
import { EnvironmentConfig } from '../../core/config/EnvironmentConfig';

export class UserBuilder {
  private user: User = {
    username: faker.internet.username(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    role: 'USER',
  };

  /**
   * Configures the user as the system Administrator, pulling 
   * secure credentials from the current environment variables.
   */
  asDefault(): this {
    this.user.username = EnvironmentConfig.DEFAULT_USERNAME;
    this.user.password = EnvironmentConfig.DEFAULT_PASSWORD;
    this.user.role = 'ADMIN';
    this.user.email = 'admin@reportportal.io'; // Assuming static admin email
    return this;
  }

  /**
   * Allows overriding specific fields if needed for negative tests
   * (e.g., passing a wrong password)
   */
  withPassword(password: string): this {
    this.user.password = password;
    return this;
  }

  build(): User {
    return this.user;
  }
}