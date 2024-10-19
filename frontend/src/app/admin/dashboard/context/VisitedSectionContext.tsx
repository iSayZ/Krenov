import React, { createContext, ReactNode, useContext, useState } from 'react';

import { Section } from '../components/template/TopbarMenu';

interface VisitedSectionContextType {
  visitedSection: Section;
  setVisitedSection: React.Dispatch<React.SetStateAction<Section>>;
}

const VisitedSectionContext = createContext<
  VisitedSectionContextType | undefined
>(undefined);

const VisitedSectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [visitedSection, setVisitedSection] = useState<Section>({
    items: [],
    page: {
      path: '/admin/dashboard',
      name: 'Dashboard',
    },
  });

  return (
    <VisitedSectionContext.Provider
      value={{ visitedSection, setVisitedSection }}
    >
      {children}
    </VisitedSectionContext.Provider>
  );
};

const useVisitedSection = () => {
  const context = useContext(VisitedSectionContext);
  if (context === undefined) {
    throw new Error(
      'useVisitedSection must be used within a VisitedSectionProvider'
    );
  }
  return context;
};

export { useVisitedSection, VisitedSectionProvider };
