import axiosInstance from '@/lib/axiosInstance';
import { AdminProfile, AdminSettings } from '@/types/admin.interface';

// Function to fetch an user profile
const fetchAdminProfile = async (): Promise<AdminProfile> => {
  try {
    const response = await axiosInstance.get(`/admin/profile`);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du profile.`,
      error
    );
    throw error;
  }
};

// Function to fetch an user settings
const fetchAdminSettings = async (): Promise<AdminSettings> => {
    try {
      const response = await axiosInstance.get(`/admin/settings`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du profile.`,
        error
      );
      throw error;
    }
};

// Function to update an user profile
const updateAdminProfile = async (data: Partial<AdminSettings>): Promise<AdminSettings> => {
    try {
      const response = await axiosInstance.put(`/admin/profile/update`, data);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour du profile.`,
        error
      );
      throw error;
    }
};

// Function to upload an avatar
const uploadAvatar = async (image: FormData): Promise<AdminProfile['avatar']> => {
    try {
        const avatar = await axiosInstance.post(`/upload/avatar`, image);
        return avatar.data;
      } catch (error) {
        console.error(
          `Erreur lors d'upload de l'avatar.`,
          error
        );
        throw error;
      }
};

// Consolidated exports
export {
  fetchAdminProfile,
  fetchAdminSettings,
  updateAdminProfile,
  uploadAvatar
};
