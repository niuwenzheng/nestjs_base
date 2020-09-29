import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { join } from 'path';

// ----- 中间件 STR------
import { LogMiddleware } from './middleware/log.middleware';
import { SignMiddleware } from './middleware/sign.middleware';
// ----- 中间件 END------

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module'; // 数据库
import { CacheModule } from './cache/cache.module'; // 缓存
import { FlowModule } from './flow/flow.module'; // 业务模块
import { UploadFilesModule } from './upload-files/upload-files.module'; // 上传文件模块
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppToolsModule } from './app-tools/app-tools.module'; // 应用工具
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    DatabaseModule,
    CacheModule,
    FlowModule,
    UploadFilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    AppToolsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SignMiddleware)
      .exclude(
        { path: 'api/upload-files', method: RequestMethod.POST },
        'api/test',
      ) // 多个过滤多个参数
      .forRoutes('*')

      .apply(LogMiddleware)
      .forRoutes('users');
  }
}
