import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from './http.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserEntity } from '../../entities/user/user.entity';
import { UnauthorizedException } from '@nestjs/common';

describe('HttpService', () => {
  let service: HttpService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        HttpService,
        {
          provide: AuthService,
          useValue: {
            validateUser: () => null,
          },
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    service = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#validate', () => {
    it('Should return user', async () => {
      const user = new UserEntity();
      const spy = jest.spyOn(authService, 'validateUser').mockImplementation(() => {
        return new Promise((resolve) => resolve(user));
      });
      expect(service.validate('')).resolves.toStrictEqual(expect.any(UserEntity));
      spy.mockClear();
    });

    it('Should throw UnauthorizedException', async () => {
      const spy = jest.spyOn(authService, 'validateUser').mockImplementation(() => {
        return new Promise((resolve) => resolve(false));
      });
      expect(service.validate('')).rejects.toThrow(UnauthorizedException);
      spy.mockClear();
    });
  });
});
