import { Injectable } from '@nestjs/common';
import { ServicesInterface } from '../services.interface';
import { UserEntity } from '../../entities/user/user.entity';
import { DeleteResult, FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationService } from '../pagination/pagination.service';
import { PaginationInterface } from '../pagination/pagination.interface';
import { UserCreate } from './user-create.interface';
import { UserUpdate } from './user-update.interface';
import { IPaginationParameters } from '../pagination/pagination-parameters.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService implements ServicesInterface {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
  ) {
  }

  async getAll(options: FindManyOptions): Promise<UserEntity[]> {
    return this.userRepo.find(options);
  }

  async get(id: number): Promise<UserEntity> {
    return this.userRepo.findOne(id);
  }

  async create(userCreate: UserCreate): Promise<UserEntity> {
    const user = this.userRepo.create(userCreate);
    return user.save();
  }

  async update(id: number, userUpdate: UserUpdate): Promise<UserEntity> {
    const user = await this.userRepo.findOne(id);
    user.firstname = userUpdate.firstname;
    user.lastname = userUpdate.lastname;
    if (userUpdate.password) {
      user.password = userUpdate.password;
    }
    return user.save();
  }

  async destroy(id: number): Promise<DeleteResult> {
    return this.userRepo.delete(id);
  }

  async paginate(options: IPaginationParameters): Promise<PaginationInterface> {
    const query = this.userRepo.createQueryBuilder();
    if (options.search.length > 1) {
      const search = `%${options.search.toLowerCase()}%`;
      query.where(`LOWER(firstname) LIKE :search`, { search });
      query.orWhere(`LOWER(lastname) LIKE :search`, { search });
      query.orWhere(`LOWER(email) LIKE :search`, { search });
    }

    return await PaginationService.paginate(query, options);
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findOne({
      select: ['firstname', 'lastname', 'id', 'email', 'password', 'updated_at', 'created_at'],
      where: { email },
    });
  }

  async findOneByToken(token: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { rememberToken: token } });
  }
}
