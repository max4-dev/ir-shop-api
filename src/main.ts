import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './common/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: [env().client_url, env().admin_url],
  });

  await app.listen(4444);
}
bootstrap();
