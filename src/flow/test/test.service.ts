import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
   // 查询全部数据
   async testTest(): Promise<any> {
    return '测试接口fff';
  }
}
