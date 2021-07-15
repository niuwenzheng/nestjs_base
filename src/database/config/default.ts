/*
 * @Author: nevin
 * @Date: 2020-12-04 14:33:49
 * @LastEditors: nevin
 * @LastEditTime: 2021-06-28 20:11:07
 * @Description: 默认配置
 */
export default {
  connectUrl: 'mongodb://127.0.0.1:27017/test_my',
  opt: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    user: 'test',
    pass: '123456',
  },
};
