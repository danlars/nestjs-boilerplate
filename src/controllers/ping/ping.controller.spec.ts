import { Test, TestingModule } from '@nestjs/testing';
import { PingController } from './ping.controller';

describe('Ping Controller', () => {
  let controller: PingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PingController],
    }).compile();

    controller = module.get<PingController>(PingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return void when index is called', () => {
    expect(controller.index()).toBeUndefined();
  });
});
