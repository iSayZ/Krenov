import axiosInstance from '@/lib/axiosInstance';
import { AdminProfile } from '@/types/admin.interface';

// Function to upload an avatar
const uploadAvatar = async (
  image: FormData,
  source: string
): Promise<AdminProfile['avatar']> => {
  try {
    const avatar = await axiosInstance.post(`/upload/avatar/${source}`, image);
    return avatar.data;
  } catch (error) {
    console.error(`Erreur lors d'upload de l'avatar.`, error);
    throw error;
  }
};

// Function to upload an image of a realisation
const uploadRealisationImage = async (
  image: FormData,
  source: string
): Promise<string> => {
  try {
    const avatar = await axiosInstance.post(
      `/upload/realisation/${source}`,
      image
    );
    return avatar.data;
  } catch (error) {
    console.error(`Erreur lors d'upload du header.`, error);
    throw error;
  }
};

// Consolidated exports
export { uploadAvatar, uploadRealisationImage };
