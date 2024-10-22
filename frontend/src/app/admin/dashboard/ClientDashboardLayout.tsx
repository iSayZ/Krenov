'use client';

import { PanelLeft } from 'lucide-react';
import React from 'react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
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
    <SidebarProvider>
      <VisitedSectionProvider>
        <div className="flex size-full">
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
              <div className="size-full px-12 pb-6">{children}</div>
            </div>
          </SidebarInset>
        </div>
        <Toaster />
      </VisitedSectionProvider>
    </SidebarProvider>
  );
};

export default ClientDashboardLayout;
