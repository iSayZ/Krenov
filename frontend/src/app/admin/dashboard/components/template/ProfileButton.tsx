import { ChevronsUpDown, House, LogOut, Settings } from 'lucide-react';
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
import { useSidebar } from '@/components/ui/sidebar';

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
  const { isMobile } = useSidebar();
  const [open, setOpen] = useState<boolean>(false);

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
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={open ? 'size-full p-2 bg-accent text-accent-foreground' : 'size-full p-2'}
          >
              <div className='w-full flex items-center gap-2'>
                <Avatar className="size-8 rounded-md">
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${profile?.avatar}`}
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className='flex flex-col items-start justify-center'>
                  <p className='font-bold text-sm'>
                    {profile?.firstname} {profile?.lastname}
                  </p>
                  <p className='font-normal text-muted-foreground text-xs'>
                    Administrateur
                  </p>
                </div>
              </div>
              <ChevronsUpDown className='text-muted-foreground size-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side={isMobile ? "bottom" : "right"}>
          <DropdownMenuLabel>
            <div className='w-full mr-20'>
              <div className='w-full flex items-center gap-2'>
                <Avatar className="size-7 rounded-md">
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${profile?.avatar}`}
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className='flex flex-col items-start justify-center'>
                  <p className='font-bold text-xs'>
                    {profile?.firstname} {profile?.lastname}
                  </p>
                  <p className='font-normal text-muted-foreground text-[0.65rem] leading-[0.9rem]'>
                    Administrateur
                  </p>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
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
