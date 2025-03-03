'use client';

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Types
type ContactInfo = {
  icon: React.ElementType;
  title: string;
  details: string;
  link?: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  service: string;
};

// Données statiques
const contactInfo: ContactInfo[] = [
  {
    icon: MapPin,
    title: 'Notre adresse',
    details: '123 Rue de la Rénovation, 75000 Paris, France',
    link: 'https://maps.google.com/?q=123+Rue+de+la+Rénovation+75000+Paris+France',
  },
  {
    icon: Phone,
    title: 'Téléphone',
    details: '+33 1 23 45 67 89',
    link: 'tel:+33123456789',
  },
  {
    icon: Mail,
    title: 'Email',
    details: 'contact@renovexpert.fr',
    link: 'mailto:contact@renovexpert.fr',
  },
  {
    icon: Clock,
    title: "Horaires d'ouverture",
    details: 'Lun-Ven: 9h-18h | Sam: 10h-15h',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Ici, vous intégreriez votre logique d'envoi du formulaire
      // Par exemple avec fetch ou axios vers votre API

      // Simulation d'un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simuler une réponse réussie
      setFormStatus('success');

      // Réinitialiser le formulaire après succès
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        service: '',
      });
    } catch (error) {
      setFormStatus('error');
      console.error("Erreur lors de l'envoi du formulaire:", error);
    } finally {
      setIsSubmitting(false);

      // Réinitialiser le statut après quelques secondes
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };

  return (
    <div className="mt-16 flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[40vh]">
        <Image
          src="/assets/images/contact/hero-bg.jpg"
          alt="Contactez-nous"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-6 p-4 text-center">
            <h1 className="max-w-4xl text-4xl font-bold text-white md:text-6xl">
              Contactez-Nous
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-200">
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info et Formulaire */}
      <section className="bg-background py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-3">
            {/* Informations de contact */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold md:text-3xl">
                Nos Coordonnées
              </h2>
              <p className="text-muted-foreground">
                N'hésitez pas à nous contacter par téléphone, email ou en
                remplissant le formulaire. Notre équipe se fera un plaisir de
                vous répondre dans les plus brefs délais.
              </p>

              <div className="space-y-8 md:space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 rounded-full bg-primary/10 p-3">
                      <info.icon className="size-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-primary hover:underline"
                          target={info.icon === MapPin ? '_blank' : undefined}
                          rel={
                            info.icon === MapPin
                              ? 'noopener noreferrer'
                              : undefined
                          }
                        >
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <h2 className="mb-6 text-2xl font-bold">
                    Envoyez-nous un message
                  </h2>

                  {formStatus === 'success' && (
                    <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-900/20">
                      <CheckCircle2 className="size-4 text-green-500" />
                      <AlertTitle>Message envoyé!</AlertTitle>
                      <AlertDescription>
                        Merci pour votre message. Nous vous répondrons dans les
                        plus brefs délais.
                      </AlertDescription>
                    </Alert>
                  )}

                  {formStatus === 'error' && (
                    <Alert className="mb-6 border-red-500 bg-red-50 dark:bg-red-900/20">
                      <AlertCircle className="size-4 text-red-500" />
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>
                        Une erreur est survenue lors de l'envoi du message.
                        Veuillez réessayer.
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Votre nom"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="votre.email@exemple.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Votre numéro de téléphone"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Service souhaité</Label>
                        <Select
                          onValueChange={handleSelectChange}
                          value={formData.service}
                        >
                          <SelectTrigger id="service">
                            <SelectValue placeholder="Sélectionnez un service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="renovation-complete">
                              Rénovation complète
                            </SelectItem>
                            <SelectItem value="cuisine">Cuisine</SelectItem>
                            <SelectItem value="salle-de-bain">
                              Salle de bain
                            </SelectItem>
                            <SelectItem value="commercial">
                              Commercial
                            </SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="L'objet de votre message"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Détaillez votre projet ou votre demande..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? 'Envoi en cours...'
                        : 'Envoyer le message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ (Optionnelle) */}
      <section className="bg-accent py-24">
        <div className="container">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold">Questions Fréquentes</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Retrouvez les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  Proposez-vous des devis gratuits ?
                </h3>
                <p className="text-muted-foreground">
                  Oui, nous proposons des devis détaillés et entièrement
                  gratuits sans engagement pour tous vos projets de rénovation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  Quels sont vos délais moyens de réalisation ?
                </h3>
                <p className="text-muted-foreground">
                  Les délais varient selon la nature et l'ampleur des travaux.
                  Une cuisine peut prendre 2 à 3 semaines, tandis qu'une
                  rénovation complète peut s'étendre sur 1 à 3 mois.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  Travaillez-vous dans toute la région ?
                </h3>
                <p className="text-muted-foreground">
                  Nous intervenons principalement dans Paris et sa région
                  (Île-de-France). Pour les projets plus éloignés,
                  contactez-nous pour étudier la faisabilité.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  Offrez-vous des garanties sur vos travaux ?
                </h3>
                <p className="text-muted-foreground">
                  Absolument. Tous nos travaux sont garantis pendant 10 ans pour
                  la structure et 2 ans pour les éléments d'équipement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  Puis-je voir des exemples de vos réalisations ?
                </h3>
                <p className="text-muted-foreground">
                  Bien sûr, vous pouvez consulter notre portfolio sur notre site
                  ou nous contacter pour organiser une visite de chantiers
                  terminés ou en cours.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  Proposez-vous des facilités de paiement ?
                </h3>
                <p className="text-muted-foreground">
                  Oui, nous proposons un échelonnement des paiements selon
                  l'avancement des travaux. Nous pouvons également vous orienter
                  vers des solutions de financement adaptées.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
