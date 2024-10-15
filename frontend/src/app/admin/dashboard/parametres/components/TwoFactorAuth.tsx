import { ShieldCheck, ShieldX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { AdminSettings } from '@/types/admin.interface';
import TwoFactorInfo from './TwoFactorInfo';

interface TwoFactorProps {
    profileSettings: AdminSettings;
}

const TwoFactorAuth: React.FC<TwoFactorProps> = ({ profileSettings }) => {
    return (
        <div className="h-full w-1/2 flex flex-col gap-6">
            <div className='flex gap-6 items-center justify-center'>
            <h2 className='font-semibold text-center text-lg'>Authentification à deux facteurs (2FA)</h2>
            <p className='font-semibold text-lg'>-</p>
            {profileSettings.two_fa_enabled ?  
                <Badge className='bg-lime-500 hover:bg-lime-500 font-semibold text-md'>
                Activé
                <ShieldCheck className='size-5 ml-2' />
                </Badge>
                :
                <Badge className='bg-red-600 hover:bg-red-600 font-semibold text-md'>
                Désactivé
                <ShieldX className='size-5 ml-2' />
                </Badge>
            }
            </div>
            <p className='text-muted-foreground text-center text-sm'>
                Pour renforcer la sécurité de votre compte, nous vous recommandons d'activer l'authentification à deux facteurs (2FA). Cette fonctionnalité ajoute une couche de protection supplémentaire en vous demandant, en plus de votre mot de passe, de saisir un code de vérification généré sur votre téléphone via une application comme Google Authenticator.
            </p>
            <hr className='w-2/3 h-[2px] m-auto'/>
            <div className='w-full flex justify-center gap-4 mt-2'>
                {profileSettings.two_fa_enabled ?
                    <>
                        <Button variant='outline' className='min-w-44'>
                            Codes de secours
                        </Button>
                        <Button className='min-w-44'>
                            Désactiver
                        </Button>
                    </>
                    :
                    <>
                        <TwoFactorInfo />
                        <Button className='min-w-44'>
                            Activer
                        </Button>
                    </>
                }
            </div>
        </div>
    )
}

export default TwoFactorAuth;