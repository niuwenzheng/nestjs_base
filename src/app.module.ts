import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

// ----- 中间件 STR------
import { LogMiddleware } from './middleware/log.middleware';
import { SignMiddleware } from './middleware/sign.middleware';
// ----- 中间件 END------

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module'; // 数据库
import { CacheModule } from './cache/cache.module'; // 缓存 
import { FlowModule } from './flow/flow.module'; // 业务模块

@Module({
  imports: [DatabaseModule, CacheModule, FlowModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SignMiddleware)
      .forRoutes('*')
      .apply(LogMiddleware)
      .forRoutes('users')
  }
}
