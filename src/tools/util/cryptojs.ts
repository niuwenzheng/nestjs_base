import * as CryptoJS from 'crypto-js';
import * as crypto from 'crypto';

import { Utils } from './utils';
const utils = new Utils();

export class Cryptojs {
  private cryptojs_key: string;
  private cryptojs_iv: string;
  public constructor(
    cryptojs_key = 'd9d8e0f5b061d74a',
    cryptojs_iv = '5efd3f6060e20330',
  ) {
    this.cryptojs_key = cryptojs_key;
    this.cryptojs_iv = cryptojs_iv;
  }

  private _encryptByAES(data, key, iv) {
    key = key || this.cryptojs_key;
    iv = iv || this.cryptojs_iv;

    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Latin1.parse(iv);
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  private _decryptByAES(data, key, iv) {
    key = key || this.cryptojs_key;
    iv = iv || this.cryptojs_iv;

    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Latin1.parse(iv);
    const decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    try {
      const decryptedStr = CryptoJS.enc.Utf8.stringify(decrypted);
      if (!decryptedStr) {
        return null;
      }
      return decryptedStr.toString();
    } catch (err) {
      return null;
    }
  }

  md5(str: string): string {
    if (!str) {
      return null;
    }
    const crypto_md5 = crypto.createHash('md5');
    // 加入编码
    crypto_md5.update(str.toString(), 'utf8');
    return crypto_md5.digest('hex');
  }

  sha1(str: string): string {
    const crypto_sha1 = crypto.createHash('sha1');
    // 加入编码
    crypto_sha1.update(str, 'utf8');
    return crypto_sha1.digest('hex');
  }

  toBase64(content: string): string {
    return Buffer.from(content).toString('base64');
  }

  fromBase64(content: string): string {
    return Buffer.from(content, 'base64').toString();
  }

  encrypt(data: string | object, key: string, iv: string): string {
    if (data == null) {
      return null;
    }

    if (typeof data == 'object') {
      data = JSON.stringify(data);
    }

    const encryptStr = this._encryptByAES(data, key, iv);
    return encryptStr;
  }

  decrypt(data: string, key: string, iv: string): any {
    let params = this.decryptString(data, key, iv);
    if (utils.isEmpty(params)) {
      return null;
    }
    try {
      const jObject = JSON.parse(params);
      params = jObject;
    } catch (exception) {}
    return params;
  }

  decryptString(data: string, key: string, iv: string): any {
    if (data == null) {
      return null;
    }
    const params = this._decryptByAES(data, key, iv);
    return params;
  }
}
