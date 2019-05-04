import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { PaginationInterface } from '../../services/pagination/pagination.interface';
import { HasValidId } from './validators/has-valid-id';
import { UpdateUserValidator } from './validators/update-user-validator';
import { CreateUserValidator } from './validators/create-user-validator';
import { UserService } from '../../services/user/user.service';
import { UserEntity } from '../../entities/user/user.entity';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { QueryParameters } from '../../services/pagination/query-parameters.interface';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Get()
  public async index(@Query() params: QueryParameters): Promise<PaginationInterface> {
    return this.userService.paginate(params);
  }

  @Get('/:userId')
  public async find(@Param() params: HasValidId): Promise<UserEntity> {
    return this.userService.get(params.userId);
  }

  @Patch('/:userId')
  public async update(@Param() params: HasValidId, @Body() userEntity: UpdateUserValidator): Promise<UserEntity> {
    return this.userService.update(params.userId, userEntity);
  }

  @Post()
  public async create(@Body() userEntity: CreateUserValidator): Promise<UserEntity> {
    return this.userService.create(userEntity);
  }

  @Delete('/:userId')
  public async destroy(@Param() params: HasValidId, @Res() res): Promise<DeleteResult> {
    res.status(HttpStatus.NO_CONTENT).send();
    return this.userService.destroy(params.userId);
  }
}
