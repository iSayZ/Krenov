'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import {
  ChartNoAxesCombined,
  ChevronRight,
  House,
  Newspaper,
  Settings,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';

import ProfileButton from './ProfileButton';

const AsideMenu: React.FC = () => {
  // Menu items.
  const items = [
    {
      title: 'Accueil',
      url: '/admin/dashboard/accueil',
      slug: 'accueil',
      icon: House,
      isActive: false,
    },
    {
      title: 'Réalisations',
      url: '/admin/dashboard/realisations',
      slug: 'realisations',
      icon: Newspaper,
      isActive: false,
      items: [
        {
          title: 'Liste des réalisations',
          url: '/admin/dashboard/realisations',
        },
        {
          title: 'Ajouter une réalisation',
          url: '/admin/dashboard/realisations/creation',
        },
        {
          title: "Ordre d'affichage",
          url: '/admin/dashboard/realisations/ordre',
        },
      ],
    },
    {
      title: 'Statistiques',
      url: '/admin/dashboard/statistiques',
      slug: 'statistiques',
      icon: ChartNoAxesCombined,
      isActive: false,
    },
    {
      title: 'Paramètres',
      url: '/admin/dashboard/parametres',
      slug: 'parametres',
      icon: Settings,
      isActive: false,
    },
  ];

  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <Link
          href="/admin/dashboard/accueil"
          className="flex size-full items-center justify-start gap-4 rounded-lg p-2 hover:bg-accent hover:text-accent-foreground"
        >
          <div className="size-12">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/assets/images/logo.png"
                fill
                alt="Image"
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <div className="h-full w-px bg-muted-foreground/70" />
          <div className="flex flex-col items-start font-semibold">
            <p>{process.env.NEXT_PUBLIC_APP_NAME}</p>
            <p>Dashboard</p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={currentPath.includes(item.slug)}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={currentPath.includes(item.slug)}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={subItem.url === currentPath}
                                >
                                  <Link href={subItem.url}>
                                    <span
                                      className={
                                        pathname === subItem.url
                                          ? 'font-medium'
                                          : ''
                                      }
                                    >
                                      {subItem.title}
                                    </span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ProfileButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AsideMenu;
