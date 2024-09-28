import { Module } from '@nestjs/common'; // Importation du décorateur Module
import { RealisationsController } from './realisation.controller'; // Importation du contrôleur
import { RealisationsService } from './realisation.service'; // Importation du service
import { Realisation, RealisationSchema } from './realisation.schema';
import { MongooseModule } from '@nestjs/mongoose';

// Déclaration du module RealisationsModule
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Realisation.name, schema: RealisationSchema }]),
  ], // Liste des modules à importer (vide ici)
  controllers: [RealisationsController], // Spécification des contrôleurs utilisés dans ce module
  providers: [RealisationsService], // Spécification des services utilisés dans ce module
})
export class RealisationsModule {}