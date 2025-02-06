'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import useSWR from 'swr';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { confirmChangeRequest } from '@/api/changeRequestApi';
import { fetcher } from '@/lib/fetcher';

const ConfirmChangeRequest: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('code_confirmation');
  const { data, error } = useSWR(
    token ? `/change-requests/verify/${token}` : null,
    fetcher
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data || error) {
      setIsLoading(false);
    }
  }, [data, error]);

  const handleConfirm = async () => {
    if (!token) {
      return;
    }
    try {
      const result = await confirmChangeRequest(token, data.requestType);
      router.push(result.redirectUrl); // Redirect to the specify URL of the request type
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la confirmation :",
        error
      );
    }
  };

  const getMessage = () => {
    switch (data?.requestType) {
      case 'change_email':
        return (
          <>
            <p>
              Votre demande de changement d'adresse mail a été validée. Veuillez
              confirmer pour appliquer le changement.
            </p>
            <br />
            <p className="font-semibold">Nouvelle adresse mail :</p>
            <p>{data?.newValue}</p>
          </>
        );
      case 'change_password':
        return (
          <p>
            Votre demande de changement de mot de passe a été validée. Veuillez
            confirmer pour appliquer le changement.
          </p>
        );
      case 'reset_backup_codes':
        return (
          <p>
            Votre demande de réinitialisation des codes 2FA a été validée.
            Veuillez confirmer pour appliquer la réinitialisation.
          </p>
        );
      default:
        return (
          <p>
            Demande inconnue. Veuillez vérifier votre lien ou contacter le
            support.
          </p>
        );
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="flex h-screen items-center justify-center bg-gray-100 max-md:px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-lg">
              Confirmation de la Demande
            </CardTitle>
            <div className="text-md">{getMessage()}</div>
          </CardHeader>
          <CardContent className="text-md">
            {isLoading ? (
              <div
                className="m-auto inline-block size-12 animate-spin rounded-full border-[3px] border-current border-t-transparent text-foreground"
                role="status"
                aria-label="loading"
              />
            ) : error ? (
              <p className="font-bold text-red-500">
                Token invalide ou expiré.
              </p>
            ) : (
              <Button onClick={handleConfirm} className="mt-4 w-full">
                Confirmer la Demande
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
};

export default ConfirmChangeRequest;
