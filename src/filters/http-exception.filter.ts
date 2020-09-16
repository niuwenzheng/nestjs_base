import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const message = exception.message;

    let messageObj = {
      errCode: 1,
      errMsg: '请求失败',
    };
    
    try {
      messageObj = JSON.parse(message);
    } catch (error) {
      Logger.error('报错返回值出错', error);
    }

    Logger.log('错误提示', message);
    
    const errorResponse = {
      data: exception.getResponse(),
      message: messageObj.errMsg,
      code: messageObj.errCode, // 自定义code
      url: request.originalUrl, // 错误的url地址
    };
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
