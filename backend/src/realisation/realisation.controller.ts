import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RealisationService } from './realisation.service';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';
import { FindOneParams } from '../common/dto/find-one-params.dto';
import { FindOneSlug } from './dto/find-one-slug.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { Realisation } from './schema/realisation.schema';

@Controller('realisations')
export class RealisationsController {
  constructor(private readonly realisationService: RealisationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @User('sub') userId: string,
    @Body() createRealisationDto: CreateRealisationDto
  ): Promise<{ success: boolean }> {
    createRealisationDto.author = userId;

    await this.realisationService.create(createRealisationDto);

    return { success: true };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.realisationService.findAll();
  }

  @Get('active')
  async findAllActive() {
    return this.realisationService.findAllActive();
  }

  @Get(':slug')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param() params: FindOneSlug) {
    return this.realisationService.findOne(params.slug);
  }

  @Get('active/:slug')
  async findOneActive(@Param() params: FindOneSlug) {
    return this.realisationService.findOneActive(params.slug);
  }

  @Put(':slug')
  @UseGuards(JwtAuthGuard)
  async updateRealisation(
    @Body() updateRealisationDto: UpdateRealisationDto,
    @Param() params: FindOneSlug
  ) {
    await this.realisationService.updateRealisation(
      params.slug,
      updateRealisationDto
    );

    return { success: true };
  }

  @Post('order')
  @UseGuards(JwtAuthGuard)
  async changeOrderRealisation(
    @Body() orderRealisationArray: Pick<Realisation, 'slug' | 'order'>[]
  ) {
    await this.realisationService.changeOrderRealisation(orderRealisationArray);

    return { success: true };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteRealisation(@Param() params: FindOneParams) {
    return this.realisationService.deleteRealisation(params.id);
  }
}
