// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { ServicesModule } from '../../services/services.module';
// import { PaginationInterface } from '../../services/pagination/pagination.interface';
// import { UserEntity } from '../../entities/user/user.entity';
// import { UpdateUser } from './validators/update-user';
// import { CreateUser } from './validators/create-user';
// import { AppModule } from '../../app.module';
//
// describe('Users Controller', () => {
//   const userEntity: UserEntity = new UserEntity();
//   let controller: UsersController;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [ServicesModule],
//       controllers: [UsersController],
//       providers: [],
//     }).compile();
//
//     controller = module.get<UsersController>(UsersController);
//     userEntity.firstname = 'Dan';
//   });
//
//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
//
//   // it('should return pagination object from index', async () => {
//   //   // const q: SelectQueryBuilder<UserEntity> = SelectQueryBuilder;
//   //   // jest.spyOn(UserEntity, 'createQueryBuilder').mockImplementation(() => {
//   //   //   return q;
//   //   // });
//   //   const result = await controller.index(new PaginationParameters());
//   //   expect(result).toBe(paginationValue);
//   // });
//
//   // it('should return UserEntity from find', () => {
//   //   const spy = jest.spyOn(UserEntity, 'findOne').mockImplementation(() => {
//   //     return new Promise((resolve) => resolve(userEntity));
//   //   });
//   //   controller.find({ userId: 1 }).then((res) => {
//   //     expect(spy).toBeCalledWith(1);
//   //     expect(res).toMatchObject(userEntity);
//   //   }, (res) => console.log(res, 'Error on find User')).finally(() => spy.mockClear());
//   // });
//   //
//   // it('should return UserEntity from update', async () => {
//   //   const findOneSpy = jest.spyOn(UserEntity, 'findOne').mockImplementation(() => {
//   //     return new Promise((resolve) => resolve(userEntity));
//   //   });
//   //   const saveSpy = jest.spyOn(userEntity, 'save').mockImplementation(() => {
//   //     return new Promise((resolve) => resolve(userEntity));
//   //   });
//   //
//   //   const result = await controller.update({ userId: 1 }, new UpdateUser());
//   //   expect(findOneSpy).toBeCalledWith(1);
//   //   expect(saveSpy).toHaveBeenCalled();
//   //   expect(result).toMatchObject(userEntity);
//   //   findOneSpy.mockClear();
//   //   saveSpy.mockClear();
//   // });
//   //
//   // it('should return UserEntity from create', async () => {
//   //   const createSpy = jest.spyOn(UserEntity, 'create').mockImplementation(() => userEntity);
//   //   const saveSpy = jest.spyOn(userEntity, 'save').mockImplementation(() => {
//   //     return new Promise((resolve) => resolve(userEntity));
//   //   });
//   //   const result = await controller.create(new CreateUser());
//   //   expect(saveSpy).toHaveBeenCalled();
//   //   expect(result).toMatchObject(userEntity);
//   //   createSpy.mockClear();
//   //   saveSpy.mockClear();
//   // });
//   //
//   // it('should call destroy function from UserService ', async () => {
//   //   const spy = jest.spyOn(UserEntity, 'delete').mockImplementation(() => {
//   //     return new Promise((resolve) => resolve({ affected: 1, raw: '' }));
//   //   });
//   //   const response = {
//   //     status: () => {
//   //       return {
//   //         send: () => {
//   //           return;
//   //         },
//   //       };
//   //     },
//   //   };
//   //   await controller.destroy({ userId: 1 }, response);
//   //   expect(spy).toBeCalledWith(1);
//   //   spy.mockClear();
//   // });
// });
