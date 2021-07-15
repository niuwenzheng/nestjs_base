/*
 * @Author: nevin
 * @Date: 2020-12-04 13:08:33
 * @LastEditors: nevin
 * @LastEditTime: 2021-06-28 20:10:41
 * @Description: 服务配置
 */
import defaulted from './default';
export default {
  ...defaulted,
  connectUrl: 'mongodb://148.70.247.183:27017/test_my',
  opt: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    user: 'test',
    pass: '123456',
  },
};
