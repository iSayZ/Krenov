'use client';

import { useEffect } from 'react';

import { Section } from './components/topbarMenu';
import { useVisitedSection } from './VisitedSectionContext';

const section: Section = {
  items: [],
  page: {
    path: '/dashboard',
    name: 'Dashboard',
  },
};

const Index: React.FC = () => {
  // Update the section for breadcrumb into topbarMenu
  const { setVisitedSection } = useVisitedSection();

  useEffect(() => {
    setVisitedSection(section);
  }, [setVisitedSection]);

  return <h1 className="text-2xl font-bold">Accueil du dashboard</h1>;
};

export default Index;
