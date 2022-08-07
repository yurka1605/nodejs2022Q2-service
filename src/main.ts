import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppLogger } from './common/modules/logger/logger.service';
import { handleErrors } from './common/helpers/handle-errors';

async function bootstrap() {
  handleErrors();

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(new AppLogger('APP'));
  app.useGlobalPipes(new ValidationPipe());

  const document = yaml.load(
    readFileSync(join(__dirname, '../doc/api.yaml')).toString(),
  ) as OpenAPIObject;
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
