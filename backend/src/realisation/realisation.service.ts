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
  constructor(
    @InjectModel(Realisation.name)
    private realisationModel: Model<RealisationDocument>
  ) {}

  private async deleteImage(imageUrl: string): Promise<void> {
    const filePath = join(__dirname, '..', '..', 'public', 'uploads', imageUrl); // Complete path of the image

    try {
      // Check if the file exists before attempting to delete it
      await fs.access(filePath);
      await fs.unlink(filePath); // Delete the file
      console.log(`File ${imageUrl} deleted successfully`);
    } catch (err) {
      // If the file does not exist, return an error
      if (err.code === 'ENOENT') {
        console.warn(
          `File ${imageUrl} not found, it may have already been deleted`
        );
        return;
      }
      // Handle other potential errors
      console.error(`Error while deleting the file ${imageUrl}:`, err);
      throw err;
    }
  }

  async create(
    createRealisationDto: CreateRealisationDto
  ): Promise<Realisation> {
    // If the slug already exist, add a number in the end
    let uniqueSlug = createRealisationDto.slug;
    let counter = 1;

    while (await this.realisationModel.findOne({ slug: uniqueSlug }).exec()) {
      uniqueSlug = `${createRealisationDto.slug}-${counter}`;
      counter++;
    }

    createRealisationDto.slug = uniqueSlug;

    const createdRealisation = new this.realisationModel(createRealisationDto);
    return createdRealisation.save();
  }

  async findAll(): Promise<Realisation[]> {
    return this.realisationModel.find().sort({ updatedAt: -1 }).exec();
  }

  async findOne(slug: string): Promise<Realisation | null> {
    const realisation = await this.realisationModel.findOne({ slug }).exec();

    if (!realisation) {
      throw new NotFoundException(`Realisation with slug "${slug}" not found`);
    }

    return realisation;
  }

  async updateRealisation(
    id: string,
    updateRealisationDto: UpdateRealisationDto
  ): Promise<Realisation | null> {
    // Get the realisation to update
    const realisation = await this.realisationModel.findById(id).exec();

    if (!realisation) {
      throw new NotFoundException(`Réalisation avec ID ${id} non trouvée`);
    }

    // Delete the image if there is an image to delete
    if (updateRealisationDto.imagesToDelete) {
      await Promise.all(
        updateRealisationDto.imagesToDelete.map((imageUrl) =>
          this.deleteImage(imageUrl)
        )
      );
      realisation.imageUrls = realisation.imageUrls.filter(
        (image) => !updateRealisationDto.imagesToDelete.includes(image)
      );
    }

    if (realisation.imageUrls && updateRealisationDto.imagesToDelete) {
      // Add the new image uploaded
      updateRealisationDto.imageUrls = [
        ...realisation.imageUrls,
        ...updateRealisationDto.imageUrls,
      ];
    }

    // If the slug already exist, add a number in the end
    let uniqueSlug = updateRealisationDto.slug;
    let counter = 1;

    while (await this.realisationModel.findOne({ slug: uniqueSlug }).exec()) {
      uniqueSlug = `${updateRealisationDto.slug}-${counter}`;
      counter++;
    }

    updateRealisationDto.slug = uniqueSlug;

    const updatedRealisation = await this.realisationModel
      .findByIdAndUpdate(id, updateRealisationDto, { new: true })
      .exec();

    if (!updatedRealisation) {
      throw new Error(`Réalisation avec ID ${id} non trouvée`);
    }

    return updatedRealisation;
  }

  async deleteRealisation(id: string): Promise<{ message: string }> {
    // Get the realisation to delete
    const realisation = await this.realisationModel.findById(id).exec();

    if (!realisation) {
      throw new NotFoundException(`Réalisation avec ID ${id} non trouvée`);
    }

    // Delete all images before deleting the realisation
    await Promise.all(
      realisation.imageUrls.map((imageUrl) => this.deleteImage(imageUrl))
    );

    const result = await this.realisationModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(
        `Réalisation avec ID ${id} non trouvée lors de la suppression`
      );
    }

    return { message: `Réalisation avec ID ${id} supprimée avec succès` };
  }
}
