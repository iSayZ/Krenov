import { Lock } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const PasswordDialog: React.FC = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button variant='outline'>
                Modifier mon mot de passe
                <Lock className='ml-3 size-5'/>
            </Button>
            </DialogTrigger>
            <DialogContent className='max-w-sm' onInteractOutside={(e) => { e.preventDefault(); }}>
            <DialogHeader>
                <DialogTitle>Editer mon mot de passe</DialogTitle>
                <DialogDescription>
                Cliquez sur Enregistrer lorsque vous avez terminé.
                </DialogDescription>
            </DialogHeader>
                <div className='flex flex-col gap-4'>
                    <div className="space-y-1">
                    <Label htmlFor="current">Ancien mot de passe</Label>
                    <Input id="current" type="password" className='text-foreground'/>
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="new">Nouveau mot de passe</Label>
                    <Input id="new" type="password" className='text-foreground'/>
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="new">Confirmation</Label>
                    <Input id="new" type="password" className='text-foreground'/>
                    </div>
                    <Button className='mt-2 w-1/2'>Enregistrer</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PasswordDialog;