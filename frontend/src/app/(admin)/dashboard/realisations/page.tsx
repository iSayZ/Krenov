'use client';

import React from 'react';

import { realisations } from '@/types/realisation.interface';

import { columns } from './columns';
import { DataTable } from './data-table';

const Realisations: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Liste des réalisations</h1>
      <DataTable columns={columns} data={realisations} />
    </div>
  );
};

export default Realisations;
