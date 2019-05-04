import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('ping')
export class PingController {
  @Get()
  @HttpCode(204)
  // tslint:disable-next-line
  public index(): void { }
}
