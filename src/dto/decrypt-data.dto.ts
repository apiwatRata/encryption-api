import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecryptDataDto {
  @IsString()
  @ApiProperty({ example: 'data1 from encrypt api.' })
  data1: string;
  @IsString()
  @ApiProperty({ example: 'data2 from encrypt api.' })
  data2: string;
}