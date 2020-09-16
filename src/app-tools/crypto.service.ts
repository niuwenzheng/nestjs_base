import { Injectable } from '@nestjs/common';
const crypto = require('crypto');

@Injectable()
export class CryptoToolsService {
  static readonly hashString = '!q@w#e$r';

  static generateToken(tokenObj: object): string {
    const tokenStr = JSON.stringify(tokenObj);
    const cipher = crypto.createCipher('aes192', this.hashString);
    let enc = cipher.update(tokenStr, 'utf8', 'hex'); // 编码方式从utf-8转为hex;
    enc += cipher.final('hex'); // 编码方式从转为hex;
    return enc;
  }

  static decryptToken(tokenStr: string): object {
    const decipher = crypto.createDecipher('aes192', this.hashString);
    let dec = decipher.update(tokenStr, 'hex', 'utf8'); // 编码方式从hex转为utf-8;
    dec += decipher.final('utf8'); // 编码方式从utf-8;
    dec = JSON.parse(dec);
    return dec;
  }

  static encryptPassword(password: string): string {
    const m = crypto.createHash('md5');
    m.update(password, 'utf8');
    return m.digest('hex').toUpperCase();
  }
}
