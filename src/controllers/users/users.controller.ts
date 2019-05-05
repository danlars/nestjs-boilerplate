import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaginationInterface } from '../../services/pagination/pagination.interface';
import { HasValidId } from './validators/has-valid-id';
import { UpdateUser } from './validators/update-user';
import { CreateUser } from './validators/create-user';
import { UserService } from '../../services/user/user.service';
import { UserEntity } from '../../entities/user/user.entity';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { PaginationParameters } from '../../services/pagination/pagination-parameters';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Users')
@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  public async index(@Query() params: PaginationParameters): Promise<PaginationInterface> {
    return this.userService.paginate(params);
  }

  @Get('/:userId')
  public async find(@Param() params: HasValidId): Promise<UserEntity> {
    return this.userService.get(params.userId);
  }

  @Patch('/:userId')
  public async update(@Param() params: HasValidId, @Body() userEntity: UpdateUser): Promise<UserEntity> {
    return this.userService.update(params.userId, userEntity);
  }

  @Post()
  public async create(@Body() userEntity: CreateUser): Promise<UserEntity> {
    return this.userService.create(userEntity);
  }

  @Delete('/:userId')
  public async destroy(@Param() params: HasValidId, @Res() res): Promise<DeleteResult> {
    res.status(HttpStatus.NO_CONTENT).send();
    return this.userService.destroy(params.userId);
  }
}
