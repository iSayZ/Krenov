import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  UseInterceptors,
  UploadedFiles,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RealisationsService } from './realisation.service';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';
import { FindOneParams } from '../common/dto/find-one-params.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FindOneSlug } from './dto/find-one-slug.dto';

// Storage config for multer
const storage = diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + '-' + Math.random().toString(36).substring(2, 15);
    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
  },
});

@Controller('realisations')
export class RealisationsController {
  constructor(private readonly realisationsService: RealisationsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, { storage })) // Intercept images in the 'images' key
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createRealisationDto: CreateRealisationDto
  ) {

    if (files) {
      const imageUrls = files.map((file) => `/${file.filename}`);
      createRealisationDto.imageUrls = imageUrls;
      createRealisationDto.header = imageUrls[0];
    }

    return this.realisationsService.create(createRealisationDto);
  }

  @Get()
  async findAll() {
    return this.realisationsService.findAll();
  }

  @Get(':slug')
  async findOne(@Param() params: FindOneSlug) {
    return this.realisationsService.findOne(params.slug);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('images', 10, { storage })) // Intercept images in the 'images' key
  async updateRealisation(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateRealisationDto: UpdateRealisationDto,
    @Param() params: FindOneParams
  ) {

    if (files) {
      const imageUrls = files.map((file) => `/${file.filename}`);
      updateRealisationDto.imageUrls = imageUrls;
    }

    return this.realisationsService.updateRealisation(
      params.id,
      updateRealisationDto
    );
  }

  @Delete(':id')
  async deleteRealisation(@Param() params: FindOneParams) {
    return this.realisationsService.deleteRealisation(params.id);
  }
}
