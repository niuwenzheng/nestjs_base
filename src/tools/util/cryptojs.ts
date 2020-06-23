import crypto = require('crypto');
import CryptoJS = require('crypto-js');
import utils = require('./utils');

function encryptByAES(
  data: string,
  key = 'd9d8e0f5b061234a',
  iv = '5efd3f6060e45330',
): string {
  key = CryptoJS.enc.Utf8.parse(key);
  iv = CryptoJS.enc.Latin1.parse(iv);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

function decryptByAES(
  data: string,
  key = 'd9d8e0f5b061234a',
  iv = '5efd3f6060e45330',
): string {
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

/**
 * @description: 加密字符串
 * @param {string} data 数据
 * @param {string} key 密匙
 * @param {string} iv iv
 * @return:
 */
const decryptString = function(
  data: string,
  key?: string,
  iv?: string,
): string {
  return decryptByAES(data, key, iv);
};

const md5 = function(str: string): string {
  if (!str) {
    return null;
  }
  const crypto_md5 = crypto.createHash('md5');
  // 加入编码
  crypto_md5.update(str.toString(), 'utf8');
  return crypto_md5.digest('hex');
};

const sha1 = function(str: string): string {
  const crypto_sha1 = crypto.createHash('sha1');
  // 加入编码
  crypto_sha1.update(str, 'utf8');
  return crypto_sha1.digest('hex');
};

const toBase64 = function(content) {
  return Buffer.from(content).toString('base64');
};

const fromBase64 = function(content) {
  return Buffer.from(content, 'base64').toString();
};

const encrypt = function(
  data: string | object,
  key?: string,
  iv?: string,
): string {
  if (data == null) {
    return null;
  }
  if (typeof data == 'object') {
    data = JSON.stringify(data);
  }
  const encryptStr = encryptByAES(data, key, iv);
  return encryptStr;
};

const decrypt = function(data, key?, iv?) {
  let params = decryptString(data, key, iv);
  if (utils.isEmpty(params)) {
    return null;
  }
  try {
    const jObject = JSON.parse(params);
    params = jObject;
  } catch (exception) {}
  return params;
};

export {
  encryptByAES,
  decryptByAES,
  decryptString,
  md5,
  sha1,
  toBase64,
  fromBase64,
  encrypt,
  decrypt,
};
