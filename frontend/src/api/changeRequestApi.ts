import { getApiUrl } from "@/lib/api-url";

const API_BASE_URL = getApiUrl();

// Custom Error class to include response status
class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const confirmChangeRequest = async (
  token: string,
  requestType: string,
  newPassword?: string
) => {
  try {
    // Créez l'objet body avec les données nécessaires
    const bodyData = {
      requestType,
      ...(newPassword && { newPassword }), // Ajoute newPassword seulement s'il est défini
    };

    const response = await fetch(
      `${API_BASE_URL}/change-requests/confirm/${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorData = await response.json(); // Récupérer les données d'erreur du backend
      console.error('Erreur lors de la confirmation:', errorData); // Log de l'erreur
      throw new Error(errorData.message || 'Erreur lors de la confirmation');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    throw error;
  }
};

// Function to change the password
const changePassword = async (
  data: Partial<{ currentPassword: string; newPassword: string }>
): Promise<Response> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/change-requests/change-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(
        response.status,
        errorData.message || 'Erreur lors de la mise à jour du mot de passe.'
      );
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to change the password
const changeEmail = async (
  data: Partial<{ currentEmail: string; newEmail: string }>
): Promise<Response> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/change-requests/change-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(
        response.status,
        errorData.message || "Erreur lors de la mise à jour de l'adresse mail."
      );
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to reset password
const resetPassword = async (data: { email: string }): Promise<Response> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/change-requests/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(
        response.status,
        errorData.message ||
          'Erreur lors de la demande de réinitialisation du mot de passe.'
      );
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to reset backup code 2FA
const resetBackupCodes = async (data: { email: string }): Promise<Response> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/change-requests/reset-backup-codes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(
        response.status,
        errorData.message ||
          'Erreur lors de la demande de réinitialisation des codes de secours 2FA.'
      );
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Consolidated exports
export {
  confirmChangeRequest,
  changePassword,
  changeEmail,
  resetPassword,
  resetBackupCodes,
  ApiError,
};
