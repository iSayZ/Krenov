import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SessionCleanupService } from './session-cleanup.service';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [ScheduleModule.forRoot(), AdminModule],
  providers: [SessionCleanupService],
})
export class SessionCleanupModule {}