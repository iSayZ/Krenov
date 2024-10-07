import axios from 'axios';

import { Realisation } from '@/types/realisation.interface';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to fetch all realisations
const fetchAllRealisations = async (): Promise<Realisation[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/realisations`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des réalisations:', error);
    throw error;
  }
};

// Function to fetch a realisation by its slug
const fetchRealisationBySlug = async (slug: string): Promise<Realisation> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/realisations/${slug}`);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la réalisation avec slug ${slug}:`,
      error
    );
    throw error;
  }
};

// Function to update a realisation
const updateRealisation = async (
  id: string,
  data: Partial<Realisation>
): Promise<Realisation> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/realisations/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour de la réalisation avec ID ${id}:`,
      error
    );
    throw error;
  }
};

// Function to delete a realisation by its ID
const deleteRealisation = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/realisations/${id}`);
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
  fetchRealisationBySlug,
  updateRealisation,
  deleteRealisation,
};
