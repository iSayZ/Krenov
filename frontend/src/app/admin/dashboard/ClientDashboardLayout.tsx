'use client';

import React from 'react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { ToggleButtonTheme } from '@/components/ui/toggleButtonTheme';

import AsideMenu from './components/template/AsideMenu';
import TopbarMenu from './components/template/TopbarMenu';
import { VisitedSectionProvider } from './contexts/VisitedSectionContext';
import { CreateRealisationProvider } from './contexts/CreateRealisationContext';

const ClientDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CreateRealisationProvider>
      <SidebarProvider>
        <VisitedSectionProvider>
          <div className="flex size-full max-md:w-svw">
            <AsideMenu />
            <SidebarInset>
              <div className="flex size-full flex-col">
                <div className="sticky top-0 z-50 mb-6 flex w-full items-center gap-4 rounded-t-xl bg-card px-6 py-5 shadow-sm">
                  <SidebarTrigger />
                  <TopbarMenu />
                  <div className="ml-auto flex items-center gap-2">
                    <ToggleButtonTheme />
                  </div>
                </div>
                <div className="size-full px-12 pb-6 max-md:px-6">{children}</div>
              </div>
            </SidebarInset>
          </div>
          <Toaster />
        </VisitedSectionProvider>
      </SidebarProvider>
    </CreateRealisationProvider>
  );
};

export default ClientDashboardLayout;
