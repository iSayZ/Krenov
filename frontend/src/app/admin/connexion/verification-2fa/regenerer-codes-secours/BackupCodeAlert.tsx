import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface BackupCodeAlertProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const BackupCodeAlert: React.FC<BackupCodeAlertProps> = ({
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
              Récupération de codes de secours
            </AlertDialogTitle>
            <AlertDialogDescription>
              Un e-mail a été envoyé à l'adresse que vous avez fournie. Cet e-mail contient un lien pour régénérer vos codes de secours. 
              Veuillez vérifier votre boîte de réception, ainsi que vos spams, et suivre les instructions pour générer de nouveaux codes.
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

export default BackupCodeAlert;
