import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { ApiProperty, ApiQuery } from '@nestjs/swagger'

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  // --------- 接口文档实列 STR ----------
  @ApiProperty({ example: 'foo@example.com' })
  @ApiQuery({ name: 'name', required: false })
  // --------- 接口文档实列 END ----------
  @Get()
  async testTest(): Promise<any> {
    return await this.testService.testTest();
  }

  @Get('/hhh')
  async testTestHhhh(): Promise<any> {
    return await this.testService.testTestHhhh();
  }
}
