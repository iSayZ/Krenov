'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { confirmChangeRequest } from '@/api/changeRequestApi';
import { fetcher } from '@/lib/fetcher';

const ResetPasswordPage: React.FC = () => {
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
      if (data && data.requestType !== 'reset_password') {
        setErrorMsg((prevError) => ({
          ...prevError,
          other:
            'Type de demande invalide pour la réinitialisation du mot de passe.',
        }));
      }
      setIsLoading(false);
    }
  }, [data, error]);

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState({
    newPassword: '',
    confirmPassword: '',
    other: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset error messages
    if (name === 'newPassword') {
      setErrorMsg((prevError) => ({
        ...prevError,
        newPassword: '',
      }));
    }

    if (name === 'confirmPassword') {
      setErrorMsg((prevError) => ({
        ...prevError,
        confirmPassword: '',
      }));
    }
  };

  const handleSubmit = async () => {
    if (!token) return;

    if (formData.newPassword === '') {
      return setErrorMsg((prev) => ({
        ...prev,
        newPassword: 'Le mot de passe est requis.',
      }));
    }

    if (formData.confirmPassword === '') {
      return setErrorMsg((prev) => ({
        ...prev,
        confirmPassword: 'La confirmation du mot de passe est requise.',
      }));
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return setErrorMsg((prev) => ({
        ...prev,
        confirmPassword: 'Les mots de passe ne correspondent pas.',
      }));
    }

    try {
      const result = await confirmChangeRequest(
        token,
        data.requestType,
        formData.newPassword
      );
      router.push(result.redirectUrl); // Redirect to the specify URL of the request type
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la confirmation :",
        error
      );
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center p-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl">
            Réinitialisation du mot de passe
          </CardTitle>
        </CardHeader>
        {isLoading ? (
          <CardContent className="flex flex-col gap-4">
            <div
              className="m-auto inline-block size-12 animate-spin rounded-full border-[3px] border-current border-t-transparent text-foreground"
              role="status"
              aria-label="loading"
            />
          </CardContent>
        ) : error || errorMsg.other ? (
          <CardContent className="flex flex-col gap-4">
            <p className="text-red-500">Token invalide ou expiré.</p>
          </CardContent>
        ) : (
          <>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  placeholder="Entrez votre nouveau mot de passe"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={
                    errorMsg.newPassword
                      ? 'outline outline-1 outline-red-500'
                      : ''
                  }
                />
                {errorMsg.newPassword && (
                  <p className="text-sm text-red-500">{errorMsg.newPassword}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmez votre mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={
                    errorMsg.confirmPassword
                      ? 'outline outline-1 outline-red-500'
                      : ''
                  }
                />
                {errorMsg.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errorMsg.confirmPassword}
                  </p>
                )}
              </div>
              {errorMsg.other && (
                <p className="text-sm text-red-500">{errorMsg.other}</p>
              )}
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={handleSubmit}>
                Réinitialiser le mot de passe
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
