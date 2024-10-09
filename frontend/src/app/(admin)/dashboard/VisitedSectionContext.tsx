import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Section } from './components/topbarMenu';

interface VisitedSectionContextType {
  visitedSection: Section;
  setVisitedSection: React.Dispatch<React.SetStateAction<Section>>;
}

const VisitedSectionContext = createContext<VisitedSectionContextType | undefined>(undefined);

export const VisitedSectionProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [visitedSection, setVisitedSection] = useState<Section>({
    items: [],
    page: {
      path: '/dashboard',
      name: 'Accueil'
    }
  });

  return (
    <VisitedSectionContext.Provider value={{ visitedSection, setVisitedSection }}>
      {children}
    </VisitedSectionContext.Provider>
  );
};

export const useVisitedSection = () => {
  const context = useContext(VisitedSectionContext);
  if (context === undefined) {
    throw new Error('useVisitedSection must be used within a VisitedSectionProvider');
  }
  return context;
};