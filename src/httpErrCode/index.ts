/*
 * @Author: niuwenzheng
 * @Date: 2020-08-24 22:51:56
 * @LastEditors: nevin
 * @LastEditTime: 2020-09-16 17:15:16
 * @Description: http业务错误返回
 */
import { HttpException, HttpStatus } from '@nestjs/common';

export class AppHttpException extends HttpException {
  constructor(errCode: number, errMsg: string) {
    const errObjSrt = JSON.stringify({ errCode, errMsg });
    super(errObjSrt, HttpStatus.OK);
  }
}

export const errHttpBack = {
  err_no_power_login: '40010',
  err_no_book_power: '20010',
  err_up_section_no_over: '20011',
};
