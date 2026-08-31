import { faker } from '@faker-js/faker';
import { User } from '../models/User';

export class UserBuilder {
  private user: User = {
    username: faker.internet.username(),
    password: 'Password123!',
    email: faker.internet.email(),
    role: 'USER',
  };

  withAdminRole(): this {
    this.user.role = 'ADMIN';
    return this;
  }

  build(): User {
    return this.user;
  }
}