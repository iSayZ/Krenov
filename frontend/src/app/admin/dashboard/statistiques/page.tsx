'use client';

import { useEffect } from 'react';

import { Section } from '../components/template/TopbarMenu';
import { useVisitedSection } from '../contexts/VisitedSectionContext';

const section: Section = {
  items: [
    {
      path: '/admin/dashboard/accueil',
      name: 'Dashboard',
    },
  ],
  page: {
    path: '/admin/dashboard/statistiques',
    name: 'Statistiques',
  },
};

const Statistiques: React.FC = () => {
  // Update the section for breadcrumb into topbarMenu
  const { setVisitedSection } = useVisitedSection();

  useEffect(() => {
    setVisitedSection(section);
  }, [setVisitedSection]);

  return (
    <>
      <h1 className="text-2xl font-bold">Statistiques du site</h1>
      <div className="flex h-full items-center justify-center">
        <p className="text-4xl font-bold">EN CONSTRUCTION</p>
      </div>
    </>
  );
};

export default Statistiques;
