import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  // serve uploaded files
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
  });

  await app.listen(4000);
}

void bootstrap();
