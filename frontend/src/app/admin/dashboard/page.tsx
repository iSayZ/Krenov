'use client';

import { useEffect } from 'react';

import { Section } from './components/TopbarMenu';
import { useVisitedSection } from './VisitedSectionContext';

const section: Section = {
  items: [],
  page: {
    path: '/admin/dashboard',
    name: 'Dashboard',
  },
};

const Index: React.FC = () => {
  // Update the section for breadcrumb into topbarMenu
  const { setVisitedSection } = useVisitedSection();

  useEffect(() => {
    setVisitedSection(section);
  }, [setVisitedSection]);

  return (
    <>
      <h1 className="text-3xl font-bold">Bonjour Alexis !</h1>
      <p className="text-sm italic">
        Dernière connexion le 8 octobre 2024 à 19:17
      </p>
    </>
  );
};

export default Index;
