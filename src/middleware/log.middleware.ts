/*
 * @Author: niuwenzheng
 * @Date: 2020-04-14 19:30:21
 * @LastEditors: niuwenzheng
 * @LastEditTime: 2020-04-14 19:35:35
 * @Description: file content
 */
import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
    use(req: Request, resp: Response, next: Function) {
      console.log('ssss', req.headers.token);
      
        console.log(`${req.method} ${req.path}`)
        next();
    }
}