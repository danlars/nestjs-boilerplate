// import { Test, TestingModule } from '@nestjs/testing';
// import { HttpService } from './http.service';
// import { AuthService } from '../../services/auth/auth.service';
// import { UserService } from '../../services/user/user.service';
// import { UserEntity } from '../../entities/user/user.entity';
// import { UnauthorizedException } from '@nestjs/common';
//
// describe('HttpService', () => {
//   let service: HttpService;
//   let authService: AuthService;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UserService, AuthService, HttpService],
//     }).compile();
//
//     service = module.get<HttpService>(HttpService);
//     authService = module.get<AuthService>(AuthService);
//   });
//
//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
//
//   it('should return user from validate method', async () => {
//     const user = new UserEntity();
//     const spy = jest.spyOn(authService, 'validateUser').mockImplementation(() => {
//       return new Promise((resolve) => resolve(user));
//     });
//     expect(service.validate('')).resolves.toStrictEqual(expect.any(UserEntity));
//     spy.mockClear();
//   });
//
//   it('should throw UnauthorizedException from validate method', async () => {
//     const spy = jest.spyOn(authService, 'validateUser').mockImplementation(() => {
//       return new Promise((resolve) => resolve(false));
//     });
//     expect(service.validate('')).rejects.toThrow(UnauthorizedException);
//     spy.mockClear();
//   });
// });
