import { Injectable, BadRequestException } from '@nestjs/common';
import { httpErrCode } from '../../httpErrCode';

@Injectable()
export class TestService {
  // 查询全部数据
  async testTest(): Promise<any> {
    throw new BadRequestException(httpErrCode.err_test);
  }
}
