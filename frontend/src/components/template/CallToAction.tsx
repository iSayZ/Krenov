import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <section className="relative py-16 text-primary-foreground md:py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/cta_bg.avif"
          alt="Services de rénovation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 bg-black/50" />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Prêt à transformer votre espace?
          </h2>
          <p className="mb-8 text-primary-foreground/90">
            Contactez-nous dès aujourd'hui pour un devis gratuit et donnez vie à
            votre projet de rénovation
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/devis">Demander un devis</Link>
            </Button>
            <Button size="lg" variant="default" asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
