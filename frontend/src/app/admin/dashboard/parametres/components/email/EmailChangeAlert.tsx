import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface EmailChangeAlertProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const EmailChangeAlert: React.FC<EmailChangeAlertProps> = ({
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
              Demande de changement d'adresse mail
            </AlertDialogTitle>
            <AlertDialogDescription>
              Votre demande de changement d'adresse mail a bien été prise en
              compte. Un email a été envoyé à votre adresse pour confirmation.
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

export default EmailChangeAlert;
