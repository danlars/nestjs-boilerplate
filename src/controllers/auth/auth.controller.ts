import { Body, Controller, Post } from '@nestjs/common';
import { AuthValidator } from './validators/auth';
import { UserService } from '../../services/user/user.service';
import { UserEntity } from '../../entities/user/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
  }

  @Post('sign-in')
  async signIn(@Body() payload: AuthValidator) {
    const user: UserEntity = await this.userService.findOneByEmail(payload.email);
    const passwordValid = bcrypt.compareSync(payload.password, user.password);
    if (passwordValid) {
      return this.authService.signIn(user);
    }
  }
}
