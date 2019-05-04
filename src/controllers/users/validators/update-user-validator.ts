import { IsNumberString, IsOptional, IsString, Matches } from 'class-validator';
import { UserUpdate } from '../../../services/user/user-update.interface';

export class UpdateUserValidator implements UserUpdate {
  @IsOptional()
  @IsNumberString()
  id: number;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  password: string;
}
