'use client';

import { CircleGauge } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { ToggleButtonTheme } from '@/components/ui/toggleButtonTheme';

import AsideMenu from './components/asideMenu';
import ProfileButton from './components/profileButton';

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
                  : 'text-muted-foreground delay-100 hover:text-foreground'
              }
            >
              Accueil
            </Link>
            <Link
              href="/dashboard/realisations"
              className={
                pathname === '/dashboard/realisations'
                  ? 'text-foreground'
                  : 'text-muted-foreground delay-100 hover:text-foreground'
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
            <ProfileButton />
          </nav>
        </div>
        <div className="flex h-full overflow-hidden">
          <div className="flex w-auto flex-none flex-col border-r border-solid border-border bg-muted font-semibold">
            <nav className="flex flex-col space-y-2 p-2">
              <AsideMenu />
            </nav>
          </div>
          <div className="grow overflow-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
