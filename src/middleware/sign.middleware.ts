/*
 * @Author: niuwenzheng
 * @Date: 2020-04-14 19:30:21
 * @LastEditors: niuwenzheng
 * @LastEditTime: 2020-04-15 10:30:59
 * @Description: file content
 */
import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';

@Injectable()
export class SignMiddleware implements NestMiddleware {
    use(req: Request, resp: Response, next: Function) {
      console.log('sign', req.headers.token);
      
        console.log(`${req.method} ${req.path}`)
        next();
    }
}