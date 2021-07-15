/*
 * @Author: nevin
 * @Date: 2020-12-04 14:33:49
 * @LastEditors: nevin
 * @LastEditTime: 2021-06-29 19:57:53
 * @Description: 默认配置
 */
export default {
  // mailServer
  mailServer: {
    host: 'smtp.163.com',
    port: 465,
    secure: true,
    auth: {
      user: '18713351330@163.com', // 发送方邮箱
      pass: 'OLJYNRKJGKSWVTUP', // 发送方邮箱的授权码,一般去邮箱设置里面找，应该可以找到
    },
  },
};