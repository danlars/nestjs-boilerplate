import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
// tslint:disable-next-line:no-var-requires
const  request = require('supertest');

describe('PingController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/ping (GET)', () => {
    // return request(app.getHttpServer())
    //   .get('/ping')
    //   .expect(200);
  });
});
