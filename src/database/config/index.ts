/*
 * @Author: niuwenzheng
 * @Date: 2020-12-06 17:18:54
 * @LastEditors: nevin
 * @LastEditTime: 2021-06-29 20:12:30
 * @Description: file content
 */
import development from './development';
import defaulted from './default';

const configs = {
  defaulted,
  development,
};

const env = process.env.NODE_ENV || 'defaulted';
export default configs[env];
