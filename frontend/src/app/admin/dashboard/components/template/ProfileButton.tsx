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
import { useSidebar } from '@/components/ui/sidebar';

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
            className={
              open
                ? 'size-full bg-accent p-2 text-accent-foreground'
                : 'size-full p-2'
            }
          >
            <div className="flex w-full items-center gap-2">
              <Avatar className="size-8 rounded-md">
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${profile?.avatar}`}
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center overflow-hidden text-left">
                <p className="text-sm font-bold w-full truncate">
                  {profile?.firstname} {profile?.lastname}
                </p>
                <p className="text-xs font-normal text-muted-foreground w-full truncate">
                  {profile?.role}
                </p>
              </div>
            </div>
            <ChevronsUpDown className="size-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isMobile ? 'center' : 'end'} side={isMobile ? 'bottom' : 'right'}>
          <DropdownMenuLabel>
            <div className="w-full">
              <div className="flex items-center gap-2 w-52 max-w-60">
                <Avatar className="size-7 rounded-md">
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${profile?.avatar}`}
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center overflow-hidden w-full text-left">
                  <p className="text-xs font-bold w-full truncate">
                    {profile?.firstname} {profile?.lastname}
                  </p>
                  <p className="text-[0.65rem] font-normal leading-[0.9rem] text-muted-foreground w-full truncate">
                    {profile?.role}
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
