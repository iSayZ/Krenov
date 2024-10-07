'use client';

import React, { useEffect, useState } from 'react';

import { columns } from './columns';
import { DataTable } from './data-table';

import { fetchAllRealisations } from '@/api/realisationsApi';
import { Realisation } from '@/types/realisation.interface';

const Realisations: React.FC = () => {
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const columnsWithActions = columns(handleRealisationDeleted);

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
      <h1 className="text-2xl font-bold">Liste des réalisations</h1>
      <DataTable
        columns={columnsWithActions}
        data={realisations}
        onRealisationDeleted={handleRealisationDeleted}
      />
    </div>
  );
};

export default Realisations;
