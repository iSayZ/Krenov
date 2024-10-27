import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { notFound } from 'next/navigation';
import React from 'react';

import { Realisation } from '@/types/realisation.interface';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

// Fonction pour récupérer les slugs des réalisations (ISR compatible)
export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/realisations`
  );
  const realisations: Realisation[] = await response.json();

  // Générer les paramètres pour chaque réalisation
  return realisations.map((realisation) => ({
    slug: realisation.slug,
  }));
}

// Fonction pour récupérer une réalisation spécifique
const getRealisation = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/realisations/${slug}`
  );

  if (!response.ok) {
    return null; // Retourne null si la réalisation n'existe pas
  }

  return response.json();
};

// Composant de la page de la réalisation (ISR compatible)
const RealisationPage = async ({ params }: { params: { slug: string } }) => {
  const realisation = await getRealisation(params.slug);

  if (!realisation) {
    notFound(); // Affiche une page 404 si la réalisation n'existe pas
  }

  // Créez un DOM virtuel pour utiliser DOMPurify
  const window = (new JSDOM('')).window;
  const purify = DOMPurify(window);

  // Nettoyer le contenu HTML pour éviter les attaques XSS
  const cleanContent = purify.sanitize(realisation.content);

  return (
    <div>
        <div className="h-full w-full overflow-hidden">
            <AspectRatio ratio={21.35 / 9}>
                    <Image
                        src={realisation.header}
                        fill
                        alt={`Image de couverture de l'article ${realisation.slug}`}
                        className="object-cover object-bottom-right"
                    />
            </AspectRatio>
        </div>
        <div className="w-2/3 m-auto flex flex-col items-center p-12 relative -top-28 bg-card">
            <div className="space-y-6">
                <h1 className="text-4xl font-bold">{realisation.title}</h1>
                <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: cleanContent }}
                />
            </div>
        </div>
    </div>
  );
};

// Exportation ISR avec une régénération toutes les 60 secondes
export const revalidate = 60; // intervalle de régénération en secondes

export default RealisationPage;
