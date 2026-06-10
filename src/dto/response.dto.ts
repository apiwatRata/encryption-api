import { DecryptDataDto } from './decrypt-data.dto';
import { EncryptDataDto } from './encrypt-data.dto';

export class ResponseDto {
  successful: boolean;
  error_code: string;
  data: null | DecryptDataDto | EncryptDataDto;
}