import axiosInstance from '@/lib/axiosInstance';
import { Realisation } from '@/types/realisation.interface';

// Function to fetch all realisations
const fetchAllRealisations = async (): Promise<Realisation[]> => {
  try {
    const response = await axiosInstance.get('/realisations');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des réalisations:', error);
    throw error;
  }
};

// Function to fetch all "active" realisations
const fetchAllActiveRealisations = async (): Promise<Realisation[]> => {
  try {
    const response = await axiosInstance.get('/realisations/active');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des réalisations:', error);
    throw error;
  }
};

// Function to fetch a realisation by its slug
const fetchRealisationBySlug = async (
  slug: string
): Promise<
  Pick<Realisation, 'title' | 'slug' | 'tags' | 'status' | 'header' | 'content'>
> => {
  try {
    const response = await axiosInstance.get(`/realisations/${slug}`);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la réalisation avec slug ${slug}:`,
      error
    );
    throw error;
  }
};

// Function to fetch a realisation by its slug
const fetchActiveRealisationBySlug = async (
  slug: string
): Promise<
  Pick<Realisation, 'title' | 'slug' | 'tags' | 'status' | 'header' | 'content'>
> => {
  try {
    const response = await axiosInstance.get(`/realisations/active/${slug}`);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la réalisation avec slug ${slug}:`,
      error
    );
    throw error;
  }
};

// Function to create a realisation
const createRealisation = async (
  data: Partial<Realisation>
): Promise<{ success: boolean }> => {
  try {
    const response = await axiosInstance.post(`/realisations`, data);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la création de la réalisation :`, error);
    throw error;
  }
};

// Function to update a realisation
const updateRealisation = async (
  slug: Realisation['slug'],
  data: Partial<Realisation>
): Promise<{ success: boolean }> => {
  try {
    const response = await axiosInstance.put(`/realisations/${slug}`, data);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la réalisation :`, error);
    throw error;
  }
};

// Function to change the order of all active realisations
const updateOrderRealisation = async (
  orderRealisationArray: Pick<Realisation, 'slug' | 'order'>[]
): Promise<{ success: boolean }> => {
  try {
    const response = await axiosInstance.post(
      `/realisations/order`,
      orderRealisationArray
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour des ordres des réalisations :`,
      error
    );
    throw error;
  }
};

// Function to delete a realisation by its ID
const deleteRealisation = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/realisations/${id}`);
  } catch (error) {
    console.error(
      `Erreur lors de la suppression de la réalisation avec ID ${id}:`,
      error
    );
    throw error;
  }
};

// Consolidated exports
export {
  fetchAllRealisations,
  fetchAllActiveRealisations,
  fetchRealisationBySlug,
  fetchActiveRealisationBySlug,
  createRealisation,
  updateRealisation,
  updateOrderRealisation,
  deleteRealisation,
};
