import { ChevronRight, Paintbrush, Bath, Building2 } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

const Services: React.FC = () => {
  const services = [
    {
      name: 'Rénovation complète',
      description:
        'Transformation totale de votre espace avec une approche clé en main.',
      icon: Paintbrush,
      href: '/services#renovation-complete',
    },
    {
      name: 'Cuisine',
      description:
        'Créez la cuisine de vos rêves, alliant fonctionnalité et esthétique.',
      icon: Paintbrush,
      href: '/services#cuisine',
    },
    {
      name: 'Salle de bain',
      description:
        'Modernisez votre salle de bain pour plus de confort et de style.',
      icon: Bath,
      href: '/services#salle-de-bain',
    },
    {
      name: 'Commercial',
      description: 'Solutions sur mesure pour vos espaces commerciaux.',
      icon: Building2,
      href: '/services#commercial',
    },
  ];

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="flex w-full flex-col items-center px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">Nos Services</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Découvrez notre gamme complète de services de rénovation, conçus
            pour répondre à tous vos besoins
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.name}
              className="group cursor-pointer transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">{service.name}</h3>
                <p className="mb-6 line-clamp-3 h-[4.5rem] text-muted-foreground">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center font-medium text-primary group-hover:underline"
                >
                  En savoir plus
                  <ChevronRight className="ml-1 size-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
