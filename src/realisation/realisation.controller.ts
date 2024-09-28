import { Controller, Get, Post, Delete, Put, Body, UseInterceptors, UploadedFiles, Param, } from '@nestjs/common'; // Importation des décorateurs nécessaires
import { FilesInterceptor } from '@nestjs/platform-express';
import { RealisationsService } from './realisation.service';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';
import { FindOneParams } from '../common/dto/find-one-params.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
    destination: './public/uploads', // Le répertoire où les fichiers seront stockés
    filename: (req, file, cb) => {
      // Ici, vous pouvez personnaliser le nom du fichier
      const uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substring(2, 15);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`); // Enregistre le fichier avec un nom unique
    },
});

// Déclaration du contrôleur avec un chemin de base 'realisations'
@Controller('realisations') 
export class RealisationsController {
  // Constructeur pour injecter le service des realisations
  constructor(private readonly realisationsService: RealisationsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, { storage })) // Utilise le champ 'images' pour l'upload
  async create(@UploadedFiles() files: Express.Multer.File[], @Body() createRealisationDto: CreateRealisationDto) {
    
    const imageUrls = files.map(file => `/${file.filename}`); // Gérer le chemin des fichiers
    // Ajoutez les URLs au DTO
    createRealisationDto.imageUrls = imageUrls;
    return this.realisationsService.create(createRealisationDto);
  }

  // Définition d'une route HTTP GET pour récupérer toutes les realisations
  @Get()
  async findAll() {
    // Appelle le service pour obtenir la liste de toutes les realisations
    return this.realisationsService.findAll(); 
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParams) {
    return this.realisationsService.findOne(params.id);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('images', 10, { storage })) // Utilise le champ 'images' pour l'upload
  async updateRealisation(@UploadedFiles() files: Express.Multer.File[], @Body() updateRealisationDto: UpdateRealisationDto, @Param() params: FindOneParams) {

    const imageUrls = files.map(file => `/${file.filename}`); // Gérer le chemin des fichiers
    updateRealisationDto.imageUrls = imageUrls;
    return this.realisationsService.updateRealisation(params.id, updateRealisationDto);
  }

  @Delete(':id')
  async deleteRealisation(@Param() params: FindOneParams) {
    return this.realisationsService.deleteRealisation(params.id);
  }
}