import Image from 'next/image';

import { Button } from '@/components/ui/button';

const Realisations: React.FC = () => {
  return (
    <section className="bg-accent py-24">
      <div className="flex w-full flex-col items-center px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">Nos Réalisations Récentes</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Découvrez quelques-unes de nos transformations les plus
            impressionnantes
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="group relative h-80 overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop"
              alt="Rénovation cuisine moderne"
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="secondary">Voir le projet</Button>
            </div>
          </div>
          <div className="group relative h-80 overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1974&auto=format&fit=crop"
              alt="Rénovation salle de bain luxueuse"
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="secondary">Voir le projet</Button>
            </div>
          </div>
          <div className="group relative h-80 overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2080&auto=format&fit=crop"
              alt="Rénovation espace commercial"
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="secondary">Voir le projet</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Realisations;
