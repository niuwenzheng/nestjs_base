import { Injectable } from '@nestjs/common';
const crypto = require('crypto');
const fs = require('fs');

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

  /**
   * @description: 从文件加载key
   * @param {string} file PEM文件
   * @return {string} PEM字符串
   */
  static loadKey(file: string): string {
    return fs.readFileSync(file, 'utf8'); // key实际上就是PEM编码的字符串:
  }

  /**
   * @description: 使用私钥加密
   * @param {string} message
   * @return {string} 加密后的字符串
   */
  static privateEncrypt(message: string): string {
    const prvKey = this.loadKey('./rsa-prv.pem');
    let enc_by_prv = crypto.privateEncrypt(
      prvKey,
      Buffer.from(message, 'utf8'),
    );
    return enc_by_prv;
  }

  /**
   * @description: 公钥解密
   * @param {string} enc_by_prv
   * @return {string}
   */
  static publicDecrypt(enc_by_prv: string): string {
    const pubKey = this.loadKey('./rsa-pub.pem');
    let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv);
    return dec_by_pub;
  }

  /**
   * @description: 使用公钥加密
   * @param {string} message
   * @return {string}
   */
  static publicEncrypt(message: string): string {
    const pubKey = this.loadKey('./rsa-pub.pem');
    let enc_by_pub = crypto.publicEncrypt(pubKey, Buffer.from(message, 'utf8'));
    return enc_by_pub.toString('hex');
  }

  /**
   * @description: 使用公钥加密
   * @param {string} message
   * @return {string}
   */
  static publicEncryptWithKey(publicKey: string, message: string): string {
    const enc_by_pub = crypto.publicEncrypt(publicKey, Buffer.from(message, 'utf8'));
    return enc_by_pub.toString('hex');
  }

  /**
   * @description: 使用私钥解密
   * @param {string} enc_by_pub
   * @return {string}
   */
  static privateDecrypt(enc_by_pub: string): string {
    const prvKey = this.loadKey('./rsa-prv.pem');
    let dec_by_prv = crypto.privateDecrypt(prvKey, enc_by_pub);
    return dec_by_prv.toString('utf8');
  }

  /**
   * @description: AES加密
   * @param {any} data 数据
   * @param {string} key
   * @return {*}
   */
  static aesEncrypt(data: any, key: string): string {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  /**
   * @description: AES解密
   * @param {string} encrypted
   * @param {string} key
   * @return {*}
   */
  static aesDecrypt(encrypted: string, key: string): any {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
