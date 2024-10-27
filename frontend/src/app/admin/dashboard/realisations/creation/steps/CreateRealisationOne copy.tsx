import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import TinyMCEEditor from '../../editor/Editor';
import { useCreateRealisation } from '../contexts/CreateRealisationContext';

const CreateRealisationOne: React.FC = () => {
  const {
    formData,
    handleChangeFormData,
    content,
    handleChangeContent,
    formErrors,
  } = useCreateRealisation();

  return (
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Détails de la Réalisation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-10">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-base">
              Titre
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleChangeFormData}
              placeholder="Ma réalisation"
              className={
                formErrors.title
                  ? 'max-w-lg outline outline-1 outline-red-500'
                  : 'max-w-lg'
              }
            />
            {formErrors.title && (
              <p className="text-sm text-red-600">{formErrors.title}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Ce titre apparaîtra comme le nom principal de votre article.
            </p>
          </div>
          <div className="space-y-3">
            <Label htmlFor="slug" className="text-base">
              Slug
            </Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={handleChangeFormData}
              placeholder="ma-realisation"
              className={
                formErrors.slug
                  ? 'max-w-lg outline outline-1 outline-red-500'
                  : 'max-w-lg'
              }
            />
            {formErrors.slug && (
              <p className="text-sm text-red-600">{formErrors.slug}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Le slug est une version simplifiée du titre de l'article, utilisé
              dans l'URL.
              <br />
              Il ne doit contenir que des lettres minuscules (sans accent), des
              chiffres et des tirets.
              <br />
              Par exemple, pour un article intitulé "Mon Premier Projet", le
              slug pourrait être "mon-premier-projet".
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-3">
        <Label className="text-xl font-semibold text-card-foreground">
          Contenu de la réalisation
        </Label>
        <TinyMCEEditor content={content} setContent={handleChangeContent} />
        {formErrors.content && (
          <p className="text-sm text-red-600">{formErrors.content}</p>
        )}
      </div>
    </div>
  );
};

export default CreateRealisationOne;
