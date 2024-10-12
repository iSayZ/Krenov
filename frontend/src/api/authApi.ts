import axiosInstance from '@/lib/axiosInstance';

// Function to login
const login = async (formData: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await axiosInstance.post('/auth/login', formData);
    console.log('login', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    throw error;
  }
};

// Function to verify access, use header authorization to use middleware
const verifyAccess = async (token: string): Promise<any> => {
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

export { login, verifyAccess };
