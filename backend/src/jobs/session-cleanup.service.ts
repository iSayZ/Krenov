import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AdminService } from 'src/admin/admin.service';
const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class SessionCleanupService {
  constructor(private readonly adminService: AdminService) {}

  @Cron('0 0 * * *') // Executing every day at 00:00
  async handleCron() {
    const now = new Date();
    const expirationDate = new Date(now.getTime() - SEVEN_DAYS_IN_MS);

    // Search and delete expired sessions
    const result = await this.adminService.cleanUpInactiveSessions(expirationDate);
    console.log(`Sessions expirées supprimées : ${result.modifiedCount}`);
  }
}
