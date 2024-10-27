import axiosInstance from '@/lib/axiosInstance';
import { AdminProfile, AdminSettings } from '@/types/admin.interface';

// Function to fetch an user profile
const fetchAdminProfile = async (): Promise<AdminProfile> => {
  try {
    const response = await axiosInstance.get(`/admin/profile`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du profile.`, error);
    throw error;
  }
};

// Function to fetch an user settings
const fetchAdminSettings = async (): Promise<AdminSettings> => {
  try {
    const response = await axiosInstance.get(`/admin/settings`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du profile.`, error);
    throw error;
  }
};

// Function to update an user profile
const updateAdminProfile = async (
  data: Partial<AdminSettings>
): Promise<AdminSettings> => {
  try {
    const response = await axiosInstance.put(`/admin/profile/update`, data);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du profile.`, error);
    throw error;
  }
};

// Consolidated exports
export { fetchAdminProfile, fetchAdminSettings, updateAdminProfile };
