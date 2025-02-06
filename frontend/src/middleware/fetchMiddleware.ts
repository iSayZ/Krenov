import { getApiUrl } from '@/lib/api-url';

const API_BASE_URL = getApiUrl();

// Function to verify access, use header authorization to use middleware
const verifyAccess = async (token: string): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-access`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    // Vérifie si la réponse est correcte
    if (!response.ok) {
      throw new Error(`Erreur d'accès : ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Accès non autorisé :', error);
    throw error;
  }
};

// Function to refresh tokens, use header authorization to use middleware
const refreshTokens = async (
  token: string,
  userAgent: string
): Promise<Response> => {
  // Changer `any` en type spécifique si la réponse est connue
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'x-original-user-agent': userAgent,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({}), // Corps vide pour correspondre à la requête originale
    });

    if (!response.ok) {
      throw new Error(
        `Erreur lors du rafraîchissement des tokens : ${response.statusText}`
      );
    }

    return response;
  } catch (error) {
    console.error("Erreur d'accès :", error);
    throw error;
  }
};

export { verifyAccess, refreshTokens };
