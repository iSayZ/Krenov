'use client';

import React from 'react';

import { Toaster } from '@/components/ui/sonner';
import { ToggleButtonTheme } from '@/components/ui/toggleButtonTheme';

import AsideMenu from './components/template/AsideMenu';
import ProfileButton from './components/template/ProfileButton';
import TopbarMenu from './components/template/TopbarMenu';
import { VisitedSectionProvider } from './context/VisitedSectionContext';

const ClientDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <VisitedSectionProvider>
      <div className="bg-background text-foreground h-screen w-screen p-10">
        <div className="border-border bg-card flex size-full rounded-lg border border-solid shadow-xl">
          <div className="flex size-full overflow-hidden">
            <div className="border-border flex w-auto flex-none flex-col border-r border-solid font-semibold">
              <nav className="flex flex-col space-y-2 p-2">
                <AsideMenu />
              </nav>
            </div>
            <div className="bg-muted/40 flex w-full grow flex-col gap-4 overflow-auto p-4">
              <div className="flex w-full items-center justify-between font-semibold">
                <div>
                  <TopbarMenu />
                </div>
                <nav className="flex space-x-2">
                  <ToggleButtonTheme />
                  <ProfileButton />
                </nav>
              </div>
              <div className="size-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </VisitedSectionProvider>
  );
};

export default ClientDashboardLayout;
