'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const EditRealisation: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  return <h1 className="text-2xl font-bold">Edition de {id}</h1>;
};

export default EditRealisation;
