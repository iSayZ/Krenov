'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import BackupCodeAlert from './BackupCodeAlert'; // Créer un composant alert spécifique si nécessaire

import { ApiError, resetBackupCodes } from '@/api/changeRequestApi';


const BackupCodeRecoveryPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<{ email: string }>({ email: '' });
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [requestSent, setRequestSent] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Gérer les changements dans le champ email
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'email') setErrorMsg('');
  };

  // Vérifier si l'email est valide
  const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Envoyer le formulaire
  const handleSubmit = async () => {
    if (formData.email === '') {
      return setErrorMsg('Le champ email est obligatoire.');
    }
    if (!isValidEmail(formData.email)) {
      return setErrorMsg('Adresse e-mail invalide.');
    }

    try {
      const response = await resetBackupCodes(formData);
      if (response.status === 201) {
        setIsAlertOpen(true);
        setRequestSent(true);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        return setErrorMsg('Adresse e-mail incorrecte.');
      } else {
        console.log('Erreur inconnue:', error);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden p-4">
      <BackupCodeAlert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} />
      <div className="absolute inset-0 w-screen">
        <Image
          src="https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill
          alt="Background image for backup code recovery"
          className="object-cover"
        />
      </div>
      <Card className="relative z-10 w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl">
            Récupérer vos codes de secours
          </CardTitle>
          {!requestSent ? (
            <CardDescription>
              Entrez votre adresse email pour recevoir un lien afin de récupérer
              vos codes de secours.
            </CardDescription>
          ) : (
            <CardDescription>
              Un email avec les instructions pour récupérer vos codes de secours
              a été envoyé. Veuillez vérifier votre boîte de réception.
            </CardDescription>
          )}
        </CardHeader>
        {!requestSent ? (
          <>
            <CardContent className="flex flex-col gap-4">
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Entrez votre email"
                      value={formData.email}
                      onChange={handleChange}
                      className={
                        errorMsg ? 'outline outline-1 outline-red-500' : ''
                      }
                      required
                    />
                    {errorMsg && (
                      <p className="text-sm text-red-500">{errorMsg}</p>
                    )}
                  </div>
                </div>
              </form>
              <p
                className="text-foreground mt-2 cursor-pointer text-sm hover:underline"
                onClick={() => router.push('/admin/connexion/verification-2fa')}
              >
                Revenir à la page de connexion 2FA
              </p>
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={handleSubmit} className="w-full">
                Récupérer les codes de secours
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardContent className="flex flex-col gap-4">
              <p className="font-semibold">Email envoyé à l'adresse :</p>
              <p className="text-blue-600 underline">{formData.email}</p>
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                onClick={() => router.push('/admin/connexion')}
                className="w-full"
              >
                Retour à la page de connexion
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default BackupCodeRecoveryPage;
