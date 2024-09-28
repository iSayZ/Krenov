import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RealisationsModule } from './realisation/realisation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'uploads'), // URL = localhost:3000/img.png
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    RealisationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
