import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecryptDataDto } from './dto/decrypt-data.dto';
describe('AppController', () => {
  let appController: AppController;
  let service: AppService;
  const expectDecryptData = {
    payload: 'Test encryption',
  };

  const expectEncryptData = {
    data1:
      'IA2U/wSBX2RCHAtCI/DAJCGFVnvYiZBLmK2jHZ8RUp0CFlfw3bnASDV/UJ1G8/ycy41uAeACet+Cw2CJ25nq0N+x0S2HtgmtWmWkGx2k0GZKQgKNbAl8gCavjQcm8M956I3r9ebw53jmkd5fN6xNL+0FvBNOjrFv6PYvXAczorM=',
    data2:
      'd64a40594e10a738ed9e3829b718961d:ebc79ed7e080296e0997011ac1d499:5c07ca3e7a78568e57c17621f5018c7f',
  };

  const expectedResponse = {
    successful: true,
    error_code: '',
    data: expectDecryptData,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    service = app.get<AppService>(AppService);
  });

  describe('App Controller exist', () => {
    it('Defined Controller', () => {
      expect(appController).toBeDefined();
    });
  });
  describe('encryptData', () => {
    it('should return the encrypted data', () => {
      const result = appController.encryptionData(expectDecryptData);
      if (result.data instanceof DecryptDataDto) {
        expect(service.decryptData(result.data)).toEqual(
          expectDecryptData.payload,
        );
      }
    });
  });

  describe('decryptData', () => {
    it('should return the decrypted data', () => {
      expect(appController.decryptionData(expectEncryptData)).toEqual(
        expectedResponse,
      );
    });
  });
});
