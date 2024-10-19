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
            Modifiez vos paramètres de sécurité ici.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex size-full justify-evenly">
            <div className="flex flex-col justify-center gap-4">
              <EmailDialog />
              <PasswordDialog />
            </div>
            <div className="w-[2px] bg-muted-foreground/30" />
            <Settings2FA profileSettings={profileSettings} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SecuritySettings;
