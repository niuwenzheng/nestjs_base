```bash
$ npm install
```

# 一：增加命令
## 增加模块
```bash
$ nest g mo xxx
$ nest g module xxx
$ nest g mo flow/xxx
```
## 增加控制器
```bash
$ nest g co xxx
$ nest g co flow/xxx
```
## 增加服务
```bash
$ nest g service xxx
$ nest g s flow/xxx
```

class（别名：cl）
控制器（别名：co）
装饰者（别名：d）
例外（别名：e）
过滤器（别名：f）
网关（别名：ga）
警卫（别名：顾）
拦截器（别名：i）
中间件（别名：mi）
模块（别名：mo）
管道（别名：pi）
提供者（别名：pr）
服务（别名：s）

# 二：文件结构
> ### client web客户端
>> ### src 主要逻辑
>>> 1. cache 缓存模块
>>> 2. database 数据库模块
>>> 3. filters 过滤模块
>>> 4. flow 业务模块（建议业务写到此文件夹下）
>>> 5. interceptor 拦截器文件
>>> 6. middleware 中间件
>>> 7. SDK 外接的SDK
>>> 8. tools 工具模块
>>> 9. types 非ts模块的声明文件
>>> 10. upload-files 上传文件模块
## —— test 测试



```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
