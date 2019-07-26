// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
// import { Auth } from './validators/auth';
// import { AuthService } from '../../services/auth/auth.service';
// import { UserService } from '../../services/user/user.service';
// import * as bcrypt from 'bcrypt';
// import { UserEntity } from '../../entities/user/user.entity';
// import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
//
// describe('AuthController', () => {
//   let controller: AuthController;
//   let service: AuthService;
//   let userService: UserService;
//   const auth: Auth = { email: 'email@test.com', password: 'Passw0rd!' };
//   const user: UserEntity = new UserEntity();
//   user.password = auth.password;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [UserService, AuthService],
//     }).compile();
//
//     controller = module.get<AuthController>(AuthController);
//     service = module.get<AuthService>(AuthService);
//     userService = module.get<UserService>(UserService);
//   });
//
//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
//
//   it('should return NotFoundException', async () => {
//     const spy = jest.spyOn(userService, 'findOneByEmail').mockImplementation(() => {
//       return new Promise((resolve) => resolve(null));
//     });
//
//     expect(await controller.signIn(auth)).toEqual(expect.any(NotFoundException));
//     spy.mockClear();
//   });
//
//   it('should return UnprocessableEntityException', async () => {
//     const spy = jest.spyOn(userService, 'findOneByEmail').mockImplementation(() => {
//       return new Promise((resolve) => resolve(user));
//     });
//
//     expect(await controller.signIn(auth)).toEqual(expect.any(UnprocessableEntityException));
//     spy.mockClear();
//   });
//
//   it('should return rememberToken from user Model', async () => {
//     const token = '12345';
//     user.password = bcrypt.hashSync(auth.password, 10);
//     const userSpy = jest.spyOn(userService, 'findOneByEmail').mockImplementation(() => {
//       return new Promise((resolve) => resolve(user));
//     });
//     const authSpy = jest.spyOn(service, 'signIn').mockImplementation(() => {
//       return new Promise((resolve) => resolve(token));
//     });
//
//     expect(await controller.signIn(auth)).toBe(token);
//     userSpy.mockClear();
//     authSpy.mockClear();
//   });
// });
