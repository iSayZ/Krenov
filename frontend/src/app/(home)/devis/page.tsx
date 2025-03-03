'use client';

import {
  Paintbrush,
  Twitch as Kitchen,
  Bath,
  Building2,
  CheckCircle2,
  AlertCircle,
  Info,
  CalendarCheck,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

// Types
type ServiceType = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
};

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  serviceType: string;
  projectScope: string;
  budget: string;
  timeframe: string;
  description: string;
  propertyType: string;
  propertyAge: string;
  preferredContactMethod: string;
  preferredContactTime: string;
  newsletter: boolean;
};

// Données statiques
const services: ServiceType[] = [
  {
    id: 'renovation-complete',
    name: 'Rénovation complète',
    description:
      'Transformation totale de votre espace avec une approche clé en main.',
    icon: Paintbrush,
  },
  {
    id: 'cuisine',
    name: 'Cuisine',
    description:
      'Créez la cuisine de vos rêves, alliant fonctionnalité et esthétique.',
    icon: Kitchen,
  },
  {
    id: 'salle-de-bain',
    name: 'Salle de bain',
    description:
      'Modernisez votre salle de bain pour plus de confort et de style.',
    icon: Bath,
  },
  {
    id: 'commercial',
    name: 'Commercial',
    description: 'Solutions sur mesure pour vos espaces commerciaux.',
    icon: Building2,
  },
];

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  serviceType: '',
  projectScope: '',
  budget: '',
  timeframe: '',
  description: '',
  propertyType: '',
  propertyAge: '',
  preferredContactMethod: 'email',
  preferredContactTime: 'matin',
  newsletter: false,
};

export default function QuotePage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleRadioChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier si le formulaire est complet avant d'envoyer
    if (currentStep !== 3 || !submitClicked) {
      nextStep();
      return;
    }

    setIsSubmitting(true);

    try {
      // Ici, vous intégreriez votre logique d'envoi du formulaire
      // Par exemple avec fetch ou axios vers votre API

      // Simulation d'un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simuler une réponse réussie
      setFormStatus('success');
    } catch (error) {
      setFormStatus('error');
      console.error("Erreur lors de l'envoi du formulaire:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Déterminer si l'étape actuelle est complète
  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.fullName && !!formData.email && !!formData.phone;
      case 2:
        return !!formData.serviceType && !!formData.projectScope;
      default:
        return true;
    }
  };

  // Rendu du contenu en fonction de l'étape
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="mb-8">
              <h3 className="mb-2 text-xl font-semibold">Vos Coordonnées</h3>
              <p className="text-muted-foreground">
                Parlez-nous de vous pour que nous puissions vous contacter.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="fullName">Nom complet</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Votre nom complet"
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
                  onChange={handleInputChange}
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Votre numéro de téléphone"
                  required
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Adresse (optionnel)</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Adresse complète"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ville (optionnel)</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Votre ville"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Code postal (optionnel)</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Code postal"
                />
              </div>

              <div className="space-y-3 sm:col-span-2">
                <Label>Méthode de contact préférée</Label>
                <div className="mt-2 flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="contact-email"
                      name="preferredContactMethod"
                      value="email"
                      checked={formData.preferredContactMethod === 'email'}
                      onChange={(e) =>
                        handleRadioChange('preferredContactMethod')(
                          e.target.value
                        )
                      }
                      className="size-4 border-primary text-primary"
                    />
                    <Label htmlFor="contact-email" className="cursor-pointer">
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="contact-phone"
                      name="preferredContactMethod"
                      value="telephone"
                      checked={formData.preferredContactMethod === 'telephone'}
                      onChange={(e) =>
                        handleRadioChange('preferredContactMethod')(
                          e.target.value
                        )
                      }
                      className="size-4 border-primary text-primary"
                    />
                    <Label htmlFor="contact-phone" className="cursor-pointer">
                      Téléphone
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="contact-sms"
                      name="preferredContactMethod"
                      value="sms"
                      checked={formData.preferredContactMethod === 'sms'}
                      onChange={(e) =>
                        handleRadioChange('preferredContactMethod')(
                          e.target.value
                        )
                      }
                      className="size-4 border-primary text-primary"
                    />
                    <Label htmlFor="contact-sms" className="cursor-pointer">
                      SMS
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:col-span-2">
                <Label>Moment préféré pour vous contacter</Label>
                <div className="mt-2 flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="time-morning"
                      name="preferredContactTime"
                      value="matin"
                      checked={formData.preferredContactTime === 'matin'}
                      onChange={(e) =>
                        handleRadioChange('preferredContactTime')(
                          e.target.value
                        )
                      }
                      className="size-4 border-primary text-primary"
                    />
                    <Label htmlFor="time-morning" className="cursor-pointer">
                      Matin
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="time-afternoon"
                      name="preferredContactTime"
                      value="apres-midi"
                      checked={formData.preferredContactTime === 'apres-midi'}
                      onChange={(e) =>
                        handleRadioChange('preferredContactTime')(
                          e.target.value
                        )
                      }
                      className="size-4 border-primary text-primary"
                    />
                    <Label htmlFor="time-afternoon" className="cursor-pointer">
                      Après-midi
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="time-evening"
                      name="preferredContactTime"
                      value="soir"
                      checked={formData.preferredContactTime === 'soir'}
                      onChange={(e) =>
                        handleRadioChange('preferredContactTime')(
                          e.target.value
                        )
                      }
                      className="size-4 border-primary text-primary"
                    />
                    <Label htmlFor="time-evening" className="cursor-pointer">
                      Soir
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:col-span-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={handleCheckboxChange('newsletter')}
                />
                <Label htmlFor="newsletter" className="text-sm font-normal">
                  Je souhaite recevoir des informations sur les services et
                  promotions
                </Label>
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="mb-8">
              <h3 className="mb-2 text-xl font-semibold">Votre Projet</h3>
              <p className="text-muted-foreground">
                Parlez-nous de vos besoins en rénovation.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <Label>Type de service</Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {services.map((service) => (
                    <Card
                      key={service.id}
                      className={`cursor-pointer transition-all hover:border-primary ${
                        formData.serviceType === service.id
                          ? 'border-2 border-primary bg-primary/5'
                          : ''
                      }`}
                      onClick={() =>
                        handleSelectChange('serviceType')(service.id)
                      }
                    >
                      <CardContent className="flex items-start gap-4 p-4">
                        <service.icon className="mt-1 size-6 text-primary" />
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="projectScope">Ampleur du projet</Label>
                <Select
                  value={formData.projectScope}
                  onValueChange={handleSelectChange('projectScope')}
                >
                  <SelectTrigger id="projectScope">
                    <SelectValue placeholder="Sélectionner l'ampleur du projet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petite">
                      Petite rénovation (1-2 pièces)
                    </SelectItem>
                    <SelectItem value="moyenne">
                      Rénovation moyenne (3-4 pièces)
                    </SelectItem>
                    <SelectItem value="complete">
                      Rénovation complète
                    </SelectItem>
                    <SelectItem value="specifique">
                      Travaux spécifiques
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label htmlFor="propertyType">Type de propriété</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={handleSelectChange('propertyType')}
                >
                  <SelectTrigger id="propertyType">
                    <SelectValue placeholder="Sélectionner le type de propriété" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appartement">Appartement</SelectItem>
                    <SelectItem value="maison">Maison</SelectItem>
                    <SelectItem value="bureau">
                      Bureau / Local commercial
                    </SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label htmlFor="propertyAge">Âge approximatif du bien</Label>
                <Select
                  value={formData.propertyAge}
                  onValueChange={handleSelectChange('propertyAge')}
                >
                  <SelectTrigger id="propertyAge">
                    <SelectValue placeholder="Sélectionner l'âge du bien" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neuf">Moins de 5 ans</SelectItem>
                    <SelectItem value="recent">5-15 ans</SelectItem>
                    <SelectItem value="moyen">15-30 ans</SelectItem>
                    <SelectItem value="ancien">Plus de 30 ans</SelectItem>
                    <SelectItem value="historique">
                      Bâtiment historique
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="mb-8">
              <h3 className="mb-2 text-xl font-semibold">
                Détails et Finition
              </h3>
              <p className="text-muted-foreground">
                Précisez vos attentes et votre budget.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description du projet</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Décrivez votre projet en détail : vos besoins, vos inspirations, vos contraintes..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget approximatif</Label>
                <Select
                  value={formData.budget}
                  onValueChange={handleSelectChange('budget')}
                >
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Sélectionner votre budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moins-5k">Moins de 5 000 €</SelectItem>
                    <SelectItem value="5k-15k">5 000 € - 15 000 €</SelectItem>
                    <SelectItem value="15k-30k">15 000 € - 30 000 €</SelectItem>
                    <SelectItem value="30k-50k">30 000 € - 50 000 €</SelectItem>
                    <SelectItem value="50k-100k">
                      50 000 € - 100 000 €
                    </SelectItem>
                    <SelectItem value="plus-100k">Plus de 100 000 €</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeframe">Calendrier souhaité</Label>
                <Select
                  value={formData.timeframe}
                  onValueChange={handleSelectChange('timeframe')}
                >
                  <SelectTrigger id="timeframe">
                    <SelectValue placeholder="Quand souhaitez-vous démarrer ?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Dès que possible</SelectItem>
                    <SelectItem value="1-3-mois">Dans 1 à 3 mois</SelectItem>
                    <SelectItem value="3-6-mois">Dans 3 à 6 mois</SelectItem>
                    <SelectItem value="6-12-mois">Dans 6 à 12 mois</SelectItem>
                    <SelectItem value="plus-12-mois">
                      Dans plus de 12 mois
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-2">
                <Alert className="border-primary/20 bg-primary/5">
                  <Info className="size-4 text-primary" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription className="text-sm">
                    En soumettant ce formulaire, vous recevrez un devis
                    préliminaire par email sous 48h. Un de nos experts vous
                    contactera pour discuter de votre projet et programmer une
                    visite technique si nécessaire.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // Affichage d'une confirmation après soumission réussie
  if (formStatus === 'success') {
    return (
      <div className="flex flex-col">
        <section className="relative h-[40vh]">
          <Image
            src="/assets/images/devis/hero-bg.jpg"
            alt="Demande de devis"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-6 p-4 text-center">
              <h1 className="max-w-4xl text-4xl font-bold text-white md:text-6xl">
                Demande de Devis
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-gray-200">
                Recevez une estimation gratuite pour votre projet
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="container max-w-3xl">
            <Card className="overflow-hidden">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="size-10 text-green-600" />
                </div>
                <h2 className="mb-2 text-2xl font-bold">
                  Demande Envoyée avec Succès!
                </h2>
                <p className="mb-6 text-muted-foreground">
                  Merci d'avoir soumis votre demande de devis. Nous avons bien
                  reçu vos informations et nous vous contacterons très bientôt.
                </p>
                <div className="mb-8 space-y-4 rounded-lg bg-accent p-4 text-left">
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="size-5 text-primary" />
                    <p className="text-sm font-medium">Prochaines étapes:</p>
                  </div>
                  <ol className="ml-6 list-decimal space-y-2 text-sm text-muted-foreground">
                    <li>Notre équipe analysera votre demande sous 24-48h</li>
                    <li>Vous recevrez un devis préliminaire par email</li>
                    <li>
                      Un conseiller vous contactera pour discuter des détails
                    </li>
                    <li>
                      Nous planifierons une visite technique si nécessaire
                    </li>
                  </ol>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button variant="outline" asChild>
                    <a href="/">Retour à l'accueil</a>
                  </Button>
                  <Button variant="default" asChild>
                    <a href="/contact">Nous contacter</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <section className="bg-background py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Obtenez un Devis Personnalisé
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Complétez ce formulaire pour nous aider à comprendre votre projet.
              Notre équipe vous contactera rapidement avec une estimation
              adaptée.
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit}>
                {/* Indicateur d'étapes */}
                <div className="mb-2 border-b">
                  <Tabs
                    value={currentStep.toString()}
                    className="w-full"
                    onValueChange={(value) => setCurrentStep(parseInt(value))}
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger
                        value="1"
                        disabled={isSubmitting}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        Coordonnées
                      </TabsTrigger>
                      <TabsTrigger
                        value="2"
                        disabled={!isStepComplete(1) || isSubmitting}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        Projet
                      </TabsTrigger>
                      <TabsTrigger
                        value="3"
                        disabled={!isStepComplete(2) || isSubmitting}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        Détails
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Contenu du formulaire */}
                <div className="p-6 sm:p-8">
                  {formStatus === 'error' && (
                    <Alert className="mb-6 border-red-500 bg-red-50 dark:bg-red-900/20">
                      <AlertCircle className="size-4 text-red-500" />
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>
                        Une erreur est survenue lors de l'envoi du formulaire.
                        Veuillez réessayer.
                      </AlertDescription>
                    </Alert>
                  )}

                  {renderStepContent()}

                  {/* Navigation entre les étapes */}
                  <div className="mt-8 flex justify-between">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={isSubmitting}
                      >
                        Précédent
                      </Button>
                    ) : (
                      <div></div>
                    )}

                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        variant="default"
                        onClick={nextStep}
                        disabled={!isStepComplete(currentStep) || isSubmitting}
                      >
                        Suivant
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="default"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? 'Envoi en cours...'
                          : 'Envoyer ma demande'}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <CheckCircle2 className="size-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">
                Gratuit et sans engagement
              </h3>
              <p className="text-sm text-muted-foreground">
                Notre service de devis est totalement gratuit et n'implique
                aucun engagement de votre part.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <CalendarCheck className="size-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Réponse rapide</h3>
              <p className="text-sm text-muted-foreground">
                Recevez une première estimation sous 48h et un devis détaillé
                après étude approfondie.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <Building2 className="size-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Visite technique</h3>
              <p className="text-sm text-muted-foreground">
                Un expert se déplace pour évaluer précisément vos besoins et
                affiner le devis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
