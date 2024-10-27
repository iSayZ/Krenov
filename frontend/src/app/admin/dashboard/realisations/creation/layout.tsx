'use client';

import { CreateRealisationProvider } from './contexts/CreateRealisationContext';

const CreateRealisationLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <CreateRealisationProvider>{children}</CreateRealisationProvider>;
};

export default CreateRealisationLayout;
