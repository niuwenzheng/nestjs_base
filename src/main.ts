import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

// ------------- 热重载 STR ---------------
declare const module: any;
// ------------- 热重载 STR ---------------

// ------------- 全局注册错误的过滤器 STR-------------
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
// ------------- 全局注册拦截器 END-------------

// ------------- 文档插件 STR ---------------
function createSwagger(app: INestApplication) {
  const version = require('../package.json').version || '';
  const options = new DocumentBuilder()
    .setTitle('Nestjs 接口文档')
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
}
// ------------- 文档插件 END ---------------

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe()); // 此处注释是为了使用自定义的参数验证管道

  // ------------- 全局注册错误的过滤器 STR-------------
  app.useGlobalFilters(new HttpExceptionFilter());
  // ------------- 全局注册错误的过滤器 END-------------

  // ------------- 全局注册拦截器 STR-------------
  app.useGlobalInterceptors(new TransformInterceptor());
  // ------------- 全局注册拦截器 END-------------

  // ------------- 文档插件 STR ---------------
  if (process.env.SWAGGER_ENABLE && process.env.SWAGGER_ENABLE === 'true') {
    createSwagger(app);
  }
  // ------------- 文档插件 END ---------------

  await app.listen(3000);

  // ------------- 热重载 STR ---------------
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // ------------- 热重载 STR ---------------
}
bootstrap();
