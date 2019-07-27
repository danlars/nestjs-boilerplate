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
      expect(await service.validate('')).toStrictEqual(expect.any(UserEntity));
      expect(spy).toHaveBeenCalledWith('');
      spy.mockClear();
    });

    it('Should throw UnauthorizedException', async () => {
      expect(service.validate('')).rejects.toThrow(UnauthorizedException);
    });
  });
});
