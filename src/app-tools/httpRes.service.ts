/*
 * @Author: niuwenzheng
 * @Date: 2020-08-24 22:51:56
 * @LastEditors: niuwenzheng
 * @LastEditTime: 2020-09-05 20:54:54
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
  err_no_power_login: new AppHttpException(40010, '您无权登录'),

  err_no_book_power: new AppHttpException(20010, '您无权操作该书籍'),
  err_up_section_no_over: new AppHttpException(20011, '上一章还未完成'),
};