import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';
import { PingController } from './controllers/ping/ping.controller';
import { UsersController } from './controllers/users/users.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { HttpService } from './passport/http/http.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [UserEntity],
    }),
    PassportModule.register({ session: false, defaultStrategy: 'bearer' }),
    ServicesModule,
  ],
  controllers: [PingController, UsersController, AuthController],
  providers: [HttpService],
})
export class AppModule {
}
