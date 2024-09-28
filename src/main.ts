import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  // Activer le Validation Pipe globalement
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Supprime les propriétés non définies dans le DTO
    forbidNonWhitelisted: true, // Lance une erreur si des propriétés non définies sont présentes
    transform: true, // Transforme automatiquement les payloads en instances de DTO
  }));
  
  await app.listen(port);
}
bootstrap();
