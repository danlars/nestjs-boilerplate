import { IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class HasValidId {

  @ApiModelProperty()
  @IsNumberString()
  readonly userId: number;
}
