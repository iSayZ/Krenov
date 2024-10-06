'use client';

import {
  List,
  SquarePlus,
  CircleGauge,
  House,
  Settings,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ToggleButtonTheme } from '@/components/ui/toggleButtonTheme';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-screen bg-background p-10 text-foreground">
      <div className="flex size-full flex-col rounded-lg border border-solid border-border bg-card shadow-xl">
        <div className="flex w-full items-center justify-between border-b border-solid border-border p-4 font-semibold">
          <nav className="flex space-x-6">
            <Link
              href="/dashboard"
              className={
                pathname === '/dashboard'
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }
            >
              Accueil
            </Link>
            <Link
              href="/dashboard/realisations"
              className={
                pathname === '/dashboard/realisations'
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }
            >
              Réalisations
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Krenov Dashboard</h1>
            <CircleGauge className="size-8" />
          </div>
          <nav className="flex space-x-4">
            <ToggleButtonTheme />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Avatar className="mr-2 size-4">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  Admin123
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <House className="mr-2 size-4" />
                  <span>Retour au site</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 size-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 size-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <div className="flex h-full overflow-hidden">
          <div className="flex w-auto flex-none flex-col border-r border-solid border-border bg-muted font-semibold">
            <nav className="flex flex-col space-y-2 p-2">
              {/* <Link href="/dashboard" className="hover:underline hover:decoration-solid p-6">
            Accueil
          </Link> */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/dashboard/realisations"
                      className={
                        pathname === '/dashboard/realisations'
                          ? 'rounded-full bg-primary p-2 text-secondary'
                          : 'p-2'
                      }
                    >
                      <List />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Liste des réalisations</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/dashboard/realisations/creation"
                      className={
                        pathname === '/dashboard/realisations/creation'
                          ? 'rounded-full bg-primary p-2 text-secondary'
                          : 'p-2'
                      }
                    >
                      <SquarePlus />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ajouter une réalisation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </nav>
          </div>
          <div className="grow overflow-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
