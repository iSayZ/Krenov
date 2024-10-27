'use client';

import React, { useEffect, useState } from 'react';

import { fetchAllRealisations } from '@/api/realisationsApi';
import { Realisation } from '@/types/realisation.interface';

import { Section } from '../components/template/TopbarMenu';
import { useVisitedSection } from '../contexts/VisitedSectionContext';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';

const section: Section = {
  items: [
    {
      path: '/admin/dashboard/accueil',
      name: 'Dashboard',
    },
  ],
  page: {
    path: '/admin/dashboard/realisations',
    name: 'Liste des réalisations',
  },
};

const Realisations: React.FC = () => {
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Update the section for breadcrumb into topbarMenu
  const { setVisitedSection } = useVisitedSection();

  useEffect(() => {
    setVisitedSection(section);
  }, [setVisitedSection]);

  // Call API
  useEffect(() => {
    const loadRealisations = async () => {
      try {
        const data = await fetchAllRealisations();
        setRealisations(data);
      } catch (error) {
        console.error('Erreur lors du chargement des réalisations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRealisations();
  }, []);

  // Function to refresh the data-table without the deleted element
  const handleRealisationDeleted = (deletedId: string) => {
    setRealisations((prevRealisations) =>
      prevRealisations.filter((realisation) => realisation._id !== deletedId)
    );
  };

  // Function to refresh the data-table with good status
  const handleRealisationStatusChanged = (
    changedId: string,
    newStatus: Realisation['status']
  ) => {
    setRealisations((prevRealisations) =>
      prevRealisations.map((realisation) =>
        realisation._id === changedId
          ? { ...realisation, status: newStatus }
          : realisation
      )
    );
  };

  const columnsWithActions = columns(
    handleRealisationDeleted,
    handleRealisationStatusChanged
  );

  if (loading) {
    return (
      <div className="flex size-full items-center justify-center">
        <div
          className="inline-block size-12 animate-spin rounded-full border-[3px] border-current border-t-transparent text-foreground"
          role="status"
          aria-label="loading"
        ></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <DataTable
        columns={columnsWithActions}
        data={realisations}
        onRealisationDeleted={handleRealisationDeleted}
        onRealisationStatusChanged={handleRealisationStatusChanged}
      />
    </div>
  );
};

export default Realisations;
