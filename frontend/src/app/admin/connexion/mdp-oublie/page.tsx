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

import { ApiError, resetPassword } from '@/api/changeRequestApi';

import ResetPasswordAlert from './ResetPasswordAlert';

const LostPasswordPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<{ email: string }>({ email: '' });

  const [errorMsg, setErrorMsg] = useState<string>('');

  const [demandWasSent, setDemandWasSent] = useState<boolean>(false);

  // Handle changes in the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset error messages when the user starts typing
    if (name === 'email') {
      setErrorMsg('');
    }
  };

  // To check if it's a valid e-mail adress
  const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // To open alert on submit success
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Submit the form
  const handleSubmit = async () => {
    if (formData.email === '') {
      return setErrorMsg('Le champ email est obligatoire.');
    }

    const checkCurrentEmail = isValidEmail(formData.email);

    if (!checkCurrentEmail) {
      return setErrorMsg('Adresse e-mail invalide.');
    }

    try {
      const response = await resetPassword(formData);
      if (response.status === 201) {
        setIsAlertOpen(true);
        setDemandWasSent(true);
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
      <ResetPasswordAlert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} />
      <div className="absolute inset-0 w-screen">
        <Image
          src="https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill
          alt="Image"
          className="object-cover"
        />
      </div>
      <Card className="relative z-10 w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl">
            Réinitialiser votre mot de passe
          </CardTitle>
          {!demandWasSent ? (
            <CardDescription>
              Veuillez entrer votre adresse email pour recevoir un lien de
              réinitialisation.
            </CardDescription>
          ) : (
            <CardDescription>
              Un email contenant les instructions pour réinitialiser votre mot de passe vous a été envoyé. Veuillez vérifier votre boîte de réception ainsi que vos spams.
            </CardDescription>  
          )}
        </CardHeader>
        {!demandWasSent ? (
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
                    {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
                  </div>
                </div>
              </form>
              <p
                className="mt-2 cursor-pointer text-sm text-foreground hover:underline"
                onClick={() => router.push('/admin/connexion')}
              >
                Vous avez déjà un compte ? Connectez-vous
              </p>
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={handleSubmit} className="w-full">
                Réinitialiser le mot de passe
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardContent className="flex flex-col gap-4">
              <p className='font-semibold'>Mail envoyé à l'adresse :</p>
              <p className='underline text-blue-600'>{formData.email}</p>
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={() => router.push('/admin/connexion')} className="w-full">
                Retour à la page de connexion
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default LostPasswordPage;
