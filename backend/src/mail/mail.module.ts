import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailConfig } from './mail.config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminAccount, AdminAccountSchema } from 'src/admin/schema/admin-account.schema';
import { AdminProfile, AdminProfileSchema } from 'src/admin/schema/admin-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminAccount.name, schema: AdminAccountSchema },
      { name: AdminProfile.name, schema: AdminProfileSchema },
    ]),
  ],
  providers: [MailService, MailConfig],
  exports: [MailService],
})
export class MailModule {}
