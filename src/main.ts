import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
declare const module: any;

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

  // ------------- 文档插件 STR ---------------
  app.useGlobalPipes(new ValidationPipe());
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
