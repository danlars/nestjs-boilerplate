import { Injectable } from '@nestjs/common';
import {UserService} from '../user/user.service';
import { UserEntity } from '../../entities/user/user.entity';
// tslint:disable-next-line:no-var-requires
const cryptoRandomString = require('crypto-random-string');

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(token: string): Promise<any> {
    // Validate if token passed along with HTTP request
    // is associated with any registered account in the database
    return await this.usersService.findOneByToken(token);
  }

  async signIn(user: UserEntity): Promise<string> {
    const copiedUser: UserEntity = user;
    copiedUser.rememberToken = cryptoRandomString({length: 100});
    delete copiedUser.password;
    await copiedUser.save();
    return copiedUser.rememberToken;
  }
}
