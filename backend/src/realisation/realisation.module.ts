import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { RealisationsController } from './realisation.controller';
import { RealisationService } from './realisation.service';
import { Realisation, RealisationSchema } from './schema/realisation.schema';

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
