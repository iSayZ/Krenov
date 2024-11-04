import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AdminAccount,
  AdminAccountSchema,
} from 'src/admin/schema/admin-account.schema';
import { AuthModule } from 'src/auth/auth.module';
import { TwoFactorController } from './twofactor.controller';
import { TwoFactorService } from './twofactor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminAccount.name, schema: AdminAccountSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [TwoFactorController],
  providers: [TwoFactorService],
  exports: [TwoFactorService],
})
export class TwoFactorModule {}
