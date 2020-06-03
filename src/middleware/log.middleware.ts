/*
 * @Author: niuwenzheng
 * @Date: 2020-04-14 19:30:21
 * @LastEditors: niuwenzheng
 * @LastEditTime: 2020-06-03 19:51:19
 * @Description: file content
 */
import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
    use(req: Request, resp: Response, next: Function) {
      console.log('日志中间件', req.headers.token);
      
        console.log(`${req.method} ${req.path}`)
        next();
    }
}