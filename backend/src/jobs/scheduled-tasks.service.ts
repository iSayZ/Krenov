import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AdminService } from 'src/admin/admin.service';
import * as fs from 'fs';
import * as path from 'path';
import { RealisationService } from 'src/realisation/realisation.service';

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class ScheduledTasks {
  constructor(
    private readonly adminService: AdminService,
    private readonly realisationService: RealisationService
  ) {}

  // Task to clear expired sessions
  @Cron('0 3 * * *') // Executing every day at 03:00
  async clearExpiredSessions() {
    const now = new Date();
    const expirationDate = new Date(now.getTime() - SEVEN_DAYS_IN_MS);

    // Search and delete expired sessions
    const result =
      await this.adminService.cleanUpInactiveSessions(expirationDate);
    console.log(`Sessions expirées supprimées : ${result.modifiedCount}`);
  }

  private readonly realisationsDirectory = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'uploads',
    'realisations'
  );

  // Task to delete old unused realisation upload folder
  @Cron('0 3 * * *') // // // Executing every day at 03:00
  async cleanUnusedFolders() {
    // Get all slugs
    const slugs = await this.realisationService.findAllSlugs();

    // Get all folders of /uploads/realisations
    const folders = fs.readdirSync(this.realisationsDirectory);

    // Browse all folders
    folders.forEach((folder) => {
      const folderPath = path.join(this.realisationsDirectory, folder);

      // Delete unused folder if does not match slugs
      if (!slugs.includes(folder)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
        console.log(`Dossier supprimé : ${folderPath}`);
      }
    });

    console.log('Nettoyage des dossiers inutilisés terminé');
  }
}
