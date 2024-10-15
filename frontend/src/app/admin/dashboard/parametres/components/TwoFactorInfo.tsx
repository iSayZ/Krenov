import { Button } from '@/components/ui/button';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
  

const TwoFactorInfo: React.FC = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='outline' className='min-w-44'>
                        Comment ça marche ?
                    </Button>
                </DialogTrigger>
                <DialogContent className='w-auto' onInteractOutside={(e) => { e.preventDefault(); }}>
                <div className='space-y-4'>
                    <DialogHeader className='space-y-4'>
                    <DialogTitle>Pourquoi activer la 2FA ?</DialogTitle>
                    <DialogDescription>
                        <ul className='text-foreground space-y-1 list-disc'>
                            <li className='ml-8'><span className='font-semibold'>Sécurité accrue</span> : Même si quelqu'un obtient votre mot de passe, il ne pourra pas accéder à votre compte sans le code 2FA.</li>
                            <li className='ml-8'><span className='font-semibold'>Simplicité d’utilisation</span> : Après la configuration initiale, vous recevrez un code de vérification chaque fois que vous vous connecterez à partir d'un nouvel appareil.</li>
                            <li className='ml-8'><span className='font-semibold'>Protection contre les cyberattaques</span> : Le 2FA protège contre le piratage de mot de passe, le phishing, et d'autres types de menaces en ligne.</li>
                        </ul>
                    </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-2'>
                    <h2 className='font-semibold text-lg'>Comment ça marche ?</h2>
                    <ol className='text-sm space-y-1'>
                        <li className='ml-4'><span className='font-semibold'>1. Activez la 2FA</span></li>
                        <li className='ml-4'><span className='font-semibold'>2.</span> Scannez le <span className='font-semibold'>QR code</span> avec une application 2FA (comme Google Authenticator).</li>
                        <li className='ml-4'><span className='font-semibold'>3.</span> Utilisez le code généré pour valider chaque connexion future.</li>
                    </ol>
                    </div>
                    <div className='space-x-4 w-full flex justify-center'>
                        <DialogClose asChild>
                            <Button className='mt-2 w-1/2'>Continuer</Button>
                        </DialogClose>
                    </div>
                </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TwoFactorInfo;