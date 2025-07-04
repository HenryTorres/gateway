import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { environmentVars } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita las validaciones
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  await app.listen(environmentVars.PORT);

  const logger = new Logger('API-GATEWAY');
  logger.log(`Servidor ejecutandose en el puerto ${environmentVars.PORT}`)

}
bootstrap();
