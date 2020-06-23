/*
 * @Author: niuwenzheng
 * @Date: 2020-06-22 19:05:26
 * @LastEditors: niuwenzheng
 * @LastEditTime: 2020-06-22 20:26:20
 * @Description: 应用类工具
 */

'use strict';
import * as moment from 'moment';
import * as cryptojs from './cryptojs';
const utils = require('./utils');
const signKey = '~!@#$(*^%$&';

function randomString(seeds, strLen = 6) {
  if (utils.isEmpty(seeds)) {
    return '';
  }

  let code = '';
  for (let i = 0; i < strLen; i++) {
    const index = Math.floor(Math.random() * seeds.length);
    code += seeds[index];
  }
  return code;
}

function stringifyPrimitive(v) {
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

const isDebugMode = function() {
  return process.env.NODE_ENV === 'development';
};
const mmPid = function(pid) {
  if (pid.indexOf('mm_') === -1) {
    return 'mm_' + pid;
  }
  return pid;
};

const generateOrderNo = function() {
  const timeStr = moment().format('YYYYMMDDHHmmssSSSS');
  const seeds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return timeStr + randomString(seeds, 3);
};

const generateSign = function(str) {
  return cryptojs.md5(str + '&' + signKey);
};

const generateToken = function(userId, deviceId) {
  const token = {
    userId,
    deviceId: deviceId || null,
    createTime: utils.getTimestamp(),
  };
  return cryptojs.encrypt(token);
};

const decryptToken = function(tokenStr) {
  return cryptojs.decrypt(tokenStr);
};

const encryptPassword = function(password) {
  return cryptojs.encrypt(password, 'a9b8e0f5b331d74c');
};

const decryptPassword = function(encryptStr) {
  return cryptojs.decrypt(encryptStr, 'a9b8e0f44671d74c');
};

const generateSmsCode = function() {
  const seeds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return randomString(seeds, 4);
};

const generateInviteCode = function() {
  const codeCharsStr = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const codeChars = Array.from(codeCharsStr);
  return randomString(codeChars, 7);
};

const generateCouponCode = function() {
  const codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return randomString(codeChars, 6);
};

const generateUnionCardCode = function() {
  const codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return randomString(codeChars, 9);
};

const generatePayOrderCode = function() {
  const codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return randomString(codeChars, 9);
};

const getParamsStr = function(obj, sep, eq, name) {
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
        const ks = stringifyPrimitive(k) + eq;
        if (Array.isArray(obj[k])) {
          return obj[k]
            .map(function(v) {
              return ks + stringifyPrimitive(v);
            })
            .join(sep);
        }
        return ks + stringifyPrimitive(obj[k]);
      })
      .join(sep);
  }

  if (!name) return '';
  return stringifyPrimitive(name) + eq + stringifyPrimitive(obj);
};

const getClientIp = function(ctx) {
  const req = ctx.request;
  if (!req) {
    return null;
  }
  let realIp = '';

  if (req.connection) {
    if (req.connection.remoteAddress) {
      realIp = req.connection.remoteAddress;
    }
    if (req.connection.socket) {
      if (req.connection.socket.remoteAddress) {
        realIp = req.connection.socket.remoteAddress;
      }
    }
  }

  if (req.socket) {
    if (req.socket.remoteAddress) {
      realIp = req.socket.remoteAddress;
    }
  }

  if (req.headers) {
    if (req.headers['x-forwarded-for']) {
      realIp = req.headers['x-forwarded-for'];
    }
  }

  if (req.headers) {
    if (req.headers['x-real-ip']) {
      realIp = req.headers['x-real-ip'];
    }
  }
  realIp = realIp.replace(/::ffff:/, '');
  return realIp;
};

const msgReturnMsgAdd = function(MsgTypeObj, addMsg) {
  const newMsgTypeObj = {
    ...MsgTypeObj,
  };
  newMsgTypeObj.msg = newMsgTypeObj.msg + addMsg;
  return newMsgTypeObj;
};

/**
 * @description: 区分浏览器
 * @param {string} userAgent // ctx.header['user-agent'] 获取的
 * @return:
 */
const witchWeb = function(userAgent) {
  const env =
    userAgent.indexOf('WeChat') !== -1
      ? 'wx'
      : userAgent.indexOf('wechatdevtools') !== -1
      ? 'wx'
      : userAgent.indexOf('AliApp') !== -1
      ? 'ali'
      : 'other';
  return env;
};

export { 
  randomString,
  mmPid,
  isDebugMode,
  generateOrderNo,
  generateSign,
  generateToken,
  decryptToken,
  encryptPassword,
  decryptPassword,
  generateSmsCode,
  generateInviteCode,
  generateCouponCode,
  generateUnionCardCode,
  generatePayOrderCode,
  getParamsStr,
  getClientIp,
  msgReturnMsgAdd,
};
