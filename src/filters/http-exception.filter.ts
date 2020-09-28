import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { errHttpBackMap } from './http-exception.back-code';

errHttpBackMap.set('1', '请求失败');

export class AppHttpException extends HttpException {
  constructor(errCode: string) {
    super(errCode, HttpStatus.OK);
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const errorResponse = {
      data: exception.getResponse(),
      message: '',
      errCode: '', // 自定义code
      url: request.originalUrl, // 错误的url地址
    };

    const errObj = exception.getResponse() as {
      message?: '';
      statusCode?: '';
      error?: '';
    };

    if (typeof errObj === 'object') {
      errorResponse.data = errObj;
      errorResponse.message = errObj.message || '服务器异常';
      errorResponse.errCode = errObj.error || '1';
    }

    if (typeof errObj === 'string') {
      const messageCode = errHttpBackMap.get(exception.message)
        ? exception.message
        : '1';

      errorResponse.data = '';
      errorResponse.message = errHttpBackMap.get(messageCode);
      errorResponse.errCode = messageCode;
    }

    Logger.log(
      '错误提示:',
      errorResponse.errCode + ':' + errorResponse.message,
    );

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
