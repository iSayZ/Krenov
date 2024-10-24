import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Controller('upload')
export class UploadController {
  private async handleUpload(
    @UploadedFiles() files: Express.Multer.File[],
    destination: string
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Aucun fichier téléchargé');
    }

    // Generate url path of uploaded image(s)
    return files.map((file) => ({
      url: `/${destination}/${file.filename}`,
      originalname: file.originalname,
    }));
  }

  @Post('avatar/:source')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('avatar', 1, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const source = req.params.source;
          
          const uniqueFolder = `./public/uploads/avatars/${source}`;
          
          // Create folder if is don't exist
          if (!fs.existsSync(uniqueFolder)) {
            fs.mkdirSync(uniqueFolder, { recursive: true });
          }
          
          callback(null, uniqueFolder);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      })
    })
  )
  async uploadAvatar(@UploadedFiles() files: Express.Multer.File[], @Param('source') source: string) {
    const filePaths = await this.handleUpload(files, `avatars/${source}`);
    return filePaths[0].url;
  }

  // @Post('realisation')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(
  //   FilesInterceptor('images', 10, {
  //     storage: UploadController.getStorage('realisations'), // Use method for stockage
  //   })
  // )
  // async uploadRealisations(@UploadedFiles() files: Express.Multer.File[]) {
  //   const filePaths = await this.handleUpload(files, 'realisations'); // Gestion des fichiers
  //   return { files: filePaths };
  // }
}
