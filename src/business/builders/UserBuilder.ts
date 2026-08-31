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
   * Configures the user as default user, pulling 
   * secure credentials from the current environment variables.
   */
  asDefault(): this {
    this.user.username = EnvironmentConfig.DEFAULT_USERNAME;
    this.user.password = EnvironmentConfig.DEFAULT_PASSWORD;
    this.user.role = 'USER';
    this.user.email = 'user@reportportal.io';
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