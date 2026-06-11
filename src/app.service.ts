import { Injectable } from '@nestjs/common';
import { DecryptDataDto } from './dto/decrypt-data.dto';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  privateEncrypt,
  publicDecrypt,
} from 'crypto';
import * as fs from 'fs';

@Injectable()
export class AppService {
  private privateKey = fs.readFileSync('./src/configs/private.key', 'utf-8');
  private publicKey = fs.readFileSync('./src/configs/public.key', 'utf-8');

  private encrypt(payload: string): DecryptDataDto {
    const key = randomBytes(32);
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(payload, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    const data1 = privateEncrypt(this.privateKey, key).toString('base64');
    return {
      data1,
      data2:
        iv.toString('hex') + ':' + encrypted + ':' + authTag.toString('hex'),
    };
  }

  private decrypt(data: DecryptDataDto): string {
    const key = publicDecrypt(
      this.publicKey,
      Buffer.from(data.data1, 'base64'),
    );
    const [ivHex, encrypted, authTagHex] = data.data2.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  encryptData(payload: string): DecryptDataDto {
    return this.encrypt(payload);
  }

  decryptData(data: DecryptDataDto): string {
    return this.decrypt(data);
  }
}
