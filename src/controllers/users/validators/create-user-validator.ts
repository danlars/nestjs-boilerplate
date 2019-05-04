import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { UserCreate } from '../../../services/user/user-create.interface';

export class CreateUserValidator implements UserCreate {
  @IsEmail()
  email: string;

  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  password: string;
}
