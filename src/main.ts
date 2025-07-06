import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { environmentVars } from './config/envs';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita las validaciones
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(environmentVars.PORT);

  const logger = new Logger('API-GATEWAY');
  logger.log(`Servidor ejecutandose en el puerto ${environmentVars.PORT}`)

}
bootstrap();
