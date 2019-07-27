import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserEntity } from '../../entities/user/user.entity';
import { UpdateUser } from './validators/update-user';
import { CreateUser } from './validators/create-user';
import { UserService } from '../../services/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUserEntity } from '../../../mocks/entities/user/user.entity';
import { PassportModule } from '@nestjs/passport';
import { PaginationParameters } from '../../services/pagination/pagination-parameters';
import { DeleteResult } from 'typeorm';

describe('Users Controller', () => {
  const userEntity: UserEntity = new UserEntity();
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'bearer' }),
      ],
      controllers: [UsersController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserEntity,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#index', () => {
    it('Should return PaginationInterface', async () => {
      expect(await controller.index(new PaginationParameters())).toStrictEqual({
        page_size: 10,
        current_page: 1,
        data: [],
        last_page: 1,
        total: 0,
      });
    });
  });

  describe('#find', () => {
    it('Should return UserEntity', async () => {
      expect(await controller.find({ userId: 1 })).toMatchObject(userEntity);
    });
  });

  describe('#update', () => {
    it('Should return UserEntity', async () => {
      const result = await controller.update({ userId: 1 }, new UpdateUser());
      expect(result).toMatchObject(userEntity);
    });
  });

  describe('#create', () => {
    it('Should return UserEntity', async () => {
      const result = await controller.create(new CreateUser());
      expect(result).toMatchObject(userEntity);
    });
  });

  describe('#destroy', () => {
    it('should call destroy function from UserService ', async () => {
      const response = {
        status: () => {
          return {
            send: () => {
              return;
            },
          };
        },
      };
      expect(await controller.destroy({ userId: 1 }, response)).toStrictEqual(new DeleteResult());
    });
  });
});
