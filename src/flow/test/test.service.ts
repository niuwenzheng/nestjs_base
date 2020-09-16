import { Injectable, BadRequestException } from '@nestjs/common';
import { errHttpBack } from 'src/filters/http-exception.back-code';
import { AppHttpException } from 'src/filters/http-exception.filter';

@Injectable()
export class TestService {
  // 查询全部数据
  async testTest(): Promise<any> {
    // throw new BadRequestException({ xx: 111 }, 'ceshiassssss');
    throw new AppHttpException(errHttpBack.err_no_power_login);
    // return {adas:22}
  }

  // 查询全部数据
  async testTestHhhh(): Promise<any> {
    throw new BadRequestException({ xx: 111 }, 'ceshiassssss');
    // throw errHttpBack.err_no_power_login;
    // return {adas:22}
  }
}
