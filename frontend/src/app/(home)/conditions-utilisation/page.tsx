import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const TermsOfService: NextPage = () => {
  return (
    <div className="size-full bg-secondary">
      <Head>
        <title>
          Conditions d'utilisation | {process.env.NEXT_PUBLIC_APP_NAME}
        </title>
        <meta name="description" content="Conditions générales d'utilisation" />
      </Head>

      <section
        id="conditions-utilisation"
        className="mx-auto mt-16 max-w-4xl px-4 py-8"
      >
        <Card className="w-full bg-background">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Conditions Générales d'Utilisation
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
              Bienvenue sur le site web de {process.env.NEXT_PUBLIC_APP_NAME}.
              Les présentes conditions générales d'utilisation régissent votre
              utilisation de notre site web et de nos services de rénovation. En
              accédant à notre site ou en utilisant nos services, vous acceptez
              d'être lié par ces conditions.
            </p>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                1. Acceptation des conditions
              </h2>
              <Separator />
              <p className="text-base">
                En accédant à ce site web ou en utilisant nos services, vous
                reconnaissez avoir lu, compris et accepté d'être lié par les
                présentes conditions générales. Si vous n'acceptez pas ces
                conditions, veuillez ne pas utiliser notre site ou nos services.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                2. Description des services
              </h2>
              <Separator />
              <p className="text-base">
                {process.env.NEXT_PUBLIC_APP_NAME} est une entreprise
                spécialisée dans la rénovation [type de rénovation]. Notre site
                web a pour objectif de vous présenter nos services, de vous
                permettre de nous contacter et de demander un devis
                personnalisé.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">3. Utilisation du site</h2>
              <Separator />
              <p className="text-base">
                Vous vous engagez à utiliser notre site conformément aux lois et
                réglementations en vigueur et de manière à ne pas nuire à son
                fonctionnement. Il est notamment interdit de:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Pirater ou tenter de pirater le site</li>
                <li>
                  Utiliser des robots, des scrapers ou d'autres moyens
                  automatisés pour accéder au site
                </li>
                <li>Diffuser des virus ou d'autres codes malveillants</li>
                <li>Collecter des informations sur d'autres utilisateurs</li>
                <li>Utiliser le site à des fins frauduleuses ou illégales</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                4. Demande de devis et contrats
              </h2>
              <Separator />
              <p className="text-base">
                La demande de devis via notre site ne constitue pas un
                engagement contractuel. Un contrat n'est formé qu'après
                acceptation écrite d'un devis par le client et confirmation de
                notre part. Nos devis sont valables pour une durée de [X] jours
                à compter de leur émission.
              </p>
              <p className="mt-2 text-base">
                Toute modification des travaux prévus doit faire l'objet d'un
                avenant écrit accepté par les deux parties.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">5. Prix et paiement</h2>
              <Separator />
              <p className="text-base">
                Les prix indiqués sur notre site sont donnés à titre indicatif
                et sont susceptibles de varier en fonction de la nature exacte
                des travaux à réaliser. Le prix définitif sera établi dans le
                devis personnalisé.
              </p>
              <p className="mt-2 text-base">
                Nos conditions de paiement sont les suivantes:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Acompte de [X]% à la signature du devis</li>
                <li>Paiement intermédiaire de [X]% à mi-chantier</li>
                <li>
                  Solde à la fin des travaux, après réception sans réserve
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">6. Délais d'exécution</h2>
              <Separator />
              <p className="text-base">
                Les délais d'exécution indiqués dans nos devis sont donnés à
                titre indicatif. Nous nous efforçons de les respecter, mais ne
                pouvons être tenus responsables des retards dus à des
                circonstances indépendantes de notre volonté (intempéries,
                retards de livraison des fournisseurs, etc.).
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">7. Garanties</h2>
              <Separator />
              <p className="text-base">
                Nos travaux de rénovation bénéficient des garanties légales en
                vigueur:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Garantie de parfait achèvement (1 an)</li>
                <li>Garantie biennale de bon fonctionnement (2 ans)</li>
                <li>
                  Garantie décennale (10 ans) pour les travaux affectant la
                  solidité de l'ouvrage
                </li>
              </ul>
              <p className="mt-2 text-base">
                Ces garanties s'appliquent dans les conditions prévues par la
                loi.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                8. Propriété intellectuelle
              </h2>
              <Separator />
              <p className="text-base">
                Tous les éléments du site (textes, images, logos, etc.) sont
                protégés par le droit de la propriété intellectuelle et
                appartiennent à {process.env.NEXT_PUBLIC_APP_NAME}. Toute
                reproduction, représentation ou utilisation de ces éléments sans
                autorisation préalable est interdite.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                9. Protection des données personnelles
              </h2>
              <Separator />
              <p className="text-base">
                La collecte et le traitement de vos données personnelles sont
                soumis à notre politique de confidentialité, que vous pouvez
                consulter
                <Link
                  href="/politique-de-confidentialite"
                  className="ml-1 font-semibold underline transition-opacity hover:opacity-50"
                >
                  ici
                </Link>
                . Cette politique fait partie intégrante des présentes
                conditions générales.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                10. Droit applicable et juridiction compétente
              </h2>
              <Separator />
              <p className="text-base">
                Les présentes conditions générales sont soumises au droit
                français. En cas de litige, une solution amiable sera recherchée
                en priorité. À défaut d'accord, les tribunaux de [ville] seront
                seuls compétents.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                11. Modifications des conditions
              </h2>
              <Separator />
              <p className="text-base">
                Nous nous réservons le droit de modifier les présentes
                conditions générales à tout moment. Les modifications prendront
                effet dès leur publication sur notre site. Nous vous
                encourageons à consulter régulièrement cette page.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">12. Contact</h2>
              <Separator />
              <p className="text-base">
                Pour toute question concernant ces conditions générales,
                veuillez nous contacter via le{' '}
                <Link
                  href="/contact"
                  className="font-semibold underline transition-opacity hover:opacity-50"
                >
                  formulaire de contact
                </Link>
              </p>
            </div>

            <p className="text-center text-sm italic text-muted-foreground">
              Ces conditions générales d'utilisation sont temporaires et seront
              mises à jour lors de la phase finale de développement.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default TermsOfService;
