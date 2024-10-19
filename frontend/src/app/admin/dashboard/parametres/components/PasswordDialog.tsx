import { Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { use2FACheck } from '@/hooks/2FA/use2FACheck';
import { useState } from 'react';
import Verify2FAModal from '../../components/Verify2FAModal';

const PasswordDialog: React.FC = () => {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const {
        is2FAModalOpen,
        setIs2FAModalOpen,
        check2FABeforeAction,
        handle2FASuccess,
        currentActionName,
        is2FAEnabled,
        isLoading,
        verifyCode
      } = use2FACheck();

  return (
      <>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <Button variant="outline" onClick={() => check2FABeforeAction(() => setShowDialog(true), "Modification du mot de passe")}>
            Modifier mon mot de passe
            <Lock className="ml-3 size-5" />
            </Button>
        <DialogContent
            className="max-w-sm"
            onInteractOutside={(e) => {
            e.preventDefault();
            }}
        >
            <DialogHeader>
            <DialogTitle>Editer mon mot de passe</DialogTitle>
            <DialogDescription>
                Cliquez sur Enregistrer lorsque vous avez terminé.
            </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
            <div className="space-y-1">
                <Label htmlFor="current">Ancien mot de passe</Label>
                <Input id="current" type="password" className="text-foreground" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="new">Nouveau mot de passe</Label>
                <Input id="new" type="password" className="text-foreground" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="new">Confirmation</Label>
                <Input id="new" type="password" className="text-foreground" />
            </div>
            <Button className="ml-auto mt-2 w-1/2">Enregistrer</Button>
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

export default PasswordDialog;
