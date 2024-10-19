'use client';

import { useEffect } from 'react';

import { Section } from '../components/template/TopbarMenu';
import { useVisitedSection } from '../context/VisitedSectionContext';

const section: Section = {
  items: [
    {
      path: '/admin/dashboard',
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

  return <h1 className="text-2xl font-bold">Statistiques du site</h1>;
};

export default Statistiques;
