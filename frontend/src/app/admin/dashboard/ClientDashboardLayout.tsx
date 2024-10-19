'use client';

import React from 'react';

import { ToggleButtonTheme } from '@/components/ui/toggleButtonTheme';
import { Toaster } from "@/components/ui/sonner"
import AsideMenu from './components/template/AsideMenu';
import ProfileButton from './components/template/ProfileButton';
import TopbarMenu from './components/template/TopbarMenu';
import { VisitedSectionProvider } from './context/VisitedSectionContext';

const ClientDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <VisitedSectionProvider>
      <div className="h-screen w-screen bg-background p-10 text-foreground">
        <div className="flex size-full rounded-lg border border-solid border-border bg-card shadow-xl">
          <div className="flex size-full overflow-hidden">
            <div className="flex w-auto flex-none flex-col border-r border-solid border-border font-semibold">
              <nav className="flex flex-col space-y-2 p-2">
                <AsideMenu />
              </nav>
            </div>
            <div className="flex w-full grow flex-col gap-4 overflow-auto bg-muted/40 p-4">
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
