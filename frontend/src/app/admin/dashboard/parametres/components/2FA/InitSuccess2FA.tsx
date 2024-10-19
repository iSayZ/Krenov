import { Button } from '@/components/ui/button';
import {
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Check, Copy, Download, Printer } from 'lucide-react';
import { toast } from 'sonner';

interface InitSuccess2FAProps {
    backupCodes: string[];
    onUpdate: () => void;
}

const InitSuccess2FA: React.FC<InitSuccess2FAProps> = ({ backupCodes, onUpdate }) => {
    // Function to download backup codes
    const downloadBackupCodes = (codes: string[]): void => {
        // Create a title for the downloaded file
        const title = "Vos codes de secours\n\n"; // Title with two new lines for spacing
    
        // Convert the codes into a text format
        const textToDownload = title + codes.join('\n'); // Each code on a new line
    
        // Create a blob from the text
        const blob = new Blob([textToDownload], { type: 'text/plain' });
    
        // Create a link for the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'codes_de_secours.txt'; // Name of the file to download
        document.body.appendChild(a); // Append the link to the document
        a.click(); // Simulate a click to start the download
        a.remove(); // Remove the link from the document
        window.URL.revokeObjectURL(url); // Free up memory
    };
    
    // Function to copy backup codes
    const copyBackupCodes = (elementId: string): void => {
        const element = document.getElementById(elementId);
    
        if (!element) {
            console.error(`Element with id "${elementId}" not found.`);
            return;
        }
    
        const textToCopy = element.innerText; // Get text without html
        
        // Use API clipboard to copy
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                toast.success('Codes de secours copiés dans le presse-papiers.');
            })
            .catch((err) => {
                toast.error('Impossible de copier les codes.');
            });
    };

    // Function to print backup codes
    const printBackupCodes = (elementId: string) => (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    
        const element = document.getElementById(elementId);
    
        if (!element) {
            console.error(`Element with id "${elementId}" not found.`);
            return;
        }
    
        // Open new window to print
        const printWindow = window.open('', '', 'height=600,width=800');
    
        if (printWindow) {
            printWindow.document.write('<html><head><title>Codes de secours</title>');
            printWindow.document.write('</head><body>');
            printWindow.document.write('<h1>Vos codes de secours</h1>');
            printWindow.document.write('<div style="font-family: Arial, sans-serif; font-size: 16px;">');
            printWindow.document.write(element.innerHTML);
            printWindow.document.write('</div></body></html>');
            printWindow.document.close(); 
            printWindow.print();
        }
    };
    
    return (
        <>
                <DialogContent
                    className="max-w-xl max-h-screen overflow-auto space-y-4"
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle className='w-full flex items-center gap-4 text-xl'>
                            <span className='flex-none bg-lime-500 size-10 rounded-full flex justify-center items-center'>
                                <Check className='size-8 text-secondary' />
                            </span>
                            Authentification à Deux Facteurs Activée
                        </DialogTitle>
                    </DialogHeader>
                    <div className='space-y-8'>
                        <div className='space-y-4'>
                            <p className='font-semibold text-lg'>Code de secours</p>
                            <p className='text-sm'>
                                En cas de perte de votre appareil ou d'accès à votre application d'authentification, vous pouvez utiliser l'un de vos <span className='font-semibold'>codes de secours</span> pour vous connecter à votre compte en toute sécurité. Chaque code ne peut être utilisé <span className='font-semibold'>qu'une seule fois</span>.
                            </p>
                        </div>
                        <div className='w-full flex justify-center'>
                            <div className='bg-muted-foreground/20 w-max rounded-sm shadow-sm border border-muted-foreground/20'>
                                <div id='backup-codes' className="grid grid-cols-5 gap-4 p-4">
                                    {backupCodes.map((code, index) => (
                                        <p key={index} className="text-center text-sm p-2 font-medium">
                                            {code}
                                        </p>
                                    ))}
                                </div>
                                <div className='grid grid-cols-3 bg-muted-foreground/10 overflow-hidden shadow-sm border-t-[1px] border-muted-foreground/20 cursor-pointer'>
                                    <Button onClick={() => downloadBackupCodes(backupCodes)} variant='ghost' className='rounded-none'>
                                        <Download className='size-5' />
                                    </Button>
                                    <Button onClick={printBackupCodes('backup-codes')} variant='ghost' className='rounded-none border-x-[1px] border-muted-foreground/20'>
                                        <Printer className='size-5' />
                                    </Button>
                                    <Button onClick={() => copyBackupCodes('backup-codes')} variant='ghost' className='rounded-none'>
                                        <Copy className='size-5' />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <p className='font-semibold text-lg'>Conservez-les en lieu sûr</p>
                            <p className='text-sm'>
                                Nous vous recommandons fortement de sauvegarder ces codes dans un endroit sécurisé, comme un gestionnaire de mots de passe, ou de les imprimer et les garder en lieu sûr.
                            </p>
                        </div>
                        <div className='flex justify-end'>
                            <DialogClose asChild>
                                <Button onClick={onUpdate} className='w-36'>
                                    Continuer
                                </Button>
                            </DialogClose>                            
                        </div>
                    </div>
                </DialogContent>
        </>
    );
};

export default InitSuccess2FA;
