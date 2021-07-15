/*
 * @Author: nevin
 * @Date: 2020-12-04 13:02:27
 * @LastEditors: nevin
 * @LastEditTime: 2020-12-04 16:12:07
 * @Description: 邮件服务配置
 */
import development from './development';
import defaulted from './default';

const configs = {
  defaulted,
  development,
}

const env = process.env.NODE_ENV || 'defaulted';
export default () => configs[env];