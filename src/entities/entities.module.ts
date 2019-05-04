import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [],
  imports: [
    TypeOrmModule.forRoot(),
  ],
  exports: [],
})
export class EntitiesModule {
}
