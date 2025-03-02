'use client';

import {
  Paintbrush,
  Twitch as Kitchen,
  Bath,
  Building2,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

const services = [
  {
    id: 'renovation-complete',
    name: 'Rénovation complète',
    description:
      "Transformation totale de votre espace avec une approche clé en main. Notre équipe prend en charge l'intégralité du projet, de la conception à la réalisation.",
    icon: Paintbrush,
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
    features: [
      'Planification et design',
      'Gestion de projet complète',
      'Coordination des corps de métier',
      'Respect des normes et réglementations',
      'Garantie sur les travaux',
    ],
  },
  {
    id: 'cuisine',
    name: 'Cuisine',
    description:
      "Créez la cuisine de vos rêves, alliant fonctionnalité et esthétique. Nos designers travaillent avec vous pour optimiser l'espace et choisir les meilleurs matériaux.",
    icon: Kitchen,
    image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068&auto=format&fit=crop',
    features: [
      'Design personnalisé',
      'Choix des matériaux et finitions',
      "Installation d'électroménagers",
      'Éclairage moderne',
      'Solutions de rangement',
    ],
  },
  {
    id: 'salle-de-bain',
    name: 'Salle de bain',
    description:
      'Modernisez votre salle de bain pour plus de confort et de style. Nous créons des espaces élégants et fonctionnels adaptés à vos besoins.',
    icon: Bath,
    image:
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1974&auto=format&fit=crop',
    features: [
      'Design contemporain',
      'Douches sur mesure',
      'Systèmes de ventilation',
      'Éclairage adapté',
      'Solutions de rangement',
    ],
  },
  {
    id: 'commercial',
    name: 'Commercial',
    description:
      'Solutions sur mesure pour vos espaces commerciaux. Nous transformons votre lieu de travail en respectant vos contraintes opérationnelles.',
    icon: Building2,
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    features: [
      "Aménagement d'espaces de travail",
      'Rénovation de boutiques',
      'Mise aux normes',
      'Optimisation des espaces',
      'Gestion de projet commerciale',
    ],
  },
];

export default function Services() {

  const searchParams = useSearchParams();
  
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 64;
            window.scrollTo({
              top: offsetPosition,
            });
          }
        }, 100);
      }
    };
    
    handleHash();
    
    window.addEventListener('hashchange', handleHash);
    
    return () => {
      window.removeEventListener('hashchange', handleHash);
    };
  }, [searchParams]);
  
  return (
    <div className="mt-16 flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop"
          alt="Services de rénovation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-6 p-4 text-center">
            <h1 className="max-w-4xl text-4xl font-bold text-white md:text-6xl">
              Nos Services
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-200">
              Des solutions complètes pour tous vos projets de rénovation
            </p>
          </div>
        </div>
      </section>

      {/* Services Details */}
      <section id="services">
        {services.map((service, index) => (
          <div
            key={service.name}
            id={service.id}
            className={`flex flex-col gap-12 px-6 py-20 lg:flex-row ${
              index % 2 === 1 ? 'bg-secondary lg:flex-row-reverse' : ''
            }`}
          >
            <div className="flex-1">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold">{service.name}</h2>
              <p className="text-muted-foreground text-lg">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <ChevronRight className="text-primary size-4" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild>
                <Link href="/devis">Demander un devis</Link>
              </Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
