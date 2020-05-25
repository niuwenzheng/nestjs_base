import * as moment from 'moment';

import { Utils } from './utils';
const utils = new Utils();
import { Cryptojs } from './cryptojs';
const cryptojs = new Cryptojs();

const signKey = '~!@#$(*&^%$&';

export class AppUtil {
  isDebugMode(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  mmPid(pid: string): string {
    if (pid.indexOf('mm_') === -1) {
      return 'mm_' + pid;
    }
    return pid;
  }

  /**
   * @description: 随机字符串
   * @param {any[]} seeds 数组
   * @param {number} strLen 长度
   * @return:
   */

  randomString(seeds: any[], strLen = 6): string {
    if (seeds.length === 0) {
      return '';
    }

    let code = '';
    for (let i = 0; i < strLen; i++) {
      const index = Math.floor(Math.random() * seeds.length);
      code += seeds[index];
    }
    return code;
  }

  /**
   * @description: 生成订单号
   * @return: string
   */

  generateOrderNo(): string {
    const timeStr = moment().format('YYYYMMDDHHmmssSSSS');
    const seeds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return timeStr + this.randomString(seeds, 3);
  }

  /**
   * @description: 生成签名sign
   * @param {string} str 字符串
   * @return: string
   */
  generateSign(str: string): string {
    return cryptojs.md5(str + '&' + signKey);
  }

  /**
   * @description: 生成token
   * @param {string} userId 用户id
   * @param {string} deviceId 设备id
   * @return:
   */

  generateToken(userId: string, deviceId: string): string {
    const token = {
      userId,
      deviceId: deviceId || null,
      createTime: utils.getTimestamp(),
    };
    return cryptojs.encrypt(token);
  }

  /**
   * @description: 解token
   * @param {tokenStr} token字符串
   * @return:
   */

  decryptToken(tokenStr: string): object {
    return cryptojs.decrypt(tokenStr);
  }

  /**
   * @description: 加密密码
   * @param {string} password 密码
   * @return:
   */
  encryptPassword(password: string): string {
    return cryptojs.encrypt(password, 'a9b8e0f5b061d74c');
  }

  /**
   * @description: 解密密码
   * @param {string} encryptStr 加密的串
   * @return:
   */
  decryptPassword(encryptStr: string): string {
    return cryptojs.decrypt(encryptStr, 'a9b8e0f5b061d74c');
  }

  /**
   * @description: 生成验证码
   * @return:
   */
  generateSmsCode(): string {
    const seeds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return this.randomString(seeds, 4);
  }

  /**
   * @description: 生邀请码
   * @return: string
   */  
  generateInviteCode(){
    const codeChars = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    return this.randomString(codeChars, 7);
  };
  
  private _stringifyPrimitive(v) {
    switch (typeof v) {
      case 'string':
        return v;
  
      case 'boolean':
        return v ? 'true' : 'false';
  
      case 'number':
        return isFinite(v) ? v : '';
  
      default:
        return '';
    }
  }

  getParamsStr(obj, sep, eq, name) {
    if (sep !== '') {
      sep = sep || '&';
    }
    if (eq !== '') {
      eq = eq || '=';
    }
    if (obj === null) {
      obj = undefined;
    }
  
    if (typeof obj === 'object') {
      return Object.keys(obj)
        .map(function(k) {
          const ks = this._stringifyPrimitive(k) + eq;
          if (Array.isArray(obj[k])) {
            return obj[k]
              .map(function(v) {
                return ks + this._stringifyPrimitive(v);
              })
              .join(sep);
          } else {
            return ks + this._stringifyPrimitive(obj[k]);
          }
        })
        .join(sep);
    }
  
    if (!name) return '';
    return this._stringifyPrimitive(name) + eq + this._stringifyPrimitive(obj);
  };
  
}