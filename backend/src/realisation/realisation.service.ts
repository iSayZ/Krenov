import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { promises as fs } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';
import { Realisation, RealisationDocument } from './schema/realisation.schema';

@Injectable()
export class RealisationService {
  constructor(
    @InjectModel(Realisation.name)
    private realisationModel: Model<RealisationDocument>
  ) {}

  // Function to delete an image
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

  // Function to move a file to a new destination
  private async moveFile(source, destination) {
    try {
      // Get complete path of file
      const sourcePath = join(
        __dirname,
        '..',
        '..',
        'public',
        'uploads',
        source
      );
      const destinationPath = join(
        __dirname,
        '..',
        '..',
        'public',
        'uploads',
        destination
      );

      // Check if the folder exist, else create this
      const destinationDir = destinationPath.substring(
        0,
        destinationPath.lastIndexOf('/')
      );
      await fs.mkdir(destinationDir, { recursive: true });

      await fs.copyFile(sourcePath, destinationPath); // Copy file to the new destination
      await fs.unlink(sourcePath); // Delete old file
      console.log(`Fichier déplacé de ${sourcePath} vers ${destinationPath}`);
      return true;
    } catch (error) {
      console.error('Erreur lors du déplacement du fichier:', error);
      return false;
    }
  }

  // Function to delete a folder
  private async deleteFolder(slug: string): Promise<void> {
    const folderPath = join(
      __dirname,
      '..',
      '..',
      'public',
      'uploads',
      'realisations',
      slug
    );
    try {
      await fs.rm(folderPath, { recursive: true, force: true });
      console.log(`Dossier supprimé : ${folderPath}`);
    } catch (error) {
      console.error(
        `Erreur lors de la suppression du dossier ${folderPath}:`,
        error
      );
    }
  }

  // Function to fix all order when add an new "active" article
  private async addArticleToActiveOrder() {
    // Get all realisations
    const realisations = await this.realisationModel
      .find({ status: 'active' })
      .exec();

    // Increment order by 1
    realisations.forEach((realisation) => {
      const newOrder = realisation.order + 1;
      realisation.updateOne({ order: newOrder }).exec();
    });
  }

  // Function to fix all order when remove an "active" article
  private async removeArticleFromActiveOrder(order: Realisation['order']) {
    // Get all realisations
    const realisations = await this.realisationModel
      .find({ status: 'active' })
      .exec();
    // Filter all actives realisations where ordre is > at the current order
    const activeRealisations = realisations.filter(
      (realisation) => realisation.order > order
    );

    // Decrement all realisations by 1
    activeRealisations.forEach((realisation) => {
      const newOrder = realisation.order - 1;
      realisation.updateOne({ order: newOrder }).exec();
    });
  }

  // Function to synchronize all path of the content to the new slug
  private async syncImageContentPathsWithSlug(
    realisation: CreateRealisationDto | UpdateRealisationDto
  ): Promise<Realisation['content']> {
    const totalUrls = realisation.imageUrls.length; // Total d'URLs à traiter

    for (let index = 0; index < totalUrls; index++) {
      const url = realisation.imageUrls[index];
      // Split src
      const segments = url.split('/');
      // Get slug
      const slug = segments[2];
      // Get file
      const file = segments[3];

      // If the current slug of article is not the same of the src :
      // - Move the file in the good directory
      // - Change the content by the new src
      if (slug !== realisation.slug) {
        const destination = `/realisations/${realisation.slug}/${file}`;
        const moving = await this.moveFile(url, destination);

        if (moving) {
          // Change slug in content only on the last URL
          if (index === totalUrls - 1) {
            const contentWithNewSrc = realisation.content.replaceAll(
              `realisations/${slug}/`,
              `realisations/${realisation.slug}/`
            );
            realisation.content = contentWithNewSrc;
          }
        }
      }
    }

    return realisation.content;
  }

  // Function to create an article
  async create(createRealisationDto: CreateRealisationDto) {
    // If the slug already exist, add a number in the end
    let uniqueSlug = createRealisationDto.slug;
    let counter = 1;

    while (await this.realisationModel.findOne({ slug: uniqueSlug }).exec()) {
      uniqueSlug = `${createRealisationDto.slug}-${counter}`;
      counter++;
    }

    createRealisationDto.slug = uniqueSlug;

    // If the state of the realization is active, increment the order of all active realisations by 1,
    // to bring the new realization to the foreground.
    if (createRealisationDto.status === 'active') {
      this.addArticleToActiveOrder();
      createRealisationDto.order = 1;
    } else {
      createRealisationDto.order = 0;
    }

    // Synchronize the path of content images with the correct slug
    const newContent =
      await this.syncImageContentPathsWithSlug(createRealisationDto);
    createRealisationDto.content = newContent;

    try {
      const createdRealisation = new this.realisationModel(
        createRealisationDto
      );
      createdRealisation.save();
    } catch {
      throw new Error(
        `Erreur lors de la création de la réalisation ${uniqueSlug}`
      );
    }
  }

  // Return all realisations
  async findAll(): Promise<Realisation[]> {
    return this.realisationModel.find().sort({ updated_at: 'desc' }).exec();
  }

  // Return all "active" realisations
  async findAllActive(): Promise<Realisation[]> {
    return this.realisationModel
      .find({ status: 'active' })
      .sort({ order: 'asc' })
      .exec();
  }

  // Return all slugs of all realisations
  async findAllSlugs(): Promise<string[]> {
    const realisations = await this.realisationModel.find().exec();
    const slugs = realisations.map((realisation) => {
      return realisation.slug;
    });
    return slugs;
  }

  // Return the realisation by slug
  async findOne(slug: string): Promise<Partial<Realisation> | null> {
    const realisation = await this.realisationModel
      .findOne({ slug })
      .lean()
      .exec();

    if (!realisation) {
      throw new NotFoundException(`Realisation with slug "${slug}" not found`);
    }

    // Destructure object for match to dto in backend on update
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, created_at, updated_at, ...newRealisation } = realisation;

    return newRealisation;
  }

  // Return the realisation "active" by slug
  async findOneActive(slug: string): Promise<Partial<Realisation> | null> {
    const realisation = await this.realisationModel
      .findOne({ slug, status: 'active' })
      .lean()
      .exec();

    if (!realisation) {
      throw new NotFoundException(`Realisation with slug "${slug}" not found`);
    }

    // Destructure object for match to dto in backend on update
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, created_at, updated_at, ...newRealisation } = realisation;

    return newRealisation;
  }

  // Function to update an article
  async updateRealisation(
    slug: string,
    updateRealisationDto: UpdateRealisationDto
  ) {
    // Get the realisation to update
    const realisation = await this.realisationModel.findOne({ slug }).exec();

    if (!realisation) {
      throw new NotFoundException(
        `Réalisation avec le slug ${slug} non trouvée`
      );
    }

    // If the slug has changed
    if (
      updateRealisationDto.slug &&
      updateRealisationDto.slug !== realisation.slug
    ) {
      // If the slug already exist, add a number in the end
      let uniqueSlug = updateRealisationDto.slug;
      let counter = 1;

      while (await this.realisationModel.findOne({ slug: uniqueSlug }).exec()) {
        uniqueSlug = `${updateRealisationDto.slug}-${counter}`;
        counter++;
      }

      updateRealisationDto.slug = uniqueSlug;

      // If the header has changed :
      // - Move file, and replace src of header value
      if (
        updateRealisationDto.header &&
        updateRealisationDto.header === realisation.header
      ) {
        const oldPath = realisation.header.split(`${process.env.API_URL}/`)[1];
        const newPath = oldPath.replace(
          realisation.slug,
          updateRealisationDto.slug
        );

        const movingHeader = await this.moveFile(oldPath, newPath);

        if (movingHeader) {
          updateRealisationDto.header = realisation.header.replace(
            realisation.slug,
            updateRealisationDto.slug
          );
        }
      }

      // Synchronize the path of content images with the correct slug
      const newContent =
        await this.syncImageContentPathsWithSlug(updateRealisationDto);
      updateRealisationDto.content = newContent;
    }

    if (
      updateRealisationDto.status &&
      updateRealisationDto.status !== realisation.status
    ) {
      // If the state of the realization is active, increment the order of all active realisations by 1,
      // to bring the new realization to the foreground.
      if (updateRealisationDto.status === 'active') {
        await this.addArticleToActiveOrder();
        updateRealisationDto.order = 1;
      } else {
        await this.removeArticleFromActiveOrder(realisation.order);
        updateRealisationDto.order = 0;
      }
    }

    const updatedRealisation = await this.realisationModel
      .findOneAndUpdate({ slug }, updateRealisationDto, { new: true })
      .exec();

    if (!updatedRealisation) {
      throw new Error(`Réalisation avec le slug ${slug} non trouvée`);
    }
  }

  // Function to change the order of all active realisations
  async changeOrderRealisation(
    orderRealisationArray: Pick<Realisation, 'slug' | 'order'>[]
  ): Promise<void> {
    try {
      for (const realisation of orderRealisationArray) {
        await this.realisationModel
          .findOneAndUpdate(
            { slug: realisation.slug },
            { order: realisation.order }
          )
          .exec();
      }
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour des ordres : ${error}`);
    }
  }

  // Function to delete an article
  async deleteRealisation(id: string): Promise<{ message: string }> {
    // Get the realisation to delete
    const realisation = await this.realisationModel.findById(id).exec();

    if (!realisation) {
      throw new NotFoundException(`Réalisation avec ID ${id} non trouvée`);
    }

    await this.deleteFolder(realisation.slug);

    const result = await this.realisationModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(
        `Réalisation avec ID ${id} non trouvée lors de la suppression`
      );
    }

    return { message: `Réalisation avec ID ${id} supprimée avec succès` };
  }
}
