/*
 * @Author: niuwenzheng
 * @Date: 2020-12-06 17:18:54
 * @LastEditors: nevin
 * @LastEditTime: 2021-07-15 16:18:56
 * @Description: redis配置
 */
import development from './development';
import defaulted from './default';

const configs = {
  defaulted,
  development,
};

const env = process.env.NODE_ENV || 'defaulted';
export default (): any => configs[env];
