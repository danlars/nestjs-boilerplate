import { Injectable } from '@nestjs/common';
import { ServicesInterface } from '../services.interface';
import { UserEntity } from '../../entities/user/user.entity';
import { DeleteResult, FindManyOptions, SelectQueryBuilder } from 'typeorm';
import { PaginationService } from '../pagination/pagination.service';
import { PaginationInterface } from '../pagination/pagination.interface';
import { UserCreate } from './user-create.interface';
import { UserUpdate } from './user-update.interface';
import { IPaginationParameters } from '../pagination/pagination-parameters.interface';

@Injectable()
export class UserService implements ServicesInterface {
  async getAll(options: FindManyOptions): Promise<UserEntity[]> {
    return UserEntity.find(options);
  }

  async get(id: number): Promise<UserEntity> {
    return UserEntity.findOne(id);
  }

  async create(userCreate: UserCreate): Promise<UserEntity> {
    const user = new UserEntity();
    user.firstname = userCreate.firstname;
    user.lastname = userCreate.lastname;
    user.email = userCreate.email;
    user.password = userCreate.password;
    return user.save();
  }

  async update(id: number, userUpdate: UserUpdate): Promise<UserEntity> {
    const user = await UserEntity.findOne(id);
    user.firstname = userUpdate.firstname;
    user.lastname = userUpdate.lastname;
    if (userUpdate.password) {
      user.password = userUpdate.password;
    }
    return user.save();
  }

  async destroy(id: number): Promise<DeleteResult> {
    return UserEntity.delete(id);
  }

  async paginate(options: IPaginationParameters): Promise<PaginationInterface> {
    const query = UserEntity.createQueryBuilder();
    if (options.search.length > 1) {
      const search = `%${options.search.toLowerCase()}%`;
      query.where((subQ: SelectQueryBuilder<UserEntity>) => {
        subQ.where(`LOWER(firstname) LIKE :search`, {search});
        subQ.orWhere(`LOWER(lastname) LIKE :search`, {search});
        subQ.orWhere(`LOWER(email) LIKE :search`, {search});
      });
    }

    return PaginationService.paginate(query, options);
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
      return UserEntity.findOne({
        select: ['firstname', 'lastname', 'id', 'email', 'password', 'updated_at', 'created_at'],
        where: { email },
      });
    }

    async findOneByToken(token: string): Promise<UserEntity> {
      return await UserEntity.findOne({ where: { rememberToken: token } });
    }
  }
