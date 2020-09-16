import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class TimeToolsService {
  static getTimestamp(): number {
    return Number(moment().format('x'));
  }

  static getNowTime(): string {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
  }

  static getToday0Timestamp(): number {
    return Number(
      moment()
        .startOf('day')
        .format('x'),
    );
  }
}
