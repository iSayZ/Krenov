import React from 'react';

import Hero from '@/components/home/Hero/Hero';
import Realisations from '@/components/home/Realisations/Realisations';
import Services from '@/components/home/Services/Service';

import { getApiUrl } from '@/lib/api-url';
import { Realisation } from '@/types/realisation.interface';
import Testimonials from '@/components/home/Testimonials/Testimonials';

const API_BASE_URL = getApiUrl();

// Function to get article with ISR
const fetchArticles = async (): Promise<Realisation[]> => {
  const response = await fetch(`${API_BASE_URL}/realisations/active`, {
    next: { revalidate: 60 }, // Revalidation ISR every 10 minutes
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des articles');
  }
  return response.json();
};

const App: React.FC = async () => {
  const articles = await fetchArticles();

  return (
    <>
      <Hero />
      <Services />
      <Realisations />
      <Testimonials />
    </>
  );
};

export default App;
