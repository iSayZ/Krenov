import Link from "next/link";

import { Button } from "@/components/ui/button";

const CallToAction: React.FC = () => {
    return (
        <section className="bg-primary/80 text-primary-foreground py-24">
        <div className="flex w-full flex-col items-center px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Prêt à transformer votre espace?</h2>
            <p className="text-primary-foreground/90 mb-8">
              Contactez-nous dès aujourd'hui pour un devis gratuit et donnez vie à votre projet de rénovation
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
    )
}

export default CallToAction;