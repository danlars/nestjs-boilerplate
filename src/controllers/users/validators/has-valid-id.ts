import { IsNumberString } from 'class-validator';

export class HasValidId {
  @IsNumberString()
  userId: number;
}
