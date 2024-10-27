'use client';

import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { Section } from '../../../components/template/TopbarMenu';
import { useVisitedSection } from '../../../contexts/VisitedSectionContext';

const EditRealisation: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  // Update the section for breadcrumb into topbarMenu
  const { setVisitedSection } = useVisitedSection();

  const section: Section = {
    items: [
      {
        path: '/admin/dashboard/accueil',
        name: 'Dashboard',
      },
      {
        path: '/admin/dashboard/realisations',
        name: 'Réalisations',
      },
    ],
    page: {
      path: '/admin/dashboard/realisation/:slug/edition',
      name: `Édition de ${slug}`,
    },
  };

  useEffect(() => {
    setVisitedSection(section);
  }, [setVisitedSection]);

  return <h1 className="text-2xl font-bold">Edition de {slug}</h1>;
};

export default EditRealisation;
