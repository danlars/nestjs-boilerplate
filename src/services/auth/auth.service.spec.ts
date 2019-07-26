// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from './auth.service';
// import { UserService } from '../user/user.service';
// import { UserEntity } from '../../entities/user/user.entity';
//
// describe('AuthService', () => {
//   let service: AuthService;
//   let userService: UserService;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UserService, AuthService],
//     }).compile();
//
//     service = module.get<AuthService>(AuthService);
//     userService = module.get<UserService>(UserService);
//   });
//
//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
//
//   it('should return UserEntity from the validateUser method', async () => {
//     const spy = jest.spyOn(userService, 'findOneByToken').mockImplementation(() => {
//       return new Promise((resolve) => resolve(new UserEntity()));
//     });
//     expect(await service.validateUser('1234')).toEqual(expect.any(UserEntity));
//     spy.mockClear();
//   });
//
//   it('should return token from the signIn method', async () => {
//     const user = new UserEntity();
//     const spy = jest.spyOn(user, 'save').mockImplementation(() => {
//       return new Promise((resolve) => resolve());
//     });
//
//     expect(await service.signIn(user)).toBeDefined();
//     spy.mockClear();
//   });
// });
