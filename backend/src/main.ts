import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = config.get('app');

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  app.use(AuthMiddleware);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('LetX')
    .setDescription('LetX API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'Bearer', bearerFormat: 'JWT' },
      // 'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.port);
}
bootstrap();
