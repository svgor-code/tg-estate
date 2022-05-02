import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://51.250.96.239:3000',
      'http://0.0.0.0:8080',
    ],
  });
  await app.listen(process.env.PORT);
}

bootstrap();
