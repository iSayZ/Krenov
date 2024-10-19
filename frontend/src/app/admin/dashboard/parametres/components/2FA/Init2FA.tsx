import { useEffect, useState } from 'react';
import { init2FA, verifyInitCode2FA } from '@/api/twoFaApi';
import { Button } from '@/components/ui/button';
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Timer from '@/components/Timer';
import { Info } from 'lucide-react';

interface Init2FAProps {
    showQrCodeDialog: boolean;
    onInitSuccess: Function;
}

const Init2FA: React.FC<Init2FAProps> = ({ showQrCodeDialog, onInitSuccess }) => {
    const [qrCode, setQrCode] = useState<any>();
    const [qrCodeIsExpired, setQrCodeIsExpired] = useState<boolean>(false);
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const [code2FA, setCode2FA] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        if (showQrCodeDialog) {
            loadQrCode();
        }
    }, [showQrCodeDialog]);

    // Call API to generate a QR Code
    const loadQrCode = async () => {
        try {
            const response = await init2FA();
            setQrCode(response);
        } catch (error) {
            console.error('Erreur lors du chargement des réalisations :', error);
        }
    };

    // If timer to QR Code expiration is out
    const handleTimeOut = () => {
        setQrCodeIsExpired(true);
    };

    // To regenerate a new QR Code
    const handleRegenerateQrCode = () => {
        loadQrCode();
        setQrCodeIsExpired(false);
        setRefreshKey((prev) => prev + 1);
    };

    const handleSubmit = async () => {
        setErrorMsg('');
        setCode2FA('');
        try {
            const response = await verifyInitCode2FA(code2FA);
            if (response.status === 201) {
                onInitSuccess(response.data);
            } else {
                setErrorMsg(response.response?.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
                <DialogContent
                    className="max-w-max max-h-screen overflow-auto"
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader className="space-y-4">
                        <DialogTitle>Scannez le QR Code</DialogTitle>
                        <DialogDescription className='flex items-center gap-1'>
                            <Info className='size-4' />Expiration du QR Code dans 
                            <Timer key={refreshKey} initialMinutes={15} color='muted-foreground' onTimeout={handleTimeOut} />
                            minutes
                        </DialogDescription>
                    </DialogHeader>
                    <div className='size-full flex gap-4 items-center'>
                        {qrCodeIsExpired ? (
                            <div className='size-[250px] flex justify-center items-center'>
                                <Button onClick={handleRegenerateQrCode}>Regénérer un QR Code</Button>
                            </div>
                        ) : (
                            <Image src={qrCode} width={250} height={250} alt="QrCode d'activation de double authentification (2FA)" className="object-cover m-auto" />
                        )}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Comment ça marche ?</h2>
                            <ol className="space-y-2 text-sm">
                                <li>
                                    <span className="font-semibold">1. Ouvrez votre application d'authentification.</span>
                                    <ul className='list-disc ml-10'>
                                        <li>
                                            Nous vous recommandons <span className="font-semibold">Google Authenticator</span> :
                                        </li>
                                        <li className='ml-8'>
                                            <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=fr&pli=1" target='_blank' className='underline text-blue-500'>Télécharger sur Google Play</a>
                                        </li>
                                        <li className='ml-8'>
                                            <a href="https://apps.apple.com/us/app/google-authenticator/id388497605" target='_blank' className='underline text-blue-500'>Télécharger sur l'App Store</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-semibold">2. Scannez le QR code affiché à gauche.</span>
                                </li>
                                <li>
                                    <span className="font-semibold">3. Entrez le code généré ci-dessous.</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <Separator />
                    <div className='my-4 flex flex-col items-center gap-3'>
                        <p className='font-medium text-sm'>Entrez le code d'authentification à 6 chiffres généré par l'application</p>
                        <InputOTP value={code2FA} onChange={(code2FA) => setCode2FA(code2FA)} maxLength={6}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <p className='text-sm text-center text-red-500'>{errorMsg}</p>
                        <Button disabled={code2FA !== "6"} onClick={handleSubmit}>Soumettre le code</Button>
                    </div>
                </DialogContent>
        </>
    );
};

export default Init2FA;
