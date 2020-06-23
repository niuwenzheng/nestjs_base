/*
 * @Author: niuwenzheng
 * @Date: 2020-06-23 17:52:40
 * @LastEditors: niuwenzheng
 * @LastEditTime: 2020-06-23 17:53:05
 * @Description: 全局拦截器
 */

import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response<T> {
  data: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        return {
          data,
          code: 0,
          message: '请求成功',
        };
      }),
    );
  }
}
