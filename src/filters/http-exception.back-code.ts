/*
 * @Author: niuwenzheng
 * @Date: 2020-08-24 22:51:56
 * @LastEditors: nevin
 * @LastEditTime: 2020-09-16 17:24:06
 * @Description: http业务错误返回map
 */
export const errHttpBackMap = new Map();

errHttpBackMap.set('40010', '您无权登录');
errHttpBackMap.set('20010', '您无权操作该书籍');
errHttpBackMap.set('20011', '上一章还未完成');

export const errHttpBack = {
  err_no_power_login: '40010',
  err_no_book_power: '20010',
  err_up_section_no_over: '20011',
};
