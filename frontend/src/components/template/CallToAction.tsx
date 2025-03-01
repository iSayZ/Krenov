import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 text-primary-foreground md:py-24 relative">
  <div className="absolute inset-0 z-0">
    <Image
      src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Services de rénovation"
      fill
      className="object-cover"
      priority
    />
    <div className="bg-black/50 absolute inset-0 z-20" />
  </div>
  <div className="flex w-full flex-col items-center px-6 relative z-10">
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
