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
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RealisationService } from './realisation.service';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';
import { FindOneParams } from '../common/dto/find-one-params.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FindOneSlug } from './dto/find-one-slug.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

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
  constructor(private readonly realisationService: RealisationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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

    return this.realisationService.create(createRealisationDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.realisationService.findAll();
  }

  @Get(':slug')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param() params: FindOneSlug) {
    return this.realisationService.findOne(params.slug);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
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

    return this.realisationService.updateRealisation(
      params.id,
      updateRealisationDto
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteRealisation(@Param() params: FindOneParams) {
    return this.realisationService.deleteRealisation(params.id);
  }
}
