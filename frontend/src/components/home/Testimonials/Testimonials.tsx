import { Quote, Star } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      content:
        `L'équipe de ${process.env.NEXT_PUBLIC_APP_NAME} a transformé notre cuisine démodée en un espace moderne et fonctionnel. Leur professionnalisme et leur attention aux détails sont remarquables.`,
      author: 'Marie Dubois',
      role: 'Propriétaire résidentiel',
    },
    {
      content:
        'Un travail exceptionnel pour la rénovation de notre bureau. Le projet a été livré dans les délais et le budget. Hautement recommandé!',
      author: 'Jean Martin',
      role: 'Directeur commercial',
    },
    {
      content:
        `De la conception à la réalisation, ${process.env.NEXT_PUBLIC_APP_NAME} a su concrétiser notre vision. Une équipe à l'écoute et des résultats qui dépassent nos attentes.`,
      author: 'Sophie Tremblay',
      role: 'Propriétaire résidentiel',
    },
  ];

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="flex w-full flex-col items-center px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ce que disent nos clients</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Découvrez les témoignages de nos clients satisfaits
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-6">
                <Quote className="mb-4 size-8 text-primary" />
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-current text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">
                  {testimonial.content}
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
