import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen">
      <Image
        src="/assets/images/template/background.jpg"
        alt="Rénovation moderne"
        fill
        className="object-cover pt-16"
        priority
      />
      <div className="absolute inset-0 top-16 bg-black/50" />
      <div className="absolute inset-0 mt-16 flex items-center justify-center">
        <div className="space-y-6 p-4 text-center">
          <h1 className="max-w-4xl text-4xl font-bold text-white md:text-6xl">
            Transformez votre espace avec expertise et passion
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-200">
            Des rénovations résidentielles et commerciales sur mesure pour
            donner vie à vos projets
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/devis">
              Demander un devis gratuit
              <ChevronRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
