import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { HttpService } from './strategy/http/http.service';
const passportModule = PassportModule.register({ session: false, defaultStrategy: 'bearer' });

@Module({
  imports: [
    passportModule,
  ],
  providers: [UserService, AuthService, HttpService],
  exports: [UserService, AuthService, passportModule],
})
export class ServicesModule {
}
