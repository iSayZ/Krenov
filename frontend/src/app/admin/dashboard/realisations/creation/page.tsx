'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { Section } from '../../components/topbarMenu';
import { useVisitedSection } from '../../VisitedSectionContext';

const section: Section = {
  items: [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      path: '/admin/dashboard/realisations',
      name: 'Réalisations',
    },
  ],
  page: {
    path: '/admin/dashboard/realisation/creation',
    name: 'Créer une réalisation',
  },
};

const Editor = dynamic(() => import('../editor/Editor'), { ssr: false });

const App: React.FC = () => {
  // Update the section for breadcrumb into topbarMenu
  const { setVisitedSection } = useVisitedSection();

  useEffect(() => {
    setVisitedSection(section);
  }, [setVisitedSection]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Contenu de la publication</h1>
      <Editor />
    </div>
  );
};

export default App;
