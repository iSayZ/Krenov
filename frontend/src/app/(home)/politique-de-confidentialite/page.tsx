import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          Politique de confidentialité | {process.env.NEXT_PUBLIC_APP_NAME}
        </title>
        <meta name="description" content="Politique de confidentialité" />
      </Head>

      <section id="privacy" className="mx-auto mt-16 max-w-4xl px-4 py-8">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Politique de Confidentialité
            </CardTitle>
            <p className="text-sm italic text-muted-foreground">
              Dernière mise à jour:{' '}
              {new Date().toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-base">
              Chez {process.env.NEXT_PUBLIC_APP_NAME}, nous accordons une grande
              importance à la protection de vos données personnelles. Cette
              politique de confidentialité a pour but de vous informer sur la
              manière dont nous collectons, utilisons et protégeons vos
              informations lorsque vous utilisez notre site web et nos services
              de rénovation.
            </p>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                1. Informations que nous collectons
              </h2>
              <Separator />
              <p className="text-base">
                Lorsque vous nous contactez via notre formulaire de contact ou
                de demande de devis, nous collectons les informations suivantes:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse postale</li>
                <li>Détails concernant votre projet de rénovation</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                2. Utilisation des informations
              </h2>
              <Separator />
              <p className="text-base">
                Nous utilisons les informations collectées pour:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Vous contacter concernant votre demande de devis ou
                  d'information
                </li>
                <li>Préparer et vous envoyer un devis personnalisé</li>
                <li>Assurer le suivi de votre projet de rénovation</li>
                <li>Améliorer nos services et votre expérience utilisateur</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                3. Conservation des données
              </h2>
              <Separator />
              <p className="text-base">
                Vos données personnelles sont conservées dans notre base de
                données sécurisée pendant la durée nécessaire à la réalisation
                des finalités pour lesquelles elles ont été collectées, ou pour
                une période déterminée par les obligations légales et
                réglementaires.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                4. Partage des informations
              </h2>
              <Separator />
              <p className="text-base">
                Nous ne partageons pas vos informations personnelles avec des
                tiers, sauf dans les cas suivants:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Avec votre consentement explicite</li>
                <li>
                  Si nécessaire pour la réalisation de votre projet
                  (sous-traitants, fournisseurs)
                </li>
                <li>Si requis par la loi ou par une autorité compétente</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">5. Sécurité des données</h2>
              <Separator />
              <p className="text-base">
                Nous mettons en œuvre des mesures de sécurité techniques et
                organisationnelles appropriées pour protéger vos données
                personnelles contre la perte, l'accès non autorisé, la
                divulgation, l'altération ou la destruction.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">6. Vos droits</h2>
              <Separator />
              <p className="text-base">
                Conformément à la réglementation applicable en matière de
                protection des données personnelles, vous disposez des droits
                suivants:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification de vos données personnelles</li>
                <li>Droit à l'effacement de vos données personnelles</li>
                <li>
                  Droit à la limitation du traitement de vos données
                  personnelles
                </li>
                <li>Droit à la portabilité de vos données personnelles</li>
                <li>
                  Droit d'opposition au traitement de vos données personnelles
                </li>
              </ul>
              <p className="mt-2 text-base">
                Pour exercer ces droits ou pour toute question concernant le
                traitement de vos données personnelles, vous pouvez nous
                contacter via le{' '}
                <Link
                  href="/contact"
                  className="font-semibold underline transition-opacity hover:opacity-50"
                >
                  formulaire de contact
                </Link>
                .
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                7. Cookies et technologies similaires
              </h2>
              <Separator />
              <p className="text-base">
                Notre site peut utiliser des cookies et des technologies
                similaires pour améliorer votre expérience de navigation. Vous
                pouvez configurer votre navigateur pour refuser tous les cookies
                ou pour être averti lorsqu'un cookie est envoyé.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                8. Modifications de la politique de confidentialité
              </h2>
              <Separator />
              <p className="text-base">
                Nous nous réservons le droit de modifier cette politique de
                confidentialité à tout moment. Toute modification sera publiée
                sur cette page avec une date de mise à jour. Cette politique de
                confidentialité est temporaire et sera mise à jour lors de la
                phase finale de développement.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">9. Contact</h2>
              <Separator />
              <p className="text-base">
                Si vous avez des questions concernant cette politique de
                confidentialité, veuillez nous contacter via le{' '}
                <Link
                  href="/contact"
                  className="font-semibold underline transition-opacity hover:opacity-50"
                >
                  formulaire de contact
                </Link>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default PrivacyPolicy;
