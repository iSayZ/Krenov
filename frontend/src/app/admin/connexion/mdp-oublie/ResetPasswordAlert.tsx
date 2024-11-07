import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface ResetPasswordAlertProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ResetPasswordAlert: React.FC<ResetPasswordAlertProps> = ({
  isOpen,
  setIsOpen,
}) => {
  // Function to close the alert
  const closeAlert = () => setIsOpen(false);

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Réinitialisation de mot de passe
            </AlertDialogTitle>
            <AlertDialogDescription>
              Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse. 
              Veuillez vérifier votre boîte de réception et suivre les instructions pour réinitialiser votre mot de passe.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeAlert}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ResetPasswordAlert;
