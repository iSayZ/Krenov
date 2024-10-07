'use client';

import { List, SquarePlus, House, ChartNoAxesCombined } from 'lucide-react';
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
}

// Interface definition for a section
interface Section {
  menuLinks: MenuLink[];
}

// Interface definition for the sections object
interface Sections {
  index: Section;
  realisations: Section;
}

// Typing the sections object
const sections: Sections = {
  index: {
    menuLinks: [
      {
        path: '/dashboard',
        icon: <House />,
        tooltipText: 'Accueil du dashboard',
      },
      {
        path: '/dashboard/statistiques',
        icon: <ChartNoAxesCombined />,
        tooltipText: 'Statistiques du site',
      },
    ],
  },
  realisations: {
    menuLinks: [
      {
        path: '/dashboard/realisations',
        icon: <List />,
        tooltipText: 'Liste des réalisations',
      },
      {
        path: '/dashboard/realisations/creation',
        icon: <SquarePlus />,
        tooltipText: 'Ajouter une réalisation',
      },
    ],
  },
};

const AsideMenu: React.FC = () => {
  const pathname = usePathname();

  // Function to return the JSX Element of every menuLinks for a section
  const returnMenuLinksJsx = (section: MenuLink[]): JSX.Element => {
    return (
      <>
        {section.map((menuLink) => (
          <TooltipProvider key={menuLink.path}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={menuLink.path}
                  className={
                    pathname === menuLink.path
                      ? 'rounded-full bg-primary p-2 text-secondary'
                      : 'p-2'
                  }
                >
                  {menuLink.icon}
                </Link>
              </TooltipTrigger>
              <TooltipContent>{menuLink.tooltipText}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </>
    );
  };

  // Function to return the appropriate aside menu based on the URL
  const returnAsideMenu = (): JSX.Element | null => {
    if (pathname.includes('realisations')) {
      return returnMenuLinksJsx(sections.realisations.menuLinks);
    } else if (pathname.startsWith('/dashboard')) {
      return returnMenuLinksJsx(sections.index.menuLinks);
    } else {
      return null;
    }
  };

  const asideMenu = returnAsideMenu();

  return <>{asideMenu}</>;
};

export default AsideMenu;
