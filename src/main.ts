import {NestFactory} from '@nestjs/core';
import * as dotenv from 'dotenv';
import {AppModule} from './app.module';
import {CommonModule} from './common/common.module';
import {ConfigService} from './common/config.service';

const bootstrap = async () => {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const config = app.select(CommonModule).get(ConfigService, {strict: true});
  await app.listen(config.get('PORT'));

  process.on('unhandledRejection', (reason, promise) => {
    // tslint:disable-next-line: no-console
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
};
bootstrap();
