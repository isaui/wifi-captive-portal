import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000, '192.168.137.1');
}
bootstrap();