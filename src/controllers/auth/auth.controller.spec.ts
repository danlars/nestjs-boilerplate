import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Auth } from './validators/auth';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../entities/user/user.entity';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUserEntity } from '../../../mocks/entities/user/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UserService;
  const auth: Auth = { email: 'email@test.com', password: 'Passw0rd!' };
  const user: UserEntity = new UserEntity();
  user.password = auth.password;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UserService,
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserEntity,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#signIn', () => {
    it('Should return NotFoundException', async () => {
      const spy = jest.spyOn(userService, 'findOneByEmail').mockImplementation(() => {
        return new Promise((resolve) => resolve(null));
      });

      expect(await controller.signIn(auth)).toEqual(expect.any(NotFoundException));
      spy.mockClear();
    });

    it('should return UnprocessableEntityException', async () => {
      const spy = jest.spyOn(userService, 'findOneByEmail').mockImplementation(() => {
        return new Promise((resolve) => resolve(user));
      });

      expect(await controller.signIn(auth)).toEqual(expect.any(UnprocessableEntityException));
      spy.mockClear();
    });

    it('should return rememberToken from UserEntity', async () => {
      const token = '12345';
      user.password = bcrypt.hashSync(auth.password, 10);
      const userSpy = jest.spyOn(userService, 'findOneByEmail').mockImplementation(() => {
        return new Promise((resolve) => resolve(user));
      });
      const authSpy = jest.spyOn(authService, 'signIn').mockImplementation(() => {
        return new Promise((resolve) => resolve(token));
      });

      expect(await controller.signIn(auth)).toBe(token);
      userSpy.mockClear();
      authSpy.mockClear();
    });
  });
});
