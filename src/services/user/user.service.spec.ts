import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from '../../entities/user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUserEntity } from '../../../mocks/entities/user/user.entity';
import { PaginationService } from '../pagination/pagination.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserEntity,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getAll', () => {
    it('should return a collection', async () => {
      expect(await service.getAll({})).toStrictEqual([]);
    });
  });

  describe('#get', () => {
    it('should return a object', async () => {
      expect(await service.get(1)).toMatchObject({});
    });
  });

  describe('#create', () => {
    it('should return a object', async () => {
      const user = {
        firstname: 'Dan',
        password: 'test',
        email: 'dan@test.com',
      };
      expect(await service.create(user)).toMatchObject(user);
    });
  });

  describe('#update', () => {
    it('should return a object without password', async () => {
      const user = {
        firstname: 'Dan',
      };
      expect(await service.update(1, user)).toMatchObject(user);
    });

    it('should return a object with password', async () => {
      const user = {
        firstname: 'Dan',
        password: 'test',
      };
      expect(await service.update(1, user)).toMatchObject(user);
    });
  });

  describe('#destroy', () => {
    it('should return DeleteResult', async () => {
      expect(await service.destroy(1)).toBeDefined();
    });
  });

  describe('#paginate', () => {
    const paginationResult = {
      current_page: 1,
      last_page: 1,
      page_size: 10,
      total: 0,
      data: [],
    };
    let paginateSpy;

    beforeEach(() => {
      paginateSpy = jest.spyOn(PaginationService, 'paginate').mockImplementation(() => {
        return new Promise((resolve) => resolve(paginationResult));
      });
    });

    it('should return PaginationResult, without using search', async () => {
      const paginate = await service.paginate({ page: 1, page_size: 10, search: '' });
      expect(paginate).toStrictEqual(paginationResult);
    });

    it('should return PaginationResult, using search', async () => {
      const paginate = await service.paginate({ page: 1, page_size: 10, search: 'test' });
      expect(paginate).toStrictEqual(paginationResult);
    });
  });

  describe('#findOneByEmail', () => {
    it('should return object', async () => {
      expect(await service.findOneByEmail('test@email.com')).toMatchObject({});
    });
  });

  describe('#findOneByToken', () => {
    it('should return object', async () => {
      expect(await service.findOneByToken('token')).toMatchObject({});
    });
  });
});
