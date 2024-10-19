import { House, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { fetchAdminProfile } from '@/api/adminApi';
import { logout } from '@/api/authApi';
import { AdminProfile } from '@/types/admin.interface';

const ProfileButton: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchAdminProfile();
        setProfile(profileData);
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  const router = useRouter();

  const goToSettingsPage = () => {
    router.push('/admin/dashboard/parametres');
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/connexion');
    } catch (error) {
      console.error('Erreur lors de la déconnexion : ', error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar className="size-9">
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${profile?.avatar}`}
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mon profil</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={goToSettingsPage}>
            <Settings className="mr-2 size-4" />
            <span>Paramètres</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <House className="mr-2 size-4" />
            <Link href="/">Retour au site</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 size-4" />
            <span>Se déconnecter</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileButton;
