import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  public static async deleteImage(imageUrl: string): Promise<void> {
    const filePath = join(
      __dirname,
      '..',
      '..',
      'public',
      'uploads',
      imageUrl.split(`${process.env.API_URL}`)[1]
    ); // Complete path of the image

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
}
