import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AppService } from './app.service';
import { EncryptDataDto } from './dto/encrypt-data.dto';
import { DecryptDataDto } from './dto/decrypt-data.dto';
import { ResponseDto } from './dto/response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/get-encrypt-data')
  encryptionData(@Body() body: EncryptDataDto): ResponseDto {
    try {
      return plainToInstance(ResponseDto, {
        successful: true,
        error_code: '',
        data: this.appService.encryptData(body.payload),
      });
    } catch (err) {
      console.error(err);
      return plainToInstance(ResponseDto, {
        successful: false,
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  }

  @Post('/get-decrypt-data')
  decryptionData(@Body() body: DecryptDataDto): ResponseDto {
    try {
      const payload = this.appService.decryptData(body);
      return plainToInstance(ResponseDto, {
        successful: true,
        error_code: '',
        data: {
          payload,
        },
      });
    } catch (err) {
      console.error(err);
      return plainToInstance(ResponseDto, {
        successful: false,
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  }
}
