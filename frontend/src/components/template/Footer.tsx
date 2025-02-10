import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

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
    { name: 'Conditions d\'utilisation', href: '/terms' },
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
}

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="flex flex-col items-center xl:flex-row xl:justify-center">
          <div className="space-y-8 max-w-md text-center xl:text-left">
            <Link href="/" className="text-primary text-2xl font-bold">
              RénoExpert
            </Link>
            <p className="text-muted-foreground text-sm leading-6">
              Transformez votre espace avec notre expertise en rénovation résidentielle et commerciale.
            </p>
            <div className="flex flex-col items-center gap-3 xl:items-start">
              <div className="flex items-center gap-2">
                <Phone className="text-primary size-5" />
                <span className="text-muted-foreground text-sm">+1 (514) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-primary size-5" />
                <span className="text-muted-foreground text-sm">contact@renoexpert.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-primary size-5" />
                <span className="text-muted-foreground text-sm">123 Rue de la Rénovation, Montréal, QC</span>
              </div>
            </div>
          </div>
          <hr className="block w-2/3 xl:hidden border-gray-900/10 mt-16" />
          <div className="mt-16 flex flex-wrap gap-8 xl:flex-1 xl:mt-0">
            <div className="flex flex-col flex-1 gap-12 md:flex-row md:justify-end md:gap-8">
              <div className="min-w-40 text-center">
                <h3 className="text-md font-semibold leading-6">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-muted-foreground hover:text-primary text-sm leading-6">
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
                      <Link href={item.href} className="text-muted-foreground hover:text-primary text-sm leading-6">
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
                      <Link href={item.href} className="text-muted-foreground hover:text-primary text-sm leading-6">
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
            <p className="text-muted-foreground text-xs leading-5">&copy; 2024 RénoExpert. Tous droits réservés.</p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link key={item.name} href={item.href} className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="size-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}