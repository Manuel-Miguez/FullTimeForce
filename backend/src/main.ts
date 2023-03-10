import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  configSwagger(app);
  await app.listen(process.env.PORT);
}
bootstrap();
