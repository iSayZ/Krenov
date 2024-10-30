import DOMPurify from 'dompurify';
import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useModifyRealisation } from '@/app/admin/dashboard/contexts/ModifyRealisationContext';
import { Realisation } from '@/types/realisation.interface';

const ModifyRealisationFour: React.FC = () => {
  const { content, formData } = useModifyRealisation();

  // To clean html, prievent to XSS Attack
  const cleanContent = DOMPurify.sanitize(content);

  // To return good color of status
  const returnColorOfStatus = (status: Realisation['status']) => {
    switch (status) {
      case 'active':
        return 'lime-500';
      case 'desactive':
        return 'red-600';
      case 'draft':
        return 'amber-500';
    }
  };

  // To return status in french
  const returnFrenchOfStatus = (status: Realisation['status']) => {
    switch (status) {
      case 'active':
        return 'Activé';
      case 'desactive':
        return 'Désactivé';
      case 'draft':
        return 'Brouillon';
    }
  };

  return (
    <div className="space-y-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Informations de l'article</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full space-y-10 lg:space-y-0">
            <div className="max-lg:space-y-10 lg:flex lg:items-center lg:justify-around lg:gap-6">
              {formData.header && (
                <div className="w-full lg:float-left lg:max-w-sm">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={formData.header}
                      fill
                      alt="Image d'en-tête de l'article"
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
              )}
              <div className="space-y-10 lg:h-full lg:flex-none">
                <div className="space-y-2">
                  <p>
                    <span className="font-bold">Titre :</span>
                  </p>
                  <p>{formData.title}</p>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-bold">Slug :</span>
                  </p>
                  <p>{formData.slug}</p>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-bold">Statut :</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`bg-${returnColorOfStatus(formData.status)} size-2 rounded-full`}
                    />
                    <p>{returnFrenchOfStatus(formData.status)}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-bold">Tags :</span>
                  </p>
                  {formData.tags.length > 0 ? (
                    <div className="flex w-full flex-wrap gap-1">
                      {formData.tags?.map((tag, index) => (
                        <Badge
                          key={`${tag}-${index}`}
                          className="flex w-max items-center gap-2 bg-blue-600 px-3 hover:bg-blue-600"
                        >
                          <p className="text-sm">{tag}</p>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p>Aucun tag</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Contenu de l'article</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full justify-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">{formData.title}</h1>
              <div
                className="prose w-full"
                dangerouslySetInnerHTML={{ __html: cleanContent }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModifyRealisationFour;
