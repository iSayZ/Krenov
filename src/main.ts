import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3310;
  // Enable global Validation Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Removes properties not defined in the DTO
    forbidNonWhitelisted: true, // Throws an error if non-defined properties are present
    transform: true, // Automatically transforms payloads into DTO instances
  }));
  
  await app.listen(port);
}
bootstrap();
