'use client';

import { NextPage } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const NotFound: NextPage = () => {
  return (
    <div className="mx-auto mt-16 flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-primary text-6xl font-bold">404</h1>

        <h2 className="text-2xl font-semibold">Page non trouvée</h2>

        <p className="text-muted-foreground">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div className="flex justify-center space-x-4 pt-4">
          <Button asChild variant="default">
            <Link href="/">Retour à l'accueil</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;