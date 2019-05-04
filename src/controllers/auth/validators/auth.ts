import { IsEmail, IsString } from 'class-validator';

export class AuthValidator {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
