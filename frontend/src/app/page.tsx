// pages/articles/index.tsx

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';

import { Realisation } from '@/types/realisation.interface';

// Function to get article with ISR
const fetchArticles = async (): Promise<Realisation[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/realisations/active`,
    {
      next: { revalidate: 60 }, // Revalidation ISR every 10 minutes
    }
  );
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des articles');
  }
  return response.json();
};

const App: React.FC = async () => {
  const articles = await fetchArticles();

  return (
    <div className="space-y-6 p-6 sm:space-y-12 sm:p-12">
      <h1 className="text-center text-4xl sm:text-left">Tous les articles</h1>
      <div className="flex w-full flex-col items-center gap-6 sm:flex-row">
        {articles.map((article, index) => (
          <div key={index} className="space-y-2">
            <p className="w-64 overflow-hidden text-ellipsis text-nowrap">
              {article.title}
            </p>
            <Link
              href={`/${article.slug}`}
              className="group relative block size-64 hover:shadow-2xl"
            >
              <AspectRatio
                ratio={1 / 1}
                className="size-full overflow-hidden rounded-md shadow-md"
              >
                <Image
                  src={article.header}
                  alt={`Image de couverture de l'article ${article.title}.`}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </AspectRatio>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
