import { DecryptDataDto } from './decrypt-data.dto';
import { EncryptDataDto } from './encrypt-data.dto';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({ example: true, description: 'Is process success.' })
  successful: boolean;
  @ApiProperty({ example: '', description: 'Error status code.' })
  error_code: string;
  @ApiProperty({
    description: 'Response data',
    oneOf: [
      { $ref: getSchemaPath(DecryptDataDto) },
      { $ref: getSchemaPath(EncryptDataDto) },
      { type: 'null' },
    ],
  })
  data: null | DecryptDataDto | EncryptDataDto;
}