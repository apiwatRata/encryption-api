import { MaxLength, MinLength, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class EncryptDataDto {
  @Transform(({ value }) => String(value))
  @IsString()
  @MinLength(0)
  @MaxLength(2000)
  @ApiProperty({ example: 'encryption data' })
  payload: string;
}