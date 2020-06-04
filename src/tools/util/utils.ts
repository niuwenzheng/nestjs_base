/*
 * @Author: niuwenzheng
 * @Date: 2020-06-04 19:50:32
 * @LastEditors: niuwenzheng
 * @LastEditTime: 2020-06-04 20:39:22
 * @Description: 基础工具
 */

import * as moment from 'moment';
import * as xml2js from 'xml2js';
import * as currency from 'currency.js';
/**
 * @description: 同步睡眠
 * @param {number} ms 毫秒数
 * @return: Promise<string>
 */
const sleep = (ms: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('time out');
    }, ms);
  });
};
/**
 * @description: 判断是否为空
 * @param {type}
 * @return:
 */
const isEmpty = (value: any) => {
  return !value || 0 === value.length;
};

/**
 * @description: 对象的深拷贝
 * @param {object} obj 需要拷贝的对象
 * @return: object
 */
const clone = (obj: object): object => {
  // Handle the 3 simple types, and null or undefined
  if (null == obj || 'object' != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    const copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    const copy = [];
    const len = obj.length;
    for (let i = 0; i < len; ++i) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    const copy = {};
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};

/**
 * @description: 对象大小
 * @param {object} obj
 * @return: size
 */
const size = function(obj: object): number {
  if (!obj) {
    return 0;
  }
  let size = 0;
  for (const f in obj) {
    if (obj.hasOwnProperty(f)) {
      size++;
    }
  }
  return size;
};

/**
 * @description: 对象内属性排序
 * @param {object} obj
 * @return: newObj
 */
const objKeySort = (obj: object) => {
  const newKey = Object.keys(obj).sort();
  // 先用Object内置类的keys方法获取要排序对象的属性名，
  // 再利用Array原型上的sort方法对获取的属性名进行排序，
  // newKey是一个数组
  const newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  // 遍历newKey数组
  for (let i = 0; i < newKey.length; i++) {
    newObj[newKey[i]] = obj[newKey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
  }
  //返回排好序的新对象
  return newObj;
};

/**
 * @description: 10位 秒级时间戳
 * @param {number} timestamp 13位时间戳 或 空
 * @return: number
 */
const getUnixTimestamp = (timestamp: number): number => {
  if (isEmpty(timestamp)) {
    return moment().unix();
  }
  return Math.round(timestamp / 1000);
};

/**
 * @description: 13位 毫秒级时间戳
 * @return: number
 */
const getTimestamp = (): number => {
  return Number(moment().format('x'));
};

/**
 * @description: 得到一个介于参数max-min之间的随机数
 * @param {number} max 最大值
 * @param {number} min 最小值
 * @return: 备注value 取值范围包含min不包含max
 */
const getRandomNumber = (max: number, min: number): number => {
  let value = Math.floor(Math.random() * (max ? max : 10));
  if (min && value < min) {
    value = getRandomNumber(max, min);
  }
  if (max && value > max) {
    value = getRandomNumber(max, min);
  }
  // 备注value 取值范围包含min不包含max
  return value;
};

/**
 * @description: 随机返回一个位于参数list中的条目
 * @param {any[]} list
 * @return:
 */
const getRandomItem = (list: any[]): any => {
  const randomIndex = getRandomNumber(list.length, 0);
  return list[randomIndex];
};

/**
 * @description: 随机返回n个位于参数list中的条目,n由参数count指定
 * @param {any[]} list
 * @param {number} count 数量
 * @return: items
 */
const getRandomItems = (list: any[], count: number): any[] => {
  if (!Array.isArray(list)) {
    return [];
  }
  if (count > list.length) {
    return list;
  }
  const indexes = [];
  while (indexes.length < count) {
    const randomIndex = getRandomNumber(list.length, 0);
    if (indexes.indexOf(randomIndex) < 0) {
      indexes.push(randomIndex);
    }
  }
  const items = [];
  for (let i = indexes.length - 1; i >= 0; i--) {
    const itemOne = list[indexes[i]];
    items.push(itemOne);
  }
  return items;
};

/**
 * @description: 随机手机号
 * @param {number} count 数量
 * @return: string[]
 */
const randomPhoneNum = (count: number): string[] => {
  const result = [];
  for (let i = 0; i < count; i++) {
    const phone2ndNums = {
      '3': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      '4': ['5', '7', '9'],
      '5': ['0', '1', '2', '3', '5', '6', '7', '8', '9'],
      '6': ['6'],
      '7': ['0', '1', '3', '5', '6', '7', '8'],
      '8': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      '9': ['8', '9'],
    };
    const phone2nd = getRandomItem([
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '3',
      '5',
      '8',
      '3',
      '5',
      '8',
    ]);
    const phone3th = getRandomItem(phone2ndNums[phone2nd]);
    const phoneMid4 = `${getRandomNumber(9, 0)}${getRandomNumber(
      9,
      0,
    )}${getRandomNumber(9, 0)}${getRandomNumber(9, 0)}`;
    const phoneEnd4 = `${getRandomNumber(9, 0)}${getRandomNumber(
      9,
      0,
    )}${getRandomNumber(9, 0)}${getRandomNumber(9, 0)}`;
    const phoneNum = `1${phone2nd}${phone3th}${phoneMid4}${phoneEnd4}`;
    result.push(phoneNum);
  }
  return result;
};

/**
 * @description: 解析XML
 * @param {string} xml
 * @return: Promise<object>
 */
const parseXML = (xml: string): Promise<object> =>
  new Promise((resolve, reject) => {
    const opt = { trim: true, explicitArray: false, explicitRoot: false };
    xml2js.parseString(xml, opt, (err, res) =>
      err ? reject(new Error('XMLDataError')) : resolve(res || {}),
    );
  });

/**
 * @description: 向上取整, 保留n位小数并格式化输出（不足的部分补0）
 * @param {type}
 * @return:
 */
const ceilFloat = (value: number, n = 2): string => {
  const f = Math.ceil(value * Math.pow(10, n)) / Math.pow(10, n);
  let s = f.toString();
  const rs = s.indexOf('.');
  if (rs < 0 && n > 0) {
    s += '.';
  }
  for (let i = s.length - s.indexOf('.'); i <= n; i++) {
    s += '0';
  }
  return s;
};
// String.prototype.format = function(args) {
//   let result = this;
//   if (arguments.length > 0) {
//       if (arguments.length == 1 && typeof (args) == "object") {
//           for (const key in args) {
//               if(args[key]!=undefined){
//                   const reg = new RegExp("({" + key + "})", "g");
//                   result = result.replace(reg, args[key]);
//               }
//           }
//       }
//       else {
//           for (let i = 0; i < arguments.length; i++) {
//               if (arguments[i] != undefined) {
//                   //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
//                   const reg = new RegExp("({)" + i + "(})", "g");
//                   result = result.replace(reg, arguments[i]);
//               }
//           }
//       }
//   }
//   return result;
// };

// Number.prototype.currencyFormat = function() {
//   let result = this.valueOf();
//   if(result === 0){
//       return 0
//   }
//   result = currency(result).format()
//   return result
// };

// Number.prototype.centFormat = function() {
//   let result = this.valueOf();

//   if(result === 0){
//       return '0'
//   }
//   result = currency(result/100).format()
//   return result
// };

export {
  sleep,
  isEmpty,
  clone,
  size,
  objKeySort,
  getUnixTimestamp,
  getRandomNumber,
  getRandomItem,
  getRandomItems,
  randomPhoneNum,
  parseXML,
  ceilFloat
};
