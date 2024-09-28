import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Realisation, RealisationDocument } from './realisation.schema';
import { CreateRealisationDto } from './dto/create-realisation.dto';

@Injectable() 
export class RealisationsService {
  constructor(@InjectModel(Realisation.name) private realisationModel: Model<RealisationDocument>) {} // Assurez-vous d'utiliser 'realisationModel'

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

  async updateRealisation(id: string, updateData: { content?: string }): Promise<Realisation | null> {
    const updatedRealisation = await this.realisationModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).exec();
  
    if (!updatedRealisation) {
      throw new Error('Réalisation non trouvée');
    }
  
    return updatedRealisation;
  }
}
