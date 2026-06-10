import { Injectable } from '@nestjs/common';
import { EncryptDataDto } from './dto/encrypt-data.dto';
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
  private privateKey = fs.readFileSync('./configs/private.key', 'utf-8');
  private publicKey = fs.readFileSync('./configs/public.key', 'utf-8');

  private encrypt(payload: string): DecryptDataDto {
    const key = randomBytes(32);
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(payload, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const data1 = privateEncrypt(this.privateKey, key).toString('base64');
    return {
      data1,
      data2: iv.toString('hex') + ':' + encrypted,
    };
  }

  private decrypt(data: DecryptDataDto): string {
    const key = publicDecrypt(
      this.publicKey,
      Buffer.from(data.data1, 'base64'),
    );
    const [ivHex, encrypted] = data.data2.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = createDecipheriv('aes-256-gcm', key, iv);
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
