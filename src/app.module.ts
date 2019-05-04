import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';
import { EntitiesModule } from './entities/entities.module';
import { PingController } from './controllers/ping/ping.controller';
import { UsersController } from './controllers/users/users.controller';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  imports: [
    ServicesModule,
    EntitiesModule,
  ],
  controllers: [PingController, UsersController, AuthController],
  providers: [],
})
export class AppModule {
}
