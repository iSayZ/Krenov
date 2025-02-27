import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import Link from 'next/link';

const navigation = {
  services: [
    { name: 'Rénovation complète', href: '/services/renovation-complete' },
    { name: 'Cuisine', href: '/services/cuisine' },
    { name: 'Salle de bain', href: '/services/salle-de-bain' },
    { name: 'Commercial', href: '/services/commercial' },
  ],
  company: [
    { name: 'À propos', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Carrières', href: '/carrieres' },
  ],
  legal: [
    { name: 'Politique de confidentialité', href: '/privacy' },
    { name: "Conditions d'utilisation", href: '/terms' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-24">
        <div className="flex flex-col items-center xl:flex-row xl:justify-center">
          <div className="max-w-md space-y-8 text-center xl:text-left">
            <Link href="/" className="text-2xl font-bold text-primary">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Link>
            <p className="text-sm leading-6 text-muted-foreground">
              Transformez votre espace avec notre expertise en rénovation
              résidentielle et commerciale.
            </p>
            <div className="flex flex-col items-center gap-3 xl:items-start">
              <a href='tel:+33605360786' className="flex items-center gap-2 group">
                <Phone className="size-5 text-primary" />
                <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  0605360786
                </span>
              </a>
              <Link href='/contact' className="flex items-center gap-2 group">
                <Mail className="size-5 text-primary" />
                <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  contact@krenov.com
                </span>
              </Link>
              <Link target='_blank' href="https://www.google.fr/maps/place/10+Bd+de+la+Libert%C3%A9,+59000+Lille/@50.6374009,3.0493701,17z/data=!3m1!4b1!4m6!3m5!1s0x47c2d5804ac12807:0x6b1a412ed043d51!8m2!3d50.6374009!4d3.051945!16s%2Fg%2F11cs98q6tx?entry=ttu&g_ep=EgoyMDI1MDIyNC4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D" className="flex items-center gap-2 group">
                <MapPin className="size-5 text-primary" />
                <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  10 Bd de la Liberté, 59000 Lille, France
                </span>
              </Link>
            </div>
          </div>
          <hr className="mt-16 block w-2/3 border-gray-900/10 xl:hidden" />
          <div className="mt-16 flex flex-wrap gap-8 xl:mt-0 xl:flex-1">
            <div className="flex flex-1 flex-col gap-12 md:flex-row md:justify-end md:gap-8">
              <div className="min-w-40 text-center">
                <h3 className="text-md font-semibold leading-6">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-muted-foreground hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-40 text-center">
                <h3 className="text-md font-semibold leading-6">Entreprise</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-muted-foreground hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-40 text-center">
                <h3 className="text-md font-semibold leading-6">Légal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-muted-foreground hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col-reverse items-center gap-8 sm:flex-row sm:justify-between">
            <p className="text-center text-xs leading-5 text-muted-foreground">
              &copy; {new Date().getFullYear()}{' '}
              {process.env.NEXT_PUBLIC_APP_NAME}. Tous droits réservés. Site web
              conçu et développé par
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/alexis-estrine/"
                className="ml-1 font-semibold underline hover:text-primary"
              >
                Alexis Estrine
              </Link>
              .
            </p>

            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="size-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
