import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduledTasks } from './scheduled-tasks.service';
import { AdminModule } from 'src/admin/admin.module';
import { RealisationsModule } from 'src/realisation/realisation.module';

@Module({
  imports: [ScheduleModule.forRoot(), AdminModule, RealisationsModule],
  providers: [ScheduledTasks],
})
export class ScheduledTasksModule {}
