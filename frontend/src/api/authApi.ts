import { AxiosResponse } from 'axios';

import axiosInstance from '@/lib/axiosInstance';

// Function to login
const login = async (formData: {
  email: string;
  password: string;
}): Promise<{ require2FA: boolean; message: string }> => {
  try {
    const response = await axiosInstance.post('/auth/login', formData);

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    throw error;
  }
};

// Function to verify 2FA to complete login
const verify2FALogin = async (
  code2FA: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.post('/auth/verify-2fa', {
      code: code2FA,
    });
    return response.data.success;
  } catch (error) {
    console.error('Erreur lors de la verification 2FA :', error);
    throw error;
  }
};

// Function to logout
const logout = async (): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
    throw error;
  }
};

// Function to verify access, use header authorization to use middleware
const verifyAccess = async (token: string): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.get('/auth/verify-access', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Accès non autorisé :', error);
    throw error;
  }
};

// Function to refresh tokens, use header authorization to use middleware
const refreshTokens = async (
  token: string,
  userAgent: string
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post(
      '/auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-original-user-agent': userAgent,
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Accès non autorisé :', error);
    throw error;
  }
};

// Function to verify identity before action
const verifyIdentity = async (formData: {
  password: string;
}): Promise<number> => {
  try {
    const response = await axiosInstance.post(
      '/auth/verify-identity',
      formData
    );
    return response.status;
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    throw error;
  }
};

export {
  login,
  verify2FALogin,
  logout,
  verifyAccess,
  refreshTokens,
  verifyIdentity,
};
