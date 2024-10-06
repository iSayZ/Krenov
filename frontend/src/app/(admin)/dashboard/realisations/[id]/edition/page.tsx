'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const EditRealisation: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  return <>Edition de {id}</>;
};

export default EditRealisation;
