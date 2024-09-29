import { Module } from '@nestjs/common';
import { RealisationsController } from './realisation.controller';
import { RealisationsService } from './realisation.service';
import { Realisation, RealisationSchema } from './realisation.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Realisation.name, schema: RealisationSchema }]),
  ],
  controllers: [RealisationsController],
  providers: [RealisationsService],
})
export class RealisationsModule {}