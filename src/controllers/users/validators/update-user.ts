import { IsNumberString, IsOptional, IsString, Matches } from 'class-validator';
import { UserUpdate } from '../../../services/user/user-update.interface';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUser implements UserUpdate {
  @ApiModelProperty({required: false, type: 'number'})
  @IsOptional()
  @IsNumberString()
  readonly id: number;

  @ApiModelProperty({required: false})
  @IsOptional()
  @IsString()
  readonly firstname: string;

  @ApiModelProperty({required: false})
  @IsOptional()
  @IsString()
  readonly lastname: string;

  @ApiModelProperty({required: false, pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'})
  @IsOptional()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  readonly password: string;
}
