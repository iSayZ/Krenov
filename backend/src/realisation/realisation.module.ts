import { Module } from '@nestjs/common';
import { RealisationsController } from './realisation.controller';
import { RealisationService } from './realisation.service';
import { Realisation, RealisationSchema } from './realisation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Realisation.name, schema: RealisationSchema },
    ]),
    AuthModule,
  ],
  controllers: [RealisationsController],
  providers: [RealisationService],
})
export class RealisationsModule {}
