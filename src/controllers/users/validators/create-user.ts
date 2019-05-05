import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { UserCreate } from '../../../services/user/user-create.interface';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUser implements UserCreate {
  @ApiModelProperty({required: true})
  @IsEmail()
  readonly email: string;

  @ApiModelProperty({required: true})
  @IsString()
  readonly firstname: string;

  @ApiModelProperty({required: false})
  @IsOptional()
  @IsString()
  readonly lastname: string;

  @ApiModelProperty({required: true, pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'})
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  readonly password: string;
}
