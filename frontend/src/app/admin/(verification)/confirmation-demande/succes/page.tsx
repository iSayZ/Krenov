'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ConfirmationSuccess: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestType = searchParams.get('type');
  const [isLoading, setIsLoading] = useState(true);

  const [message, setMessage] = useState<string>('');
  const [details, setDetails] = useState<string>('');

  useEffect(() => {
    if (requestType) {
      switch (requestType) {
        case 'changement_mdp':
          setMessage('Votre mot de passe a bien été modifié.');
          setDetails(
            'Vous pouvez désormais vous connecter avec votre nouveau mot de passe.'
          );
          break;
        case 'changement_email':
          setMessage('Votre adresse email a bien été modifiée.');
          setDetails(
            'Veuillez utiliser votre nouvelle adresse email pour vous connecter.'
          );
          break;
        case 'reset_mdp':
          setMessage('Votre mot de passe a bien été réinitialisé.');
          setDetails(
            'Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.'
          );
          break;
        case 'reset_codes_secours':
          setMessage(
            'Les codes de secours ont bien été envoyés à votre adresse email.'
          );
          setDetails(
            'Veuillez suivre les instructions dans le mail pour réactiver votre 2FA et sécuriser votre compte.'
          );
          break;
        default:
          setMessage('Demande inconnue');
          setDetails(
            "Une erreur s'est produite. Veuillez contacter le support."
          );
      }
      setIsLoading(false);
    }
  }, [requestType]);

  const handleGoToDashboard = () => {
    router.push('/admin/connexion');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 max-md:px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Confirmation de la Demande</CardTitle>
          <div className="text-md">
            {isLoading ? (
              <div
                className="m-auto inline-block size-12 animate-spin rounded-full border-[3px] border-current border-t-transparent text-foreground"
                role="status"
                aria-label="loading"
              />
            ) : (
              <>
                <p>{message}</p>
                <br />
                <p>{details}</p>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="text-md">
          <Button onClick={handleGoToDashboard} className="mt-4 w-full">
            Retour vers le dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmationSuccess;
