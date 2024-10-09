'use client';

import React, { useEffect, useState } from 'react';

import { columns } from './columns';
import { DataTable } from './data-table';

import { fetchAllRealisations } from '@/api/realisationsApi';
import { Realisation } from '@/types/realisation.interface';
import { Section } from '../components/topbarMenu';
import { useVisitedSection } from '../VisitedSectionContext';

const section: Section = {
  items: [
      {
          path: '/dashboard',
          name: 'Accueil'
      }
  ],
  page: {
      path: '/dashboard/realisations',
      name: 'Réalisations'
  }
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
  const handleRealisationStatusChanged = (changedId: string, newStatus: Realisation['status']) => {
    setRealisations((prevRealisations) =>
      prevRealisations.map((realisation) =>
        realisation._id === changedId
          ? { ...realisation, status: newStatus }
          : realisation 
      ))
  };

  const columnsWithActions = columns(handleRealisationDeleted, handleRealisationStatusChanged);
  
  if (loading) {
    return (
      <div className="flex size-full items-center justify-center">
        <div
          className="text-foreground inline-block size-12 animate-spin rounded-full border-[3px] border-current border-t-transparent"
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
        onRealisationStatusChanged={handleRealisationStatusChanged}      />
    </div>
  );
};

export default Realisations;
