'use client';

import { ChartNoAxesCombined, House, Newspaper, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Interface definition for a menu link
interface MenuLink {
  path: string;
  icon: JSX.Element;
  tooltipText: string;
  childrenPath?: string;
}

// Typing the sections object
const sections: MenuLink[] = [
  {
    path: '/admin/dashboard',
    icon: <House />,
    tooltipText: 'Accueil du dashboard',
  },
  {
    path: '/admin/dashboard/realisations',
    icon: <Newspaper />,
    tooltipText: 'Les réalisations',
    childrenPath: 'realisations',
  },
  {
    path: '/admin/dashboard/statistiques',
    icon: <ChartNoAxesCombined />,
    tooltipText: 'Statistiques du site',
  },
  {
    path: '/admin/dashboard/:id/parametres',
    icon: <Settings />,
    tooltipText: 'Paramètres profil',
    childrenPath: 'parametres',
  },
];

const AsideMenu: React.FC = () => {
  const pathname = usePathname();

  // Function to return the JSX Element of every menuLinks for a section
  const returnMenuLinksJsx = (section: MenuLink[]): JSX.Element => {
    return (
      <>
        {section.map((menuLink, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={menuLink.path}
                  className={
                    menuLink.childrenPath
                      ? pathname.includes(menuLink.childrenPath)
                        ? 'rounded-full bg-primary p-2 text-secondary'
                        : 'p-2'
                      : pathname === menuLink.path
                        ? 'rounded-full bg-primary p-2 text-secondary'
                        : 'p-2'
                  }
                >
                  {menuLink.icon}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                {menuLink.tooltipText}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </>
    );
  };

  const asideMenu = returnMenuLinksJsx(sections);

  return <>{asideMenu}</>;
};

export default AsideMenu;
