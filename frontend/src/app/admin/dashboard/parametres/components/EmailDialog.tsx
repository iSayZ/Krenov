import { Mail } from 'lucide-react';

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

const EmailDialog: React.FC = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button variant='outline'>
                Modifier mon adresse mail
                <Mail className='ml-3 size-5 text-foreground'/>
            </Button>
            </DialogTrigger>
            <DialogContent className='max-w-sm' onInteractOutside={(e) => { e.preventDefault(); }}>
            <DialogHeader>
                <DialogTitle>Editer mon adresse mail</DialogTitle>
                <DialogDescription>
                Cliquez sur Enregistrer lorsque vous avez terminé.
                </DialogDescription>
            </DialogHeader>
                <div className='flex flex-col gap-4'>
                    <div className="space-y-1">
                    <Label htmlFor="current">Ancienne adresse mail</Label>
                    <Input id="current" type="email" className='text-foreground'/>
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="new">Nouvelle adresse mail</Label>
                    <Input id="new" type="email" className='text-foreground'/>
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="new">Confirmation</Label>
                    <Input id="new" type="email" className='text-foreground'/>
                    </div>
                    <Button className='mt-2 w-1/2'>Enregistrer</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EmailDialog;