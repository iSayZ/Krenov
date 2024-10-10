'use client';

import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { useVisitedSection } from '../VisitedSectionContext';

interface BreadcrumbLink {
  path: string;
  name: string;
}

export interface Section {
  items: BreadcrumbLink[];
  page: BreadcrumbLink;
}

const TopbarMenu: React.FC = () => {
  const { visitedSection } = useVisitedSection();

  const returnBreadcrumbJsx = (section: Section): JSX.Element => {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {section.items.map(
            (item: BreadcrumbLink, index: number): JSX.Element => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={item.path}>{item.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            )
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{section.page.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  return <>{returnBreadcrumbJsx(visitedSection)}</>;
};

export default TopbarMenu;
