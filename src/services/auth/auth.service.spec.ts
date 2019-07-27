import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../../entities/user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUserEntity } from '../../../mocks/entities/user/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserEntity,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#validateUser', () => {
    it('should return UserEntity', async () => {
      const spy = jest.spyOn(userService, 'findOneByToken').mockImplementation(() => {
        return new Promise((resolve) => resolve(new UserEntity()));
      });
      expect(await service.validateUser('1234')).toEqual(expect.any(UserEntity));
      spy.mockClear();
    });
  });

  describe('#signIn', () => {
    it('should return token', async () => {
      const user = new UserEntity();
      const spy = jest.spyOn(user, 'save').mockImplementation(() => {
        return new Promise((resolve) => resolve());
      });

      expect(await service.signIn(user)).toBeDefined();
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockClear();
    });
  });
});
