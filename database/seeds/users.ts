import * as faker from 'faker';
import { QueryRunner } from 'typeorm';
import { UserEntity } from '../../src/entities/user/user.entity';

module.exports = class Users {
  static async seed(query: QueryRunner) {
    const users = [];
    for (let i = 0; i < 200; i++) {
      const user = new UserEntity();
      user.firstname = faker.name.firstName();
      user.lastname = faker.name.lastName();
      user.email = faker.internet.email(user.firstname, user.lastname);
      user.password = 'velkommen';
      users.push(user);
    }

    await query.manager.save(users, {chunk: 500});
  }
};
