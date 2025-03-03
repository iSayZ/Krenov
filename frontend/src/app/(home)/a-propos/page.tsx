"use client"

import { 
  History, 
  Award, 
  CheckCircle, 
  BarChart3, 
  ListChecks,
  Quote
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Types pour les données
type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
}

type Value = {
  title: string;
  description: string;
  icon: React.ElementType;
}

type Advantage = {
  title: string;
  description: string;
}

type Statistic = {
  value: string;
  label: string;
}

type ProcessStep = {
  number: number;
  title: string;
  description: string;
}

// Données pour la page
const teamMembers: TeamMember[] = [
    {
      name: 'Thomas Morel',
      role: 'Cofondateur & Artisan Rénovateur',
      bio: 'Expert en rénovation avec plus de 15 ans d\'expérience. Passionné par la transformation des espaces et le travail bien fait.',
      image: 'https://plus.unsplash.com/premium_photo-1663088813730-7855bba8eb0b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Alexandre Perrin',
      role: 'Cofondateur & Artisan Rénovateur',
      bio: 'Spécialiste en second œuvre et finitions. Plus de 12 ans d\'expérience dans la rénovation complète d\'intérieurs.',
      image: 'https://plus.unsplash.com/premium_photo-1661604231391-4e2bcc9060f9?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  

const values: Value[] = [
  {
    title: 'Excellence',
    description: 'Nous visons l\'excellence dans chaque détail, des matériaux aux finitions, pour des résultats qui durent.',
    icon: Award,
  },
  {
    title: 'Innovation',
    description: 'Nous restons à la pointe des tendances et technologies pour offrir des solutions modernes et durables.',
    icon: History,
  },
  {
    title: 'Écoute',
    description: 'Votre vision est notre priorité. Nous concevons chaque projet en fonction de vos besoins spécifiques.',
    icon: Quote,
  },
]

const advantages: Advantage[] = [
  {
    title: 'Expertise globale',
    description: 'De la conception à la réalisation, nous gérons tous les aspects de votre projet de rénovation.',
  },
  {
    title: 'Garantie de satisfaction',
    description: 'Nous offrons une garantie de 5 ans sur tous nos travaux pour votre tranquillité d\'esprit.',
  },
  {
    title: 'Respect des délais',
    description: 'Nous nous engageons à respecter les délais convenus, avec un planning précis et transparent.',
  },
  {
    title: 'Matériaux de qualité',
    description: 'Nous sélectionnons uniquement des matériaux de première qualité pour des résultats durables.',
  },
]

const statistics: Statistic[] = [
  { value: '15+', label: 'Années d\'expérience' },
  { value: '500+', label: 'Projets réalisés' },
  { value: '98%', label: 'Clients satisfaits' },
  { value: '25', label: 'Experts dédiés' },
]

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Consultation initiale',
    description: 'Nous discutons de votre vision, vos besoins et votre budget pour établir les bases du projet.',
  },
  {
    number: 2,
    title: 'Conception et planification',
    description: 'Notre équipe développe un plan détaillé avec des visualisations 3D et un calendrier précis.',
  },
  {
    number: 3,
    title: 'Sélection des matériaux',
    description: 'Nous vous guidons dans le choix des matériaux qui correspondent à votre style et vos besoins.',
  },
  {
    number: 4,
    title: 'Réalisation des travaux',
    description: 'Nos équipes expertes réalisent les travaux avec précision et dans le respect des normes.',
  },
  {
    number: 5,
    title: 'Inspection finale',
    description: 'Nous vérifions chaque détail pour garantir que les résultats correspondent à vos attentes.',
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col mt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <Image
          src="https://plus.unsplash.com/premium_photo-1681732427014-3389fc08fb71?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="À propos de notre entreprise de rénovation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-6 p-4 text-center">
            <h1 className="max-w-4xl text-4xl font-bold text-white md:text-6xl">
              À Propos de Nous
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-200">
              Découvrez notre histoire, nos valeurs et notre équipe passionnée
            </p>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="bg-background py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Notre Histoire</h2>
            <div className="text-muted-foreground space-y-4 text-lg">
              <p>
                Fondée en 2008 par Jean Dupont, notre entreprise est née d'une passion pour la transformation d'espaces et d'un désir de créer des environnements qui améliorent la vie quotidienne.
              </p>
              <p>
                Ce qui a commencé comme une petite entreprise familiale s'est développé pour devenir l'un des leaders de la rénovation résidentielle et commerciale dans la région, tout en conservant nos valeurs fondamentales de qualité, d'intégrité et de service personnalisé.
              </p>
              <p>
                Au fil des années, nous avons constitué une équipe de professionnels talentueux et passionnés, réalisé des centaines de projets et bâti notre réputation sur la satisfaction de nos clients et l'excellence de notre travail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="bg-accent py-24">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Notre Équipe</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Des experts passionnés dédiés à la réalisation de vos projets
            </p>
          </div>
          <div className="flex justify-center gap-12">
            {teamMembers.map((member) => (
              <Card key={member.name} className="overflow-hidden w-1/4">
                <div className="relative h-72 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary mb-4 text-sm font-medium">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="bg-background py-24">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Notre Philosophie</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Les valeurs qui guident chacune de nos actions
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="flex flex-col items-center p-8 text-center">
                <value.icon className="text-primary mb-6 size-12" />
                <h3 className="mb-4 text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi Nous Choisir */}
      <section className="bg-accent py-24">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Pourquoi Nous Choisir</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Ce qui nous distingue et fait de nous le partenaire idéal pour votre projet
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {advantages.map((advantage) => (
              <Card key={advantage.title} className="overflow-hidden">
                <CardContent className="flex p-6">
                  <CheckCircle className="text-primary mr-4 size-6 shrink-0" />
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">{advantage.title}</h3>
                    <p className="text-muted-foreground">{advantage.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <span className="mb-2 text-5xl font-bold">{stat.value}</span>
                <span className="text-primary-foreground/80 text-xl">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Processus */}
      <section className="bg-background py-24">
  <div className="container">
    <div className="mb-16 text-center">
      <h2 className="mb-4 text-3xl font-bold">Notre Processus de Travail</h2>
      <p className="mx-auto max-w-2xl text-muted-foreground">
        Une approche structurée pour des résultats exceptionnels
      </p>
    </div>
    <div className="relative mx-auto max-w-3xl pl-12 md:pl-16">
      {/* Ligne verticale à gauche */}
      <div className="absolute left-5 md:left-6 top-0 h-full w-px bg-border"></div>
      
      <div className="space-y-12">
        {processSteps.map((step) => (
          <div key={step.number} className="relative flex items-start">
            {/* Cercle avec numéro */}
            <div className="absolute -left-12 md:-left-16 z-10">
              <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {step.number}
              </div>
            </div>
            
            {/* Contenu à droite */}
            <div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
    </div>
  )
}