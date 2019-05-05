import { Body, Controller, NotFoundException, Post, UnprocessableEntityException } from '@nestjs/common';
import { Auth } from './validators/auth';
import { UserService } from '../../services/user/user.service';
import { UserEntity } from '../../entities/user/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../services/auth/auth.service';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
  }

  @Post('sign-in')
  @ApiResponse({ status: 201, description: 'The User was validated correctly'})
  @ApiResponse({ status: 404, description: 'Email doesn\'t exist in our database'})
  @ApiResponse({ status: 422, description: 'Email and Password combination is invalid'})
  async signIn(@Body() payload: Auth) {
    const user: UserEntity = await this.userService.findOneByEmail(payload.email);
    if (!user) {
      return new NotFoundException();
    }
    const passwordValid = bcrypt.compareSync(payload.password, user.password);
    if (!passwordValid) {
      return new UnprocessableEntityException();
    }

    return this.authService.signIn(user);
  }
}
