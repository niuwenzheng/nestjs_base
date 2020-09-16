import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import _ = require('lodash');

@Injectable()
export class AppToolsService {
  static getTimestamp(): number {
    return Number(moment().format('x'));
  }

  static getSpanNumber(min: number, max: number): number {
    return _.random(min,max);
  }

  static getEnumList(TheEnum: object): Array<any> {
    const enumList: Array<any> = [];
    for (let key in TheEnum) {
      enumList.push(TheEnum[key]);
    }
    return enumList;
  }
}
