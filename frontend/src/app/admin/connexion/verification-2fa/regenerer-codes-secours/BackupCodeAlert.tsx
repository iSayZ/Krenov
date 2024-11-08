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
              Un e-mail contenant vos codes de secours a été envoyé à l'adresse que vous avez fournie. 
              Veuillez vérifier votre boîte de réception, y compris vos spams, et suivre les instructions pour récupérer vos codes.
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
