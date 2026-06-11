import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('encryptData', () => {
    it('should return the encrypted data', () => {
      const result = service.encryptData(expectDecryptData.payload);
      expect(service.decryptData(result)).toEqual(expectDecryptData.payload);
    });
  });
  describe('decryptData', () => {
    it('should return the decrypted data', () => {
      expect(service.decryptData(expectEncryptData)).toBe(
        expectDecryptData.payload,
      );
    });
  });
});
