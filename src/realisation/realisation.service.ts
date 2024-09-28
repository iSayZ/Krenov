import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Realisation, RealisationDocument } from './realisation.schema';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable() 
export class RealisationsService {
  constructor(@InjectModel(Realisation.name) private realisationModel: Model<RealisationDocument>) {} // Assurez-vous d'utiliser 'realisationModel'

  private async deleteImage(imageUrl: string): Promise<void> {
    const filePath = join(__dirname, '..', '..', 'public', 'uploads', imageUrl); // Chemin complet de l'image
    
    try {
      // Vérifier si le fichier existe avant d'essayer de le supprimer
      await fs.access(filePath);
      await fs.unlink(filePath); // Supprimer le fichier
      console.log(`Fichier ${imageUrl} supprimé avec succès`);
    } catch (err) {
      // Si le fichier n'existe pas, ignorer l'erreur
      if (err.code === 'ENOENT') {
        console.warn(`Fichier ${imageUrl} non trouvé, il peut déjà avoir été supprimé`);
        return; // Continuer même si le fichier n'est pas trouvé
      }
      // Gérer d'autres erreurs potentielles
      console.error(`Erreur lors de la suppression du fichier ${imageUrl}:`, err);
      throw err; // Rejeter l'erreur pour permettre la gestion à un niveau supérieur si nécessaire
    }
  }

  async create(createRealisationDto: CreateRealisationDto): Promise<Realisation> {
    const createdRealisation = new this.realisationModel(createRealisationDto); // Correction ici
    return createdRealisation.save(); // Utilisez la méthode save sur le modèle créé

  }

  async findAll(): Promise<Realisation[]> {
    return this.realisationModel.find().exec(); // Utilisez 'realisationModel'
  }

  async findOne(id: string): Promise<Realisation | null> {
    const realisation = await this.realisationModel.findById(id).exec(); // Utilisez 'realisationModel'

    if (!realisation) {
        throw new NotFoundException(`Realisation with ID ${id} not found`);
    }

    return realisation;
  }

  async updateRealisation(id: string, updateRealisationDto: UpdateRealisationDto): Promise<Realisation | null> {
    // Get the realisation to update
    const realisation = await this.realisationModel.findById(id).exec();
    
    if (!realisation) {
      throw new NotFoundException(`Réalisation avec ID ${id} non trouvée`);
    }

    // Delete the image if there is an image to delete
    if (updateRealisationDto.imagesToDelete) {
      updateRealisationDto.imagesToDelete.map((image) => this.deleteImage(image));
      realisation.imageUrls = realisation.imageUrls.filter(image => !updateRealisationDto.imagesToDelete.includes(image));
    }

    // Add the new image uploaded
    updateRealisationDto.imageUrls = [...realisation.imageUrls, ...updateRealisationDto.imageUrls]

    const updatedRealisation = await this.realisationModel.findByIdAndUpdate(
      id,
      updateRealisationDto,
      { new: true }
    ).exec();
  
    if (!updatedRealisation) {
      throw new Error(`Réalisation avec ID ${id} non trouvée`);
    }
  
    return updatedRealisation;
  }

  async deleteRealisation(id: string): Promise<{message: string}> {
    const realisation = await this.realisationModel.findById(id).exec();
    
    if (!realisation) {
      throw new NotFoundException(`Réalisation avec ID ${id} non trouvée`);
    }

    await Promise.all(realisation.imageUrls.map((imageUrl) => this.deleteImage(imageUrl)));

    const result = await this.realisationModel.deleteOne({ _id: id }).exec();
    
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Réalisation avec ID ${id} non trouvée lors de la suppression`);
    }

    return { message: `Réalisation avec ID ${id} supprimée avec succès` };
  }
}
