"use client";

import { use2FACheck } from '@/hooks/2FA/use2FACheck';
import Verify2FAModal from '../components/Verify2FAModal';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axiosInstance';

export default function SensitiveAction() {
  const {
    is2FAModalOpen,
    setIs2FAModalOpen,
    check2FABeforeAction,
    handle2FASuccess,
    currentActionName,
    is2FAEnabled,
    isLoading,
    verifyCode
  } = use2FACheck();

  const handleDeleteAccount = async (): Promise<void> => {
    try {
    //   await axiosInstance.delete('/user/account');
    console.log("DELETE SUCCESS")
      // Gérer le succès
    } catch (error) {
      // Gérer l'erreur
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Button 
        onClick={() => check2FABeforeAction(
          handleDeleteAccount,
          "Suppression de compte"
        )}
        variant="destructive"
      >
        Supprimer le compte {is2FAEnabled ? '(2FA requis)' : ''}
      </Button>

      {is2FAEnabled && (
        <Verify2FAModal
          isOpen={is2FAModalOpen}
          onClose={() => setIs2FAModalOpen(false)}
          onVerify={handle2FASuccess}
          verifyCode={verifyCode}
          action={currentActionName}
        />
      )}
    </>
  );
}