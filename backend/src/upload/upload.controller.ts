import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  private static getStorage(destination: string) {
    return diskStorage({
      destination: `./public/uploads/${destination}`, // Utilisation du chemin dynamique
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, uniqueSuffix + extname(file.originalname)); // Nom de fichier unique
      },
    });
  }

  private async handleUpload(
    @UploadedFiles() files: Express.Multer.File[],
    destination: string
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Aucun fichier téléchargé');
    }

    // Générer les URLs ou les chemins des fichiers uploadés
    return files.map((file) => ({
      url: `/${destination}/${file.filename}`, // Chemin dynamique pour chaque type d'upload
      originalname: file.originalname,
    }));
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('avatar', 10, {
      storage: UploadController.getStorage('avatar'), // Utilisation de la méthode pour le stockage
    })
  )
  async uploadAvatar(@UploadedFiles() files: Express.Multer.File[]) {
    const filePaths = await this.handleUpload(files, 'avatar'); // Gestion des fichiers
    return filePaths[0].url;
  }

  @Post('realisation')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: UploadController.getStorage('realisation'), // Utilisation de la méthode pour le stockage
    })
  )
  async uploadRealisations(@UploadedFiles() files: Express.Multer.File[]) {
    const filePaths = await this.handleUpload(files, 'realisation'); // Gestion des fichiers
    return { files: filePaths };
  }
}
