import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  UseGuards,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { UploadService } from './upload.service';

// Check file extension, to authorize images only
function imageFileFilter(
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void
) {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/avif',
  ];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];

  const fileExtension = extname(file.originalname).toLowerCase();

  if (
    !allowedMimeTypes.includes(file.mimetype) ||
    !allowedExtensions.includes(fileExtension)
  ) {
    return callback(
      new BadRequestException(
        'Invalid file type. Only JPEG, PNG, GIF, WEBP, and AVIF are allowed.'
      ),
      false
    );
  }

  callback(null, true);
}

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  // To return the good src of the file
  private async handleUpload(
    @UploadedFiles() files: Express.Multer.File[],
    destination: string
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Aucun fichier téléchargé');
    }

    // Generate url path of uploaded image(s)
    return files.map((file) => ({
      url: `${process.env.API_URL}/${destination}/${file.filename}`,
      originalname: file.originalname,
    }));
  }

  // Road to delete an image
  @Post('delete/:source')
  async deleteImage(@Param('source') source: string) {
    return await UploadService.deleteImage(source);
  }

  // Road to upload an avatar
  @Post('avatar/:source')
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
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: imageFileFilter,
    })
  )
  async uploadAvatar(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('source') source: string
  ) {
    const filePaths = await this.handleUpload(files, `avatars/${source}`);
    return filePaths[0].url;
  }

  // Road to upload an article image
  @Post('realisation/:source')
  @UseInterceptors(
    FilesInterceptor('file', 1, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const source = req.params.source;

          const uniqueFolder = `./public/uploads/realisations/${source}`;

          // Create folder if is don't exist
          if (!fs.existsSync(uniqueFolder)) {
            fs.mkdirSync(uniqueFolder, { recursive: true });
          }

          callback(null, uniqueFolder);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: imageFileFilter,
    })
  )
  async uploadRealisationContentPicture(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('source') source: string
  ) {
    const filePaths = await this.handleUpload(files, `realisations/${source}`);
    return filePaths[0].url;
  }
}
