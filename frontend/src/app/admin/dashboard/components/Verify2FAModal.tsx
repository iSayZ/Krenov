"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';

interface Verify2FAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  verifyCode: (code: string) => Promise<boolean>;
  action?: string;
}

const Verify2FAModal: React.FC<Verify2FAModalProps> = ({ 
  isOpen, 
  onClose, 
  onVerify, 
  verifyCode, 
  action 
}) => {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerify = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      
      const isValid = await verifyCode(code);

      setCode('');

      if (!isValid) {
        throw new Error('Code invalide');
      }

      onVerify();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Code incorrect. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-min">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="size-5" />
            Vérification 2FA requise
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            {action ? `L'action "${action}" nécessite` : 'Cette action nécessite'} une 
            vérification supplémentaire. Veuillez entrer le code généré par votre 
            application d'authentification.
          </p>
          
          <InputOTP value={code} onChange={(code) => setCode(code)} maxLength={6}>
              <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
              </InputOTPGroup>
          </InputOTP>
          
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className='w-full flex justify-center gap-4 mt-2'>
          <Button
            className='w-1/2'
            variant="outline"
            onClick={onClose}
            disabled={loading}
            type="button"
          >
            Annuler
          </Button>
          <Button
            className='w-1/2'
            onClick={handleVerify}
            disabled={code.length !== 6 || loading}
            type="submit"
          >
            {loading ? 'Vérification...' : 'Vérifier'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Verify2FAModal;