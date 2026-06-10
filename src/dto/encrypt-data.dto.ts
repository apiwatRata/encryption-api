import { MaxLength, MinLength, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class EncryptDataDto {
  @Type(() => String)
  @IsString()
  @MinLength(0)
  @MaxLength(2000)
  payload: string;
}