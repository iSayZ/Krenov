import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { AdminSettings } from '@/types/admin.interface';

import Settings2FA from './2FA/Settings2FA';
import EmailDialog from './EmailDialog';
import PasswordDialog from './PasswordDialog';
import { Separator } from '@/components/ui/separator';

interface SecurityProps {
  profileSettings: AdminSettings;
}

const SecuritySettings: React.FC<SecurityProps> = ({ profileSettings }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sécurité</CardTitle>
          <CardDescription>
            Modifiez ici vos paramètres de sécurité.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex size-full justify-around max-xl:flex-col max-xl:gap-12 max-xl:mt-6">
            <div className="flex flex-col justify-center gap-4  max-sm:m-auto max-xl:flex-row max-sm:flex-col max-xl:gap-6">
              <EmailDialog />
              <PasswordDialog />
            </div>
            <div className="w-[2px] bg-muted-foreground/30 max-xl:w-full max-xl:h-[1px]" />
            <div className='w-1/2 max-xl:w-full'>
              <Settings2FA profileSettings={profileSettings} />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SecuritySettings;
