import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DataReturnInterceptor } from './common/interceptors/data.return.interceptor';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  app.useGlobalInterceptors(new DataReturnInterceptor());
  await app.listen(port, () => logger.log(`START PORT ${port}`));
}
bootstrap().then();
