import { ChangeEvent, useRef, useState } from 'react';

import { Pencil } from 'lucide-react';

import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
Tooltip,
TooltipContent,
TooltipProvider,
TooltipTrigger,
} from '@/components/ui/tooltip';
import { AdminSettings } from '@/types/admin.interface';

import { updateAdminProfile, uploadAvatar } from '@/api/adminApi';

interface ProfileProps {
    profileSettings: AdminSettings;
    handleChangeSettings: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProfileInformation: React.FC<ProfileProps> = ({ profileSettings, handleChangeSettings }) => {

    // To update the avatar of settings
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [newAvatarUrl, setNewAvatarUrl] = useState<string | null>(null);

  // Simulate click on hidden input file
  const handleUploadAvatarBtnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Stock the new avatar and show the avatar with temporary url
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setNewAvatar(file[0]);
      const url = URL.createObjectURL(file[0]);
      setNewAvatarUrl(url);
    }
  };

  // Submit information values
  const handleSubmitInformation = async () => {
    const profileData: {
      role: string;
      biography: string;
      avatar?: string;
    } = {
      role: profileSettings.role,
      biography: profileSettings.biography,
    };

    if (newAvatar) {
      try {
        const formData = new FormData();
        formData.append('avatar', newAvatar);
        const avatarSrc = await uploadAvatar(formData);
        profileData.avatar = avatarSrc;
      } catch (error) {
        console.error("Erreur lors de l'upload de l'avatar :", error);
      }
    }

    try {
      await updateAdminProfile(profileData);
    } catch (error) {
      console.error("Erreur lors de l'upload de l'avatar :", error);
    }
  };

    return (
        <>

            {/* Hidden input to change avatar */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
            />
            <Card>
                <CardHeader>
                <CardTitle>Informations</CardTitle>
                <CardDescription>
                    Apportez des modifications à vos informations ici. Cliquez sur
                    enregistrer lorsque vous avez terminé.
                </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-evenly">
                <div className="w-1/2 space-y-4">
                    <div className="space-y-1 w-2/3">
                    <Label htmlFor="role">Rôle</Label>
                    <Input
                        id="role"
                        placeholder="Ex: Responsable Marketing, Consultant(e)"
                        value={profileSettings?.role}
                        name="role"
                        onChange={handleChangeSettings}
                    />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="biography">Biographie</Label>
                    <AutosizeTextarea
                        id="biography"
                        maxHeight={200}
                        placeholder="Décrivez votre parcours professionnel, vos compétences clés, et ce qui vous passionne dans votre domaine. Ex: Plus de 10 ans d'expérience dans le secteur, spécialisé(e) dans l'optimisation de processus et l'innovation technologique."
                        value={profileSettings?.biography}
                        name="biography"
                        onChange={handleChangeSettings}
                    />
                    </div>
                    <Button onClick={handleSubmitInformation}>Enregistrer les modifications</Button>
                </div>
                <div className="w-[2px] bg-muted-foreground/30" />
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                    <Avatar className="size-52">
                        <AvatarImage src={newAvatarUrl ? newAvatarUrl : `${process.env.NEXT_PUBLIC_API_BASE_URL}${profileSettings?.avatar}`} />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-3 top-3 z-50 rounded-full text-foreground"
                            onClick={handleUploadAvatarBtnClick}
                            >
                            <Pencil className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Modifier la photo de profil</p>
                        </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    </div>
                    <h2 className="text-lg font-semibold">Alexis Estrine</h2>
                </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ProfileInformation;