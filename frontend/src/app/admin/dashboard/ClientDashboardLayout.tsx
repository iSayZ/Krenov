'use client';

import React from 'react';

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from '@/components/ui/sonner';
import { ToggleButtonTheme } from '@/components/ui/toggleButtonTheme';

import AsideMenu from './components/template/AsideMenu';
import ProfileButton from './components/template/ProfileButton';
import TopbarMenu from './components/template/TopbarMenu';
import { VisitedSectionProvider } from './context/VisitedSectionContext';
import { PanelLeft } from 'lucide-react';

const ClientDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SidebarProvider>
      <VisitedSectionProvider>
        <div className='size-full flex'>
          <AsideMenu />
            <SidebarInset>
              <div className='size-full flex flex-col'>
                <div className='flex items-center gap-4 w-full px-6 py-5 sticky top-0 z-50 bg-card shadow-sm mb-6 rounded-t-xl'>
                  <SidebarTrigger />
                  <TopbarMenu />
                  <div className='flex items-center gap-2 ml-auto'>
                    <ToggleButtonTheme />
                    {/* <ProfileButton /> */}
                  </div>
                </div>
                <div className='size-full px-6 pb-6'>
                  {children}
                </div>
              </div>
            </SidebarInset>
        </div>
        <Toaster />
      </VisitedSectionProvider>
    </SidebarProvider>
  );
};

export default ClientDashboardLayout;
