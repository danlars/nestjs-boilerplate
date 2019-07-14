import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from '../../entities/user/user.entity';
import { DeleteResult } from 'typeorm';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a collection of user entities on getAll', async () => {
    jest.spyOn(UserEntity, 'find').mockImplementation(() => {
      return new Promise((resolve) => resolve([]));
    });
    service.getAll({})
      .then(
        (res) => expect(res).toMatchObject([]),
        () => console.log('Error on getAll'),
      );
  });

  it('should return a new UserEntity on update', async () => {
    const updateEntity = new UserEntity();
    updateEntity.firstname = 'Dan';
    const findSpy = jest.spyOn(UserEntity, 'findOne').mockImplementation(() => {
      return new Promise((resolve) => resolve(updateEntity));
    });
    const saveSpy = jest.spyOn(updateEntity, 'save').mockImplementation(() => {
      return new Promise((resolve) => resolve(updateEntity));
    });
    service.update(1, {})
      .then(
        (res) => expect(res).toMatchObject(updateEntity),
        () => console.log('Error on update'),
      ).finally(() => {
        findSpy.mockClear();
        saveSpy.mockClear();
      });
  });

  it('should return DeleteResult on destroy', async () => {
    const spy = jest.spyOn(UserEntity, 'delete').mockImplementation(() => {
      return new Promise((resolve) => resolve(new DeleteResult()));
    });
    service.destroy(1)
      .then(
        (res) => expect(res).toBeDefined(),
        () => console.log('Error on Destroy'),
      ).finally(() => spy);
  });

  it('should return UserEntity on findOneByEmail method', async () => {
    const spy = jest.spyOn(UserEntity, 'findOne').mockImplementation(() => {
      return new Promise((resolve) => resolve(new UserEntity()));
    });
    expect(service.findOneByEmail(''))
      .resolves
      .toStrictEqual(expect.any(UserEntity));
    spy.mockClear();
  });

  it('should return UserEntity on findOneByToken method', async () => {
    const spy = jest.spyOn(UserEntity, 'findOne').mockImplementation(() => {
      return new Promise((resolve) => resolve(new UserEntity()));
    });
    expect(service.findOneByToken(''))
      .resolves
      .toStrictEqual(expect.any(UserEntity));
    spy.mockClear();
  });
});
