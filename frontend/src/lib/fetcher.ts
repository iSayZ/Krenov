import { getApiUrl } from './api-url';

const API_BASE_URL = getApiUrl();

export const fetcher = (endpoint: string) => {
  const url = `${API_BASE_URL}${endpoint}`;

  return fetch(url, {
    credentials: 'include',
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    return res.json();
  });
};