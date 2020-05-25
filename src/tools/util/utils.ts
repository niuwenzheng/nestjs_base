import * as moment from 'moment';
import * as xml2js from 'xml2js';
import * as currency from 'currency.js';

export class Utils {
  /**
   * @description: 同步的睡眠
   * @param {number} ms 时间毫秒
   * @return:
   */
  sleep(ms = 0): any {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('time out');
      }, ms);
    });
  }

  /**
   * @description: 检验是否为空字符串
   * @param {string} str
   * @return:
   */
  isEmpty(str: string): boolean {
    return !str || 0 === str.length;
  }

  /**
   * @description: 对象的深拷贝
   * @param {object} obj
   * @return: 复制的对象 obj
   */
  clone(obj: object): object {
    if (null == obj || 'object' != typeof obj) return obj;
    if (obj instanceof Date) {
      const copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
    if (obj instanceof Array) {
      const copy = [];
      const len = obj.length;
      for (let i = 0; i < len; ++i) {
        copy[i] = this.clone(obj[i]);
      }
      return copy;
    }
    if (obj instanceof Object) {
      const copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
      }
      return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  /**
   * @description: 对象的属性数量
   * @param {object} obj
   * @return: 数量 number
   */
  size(obj: object): number {
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
  }

  /**
   * @description: 对象排序
   * @param {object} obj
   * @return: 排序好的对象
   */
  objKeySort(obj: object): object {
    const newkey = Object.keys(obj).sort();
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    const newObj = {}; //创建一个新的对象，用于存放排好序的键值对
    //遍历newkey数组
    for (let i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
    }
    //返回排好序的新对象
    return newObj;
  }

  /**
   * @description: 10位秒级时间戳
   * @param {number} timestamp
   * @return:
   */
  getUnixTimestamp(timestamp = 0): number {
    if (!timestamp) {
      return moment().unix();
    }
    return Math.round(timestamp / 1000);
  }

  /**
   * @description: 13位 毫秒级时间戳  Unix ms timestamp
   * @return: number
   */
  getTimestamp(): number {
    return Number(moment().format('x'));
  }

  /**
   * @description: 得到一个介于参数max-min之间的随机数
   * @param {number} max
   * @param {number} min
   * @return:
   */
  getRandomNumber(max: number, min: number): number {
    let value = Math.floor(Math.random() * (max ? max : 10));
    if (min && value < min) {
      value = this.getRandomNumber(max, min);
    }
    if (max && value > max) {
      value = this.getRandomNumber(max, min);
    }
    // 备注value 取值范围包含min不包含max
    return value;
  }

  /**
   * @description: 随机返回一个位于参数list中的条目
   * @param {any[]} list
   * @return:
   */
  getRandomItem(list: any[]): any {
    const randomIndex = this.getRandomNumber(list.length, 0);
    const randomItem = list[randomIndex];
    return randomItem;
  }

  /**
   * @description: 随机返回n个位于参数list中的条目,n由参数count指定
   * @param {any[]} list
   * @param {number} count
   * @return: any[]
   */
  getRandomItems(list: any[], count: number): any[] {
    if (!Array.isArray(list)) {
      return [];
    }
    if (count > list.length) {
      return list;
    }
    const indexes = [];
    while (indexes.length < count) {
      const randomIndex = this.getRandomNumber(list.length, 0);
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
  }

  /**
   * @description: 随机手机号
   * @param {number} count
   * @return: string[]
   */
  randomPhoneNum(count: number): string[] {
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
      const phone2nd = this.getRandomItem([
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
      const phone3th = this.getRandomItem(phone2ndNums[phone2nd]);
      const phoneMid4 = `${this.getRandomNumber(9, 0)}${this.getRandomNumber(
        9,
        0,
      )}${this.getRandomNumber(9, 0)}${this.getRandomNumber(9, 0)}`;
      const phoneEnd4 = `${this.getRandomNumber(9, 0)}${this.getRandomNumber(
        9,
        0,
      )}${this.getRandomNumber(9, 0)}${this.getRandomNumber(9, 0)}`;
      const phoneNum = `1${phone2nd}${phone3th}${phoneMid4}${phoneEnd4}`;
      result.push(phoneNum);
    }
    return result;
  }

  /**
   * @description: XML解析为对象
   * @param {type}
   * @return:
   */
  parseXML(xml: string): object {
    return new Promise((resolve, reject) => {
      const opt = { trim: true, explicitArray: false, explicitRoot: false };
      xml2js.parseString(xml, opt, (err, res) =>
        err ? reject(new Error('XMLDataError')) : resolve(res || {}),
      );
    });
  }
  
  /**
   * @description: 向上取整, 保留n位小数并格式化输出（不足的部分补0）
   * @param {number} value 数值
   * @param {number} value 精度
   * @return: 
   */
  ceilFloat(value: number, n = 2): string {
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
  }
}