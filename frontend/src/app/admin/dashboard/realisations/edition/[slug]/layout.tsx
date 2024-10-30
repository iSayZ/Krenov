'use client';

import { ModifyRealisationProvider } from '../../../contexts/ModifyRealisationContext';

const ModifyRealisationLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ModifyRealisationProvider>{children}</ModifyRealisationProvider>;
};

export default ModifyRealisationLayout;
