import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { HttpService } from './strategy/http/http.service';

@Module({
  imports: [
    PassportModule.register({ session: false, defaultStrategy: 'bearer' }),
  ],
  providers: [UserService, AuthService, HttpService],
  exports: [UserService, AuthService],
})
export class ServicesModule {
}
