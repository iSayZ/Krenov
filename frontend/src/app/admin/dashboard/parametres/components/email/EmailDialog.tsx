import { Lock } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import Verify2FAModal from '../../../components/Verify2FAModal';

import EmailChangeAlert from './EmailChangeAlert';

import { ApiError, changeEmail } from '@/api/changeRequestApi';
import { use2FACheck } from '@/hooks/2FA/use2FACheck';

interface EmailForm {
  currentEmail: string;
  newEmail: string;
  confirmationEmail: string;
}

const EmailDialog: React.FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const {
    is2FAModalOpen,
    setIs2FAModalOpen,
    check2FABeforeAction,
    handle2FASuccess,
    currentActionName,
    is2FAEnabled,
    verifyCode,
  } = use2FACheck();

  const [emailForm, setEmailForm] = useState<EmailForm>({
    currentEmail: '',
    newEmail: '',
    confirmationEmail: '',
  });

  const [errorMsg, setErrorMsg] = useState<{
    currentEmail: string;
    newEmail: string;
  }>({
    currentEmail: '',
    newEmail: '',
  });

  const handleChangeEmailForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setEmailForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (id === 'currentEmail') {
      setErrorMsg((prevError) => ({
        ...prevError,
        currentEmail: '',
      }));
    } else {
      setErrorMsg((prevError) => ({
        ...prevError,
        newEmail: '',
      }));
    }
  };

  // To check if it's a valid e-mail adress
  const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // To open alert on submit success
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // To submit
  const handleSubmit = async () => {
    // Reset all errors
    setErrorMsg({
      currentEmail: '',
      newEmail: '',
    });

    if (!emailForm.currentEmail) {
      return setErrorMsg((prevError) => ({
        ...prevError,
        currentEmail: 'Veuillez remplir tous les champs.',
      }));
    }

    if (!emailForm.newEmail || !emailForm.confirmationEmail) {
      return setErrorMsg((prevError) => ({
        ...prevError,
        newEmail: 'Veuillez remplir tous les champs.',
      }));
    }

    const checkCurrentEmail = isValidEmail(emailForm.currentEmail);

    if (!checkCurrentEmail) {
      return setErrorMsg((prevError) => ({
        ...prevError,
        currentEmail: 'Adresse e-mail invalide.',
      }));
    }

    const checkNewEmail = isValidEmail(emailForm.newEmail);

    if (!checkNewEmail) {
      return setErrorMsg((prevError) => ({
        ...prevError,
        newEmail: 'Adresse e-mail invalide.',
      }));
    }

    if (emailForm.newEmail !== emailForm.confirmationEmail) {
      return setErrorMsg((prevError) => ({
        ...prevError,
        newEmail: 'Les adresses ne correspondent pas.',
      }));
    }

    const data = {
      currentEmail: emailForm.currentEmail,
      newEmail: emailForm.newEmail,
    };

    try {
      const response = await changeEmail(data);
      if (response.status === 201) {
        setShowDialog(false);
        setIsAlertOpen(true);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          return setErrorMsg((prevError) => ({
            ...prevError,
            currentEmail: "L'adresse mail est incorrecte.",
          }));
        } else {
          console.log('Erreur:', error.message);
        }
      } else {
        console.log('Erreur inconnue:', error);
      }
    }
  };

  return (
    <>
      <EmailChangeAlert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} />
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <Button
          variant="outline"
          onClick={() =>
            check2FABeforeAction(
              () => setShowDialog(true),
              "Modification de l'adresse mail"
            )
          }
        >
          Modifier mon adresse mail
          <Lock className="ml-3 size-5" />
        </Button>
        <DialogContent
          className="max-w-sm"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Editer mon adresse mail</DialogTitle>
            <DialogDescription>
              Cliquez sur Enregistrer lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <Label htmlFor="currentEmail">Ancienne adresse mail</Label>
              <Input
                id="currentEmail"
                type="email"
                value={emailForm.currentEmail}
                onChange={handleChangeEmailForm}
                className={
                  errorMsg.currentEmail
                    ? 'outline outline-1 outline-red-500'
                    : ''
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="newEmail">Nouvelle adresse mail</Label>
              <Input
                id="newEmail"
                type="email"
                value={emailForm.newEmail}
                onChange={handleChangeEmailForm}
                className={
                  errorMsg.newEmail
                    ? 'outline outline-1 outline-red-500'
                    : ''
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmationEmail">Confirmation</Label>
              <Input
                id="confirmationEmail"
                type="email"
                value={emailForm.confirmationEmail}
                onChange={handleChangeEmailForm}
                className={
                  errorMsg.newEmail
                    ? 'outline outline-1 outline-red-500'
                    : ''
                }
              />
            </div>
            {(errorMsg.currentEmail || errorMsg.newEmail) && (
              <p className="text-sm text-red-600">
                {errorMsg.currentEmail || errorMsg.newEmail}
              </p>
            )}
            <Button
              className="ml-auto mt-2 w-1/2 max-sm:m-auto"
              onClick={handleSubmit}
            >
              Enregistrer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
};

export default EmailDialog;
