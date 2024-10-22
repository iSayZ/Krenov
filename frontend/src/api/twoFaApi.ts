import axiosInstance from '@/lib/axiosInstance';

// Function to initialize 2FA
const init2FA = async (): Promise<string> => {
  try {
    const response = await axiosInstance.post('/2fa/setup/init');
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'activation 2FA :", error);
    throw error;
  }
};

// Function to verify 2FA code
const verifyInitCode2FA = async (code2FA: string): Promise<string[]> => {
  try {
    const response = await axiosInstance.post('/2fa/setup/validate', {
      code: code2FA,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la validation 2FA :', error);
    throw error;
  }
};

// Function to disabled 2FA
const disable2FA = async (): Promise<number> => {
  try {
    const response = await axiosInstance.post('/2fa/disable', {});
    return response.status;
  } catch (error) {
    console.error('Erreur lors de la désactivation 2FA :', error);
    throw error;
  }
};

// Function to generate new backup codes 2FA
const generateBackupCodes2FA = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get('/2fa/backup/generate');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la génération des backup codes 2FA :', error);
    throw error;
  }
};

export { init2FA, verifyInitCode2FA, disable2FA, generateBackupCodes2FA };
