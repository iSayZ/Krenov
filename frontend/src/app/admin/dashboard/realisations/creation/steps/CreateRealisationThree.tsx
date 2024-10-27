import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useCreateRealisation } from '../contexts/CreateRealisationContext';

const CreateRealisationThree: React.FC = () => {
  const {
    formData,
    handleFileChange,
    newTag,
    setNewTag,
    handleAddTag,
    removeTag,
    handleChangeStatus,
    formErrors,
  } = useCreateRealisation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Metadonnées de la réalisation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-10">
          <div className="space-y-3">
            <Label htmlFor="header" className="text-base">
              Image d'en-tête
            </Label>
            <Input
              id="header"
              type="file"
              onChange={handleFileChange}
              className={
                formErrors.header
                  ? 'max-w-xs cursor-pointer outline outline-1 outline-red-500'
                  : 'max-w-xs cursor-pointer'
              }
            />
            {formErrors.header && (
              <p className="text-sm text-red-600">{formErrors.header}</p>
            )}
            <p className="text-sm text-muted-foreground">
              L'image d'en-tête représente visuellement votre article et doit
              capter l'attention des lecteurs.
              <br />
              Choisissez une image de haute qualité qui reflète le contenu de
              votre article.
            </p>
          </div>
          <div className="space-y-3">
            <Label htmlFor="title" className="text-base">
              Tags
            </Label>
            <div className="flex gap-4">
              <Input
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="mot-clé"
                className={
                  formErrors.tags
                    ? 'max-w-xs outline outline-1 outline-red-500'
                    : 'max-w-xs'
                }
              />
              <Button onClick={handleAddTag}>Ajouter</Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex w-full flex-wrap gap-1">
                {formData.tags?.map((tag, index) => (
                  <Badge
                    key={`${tag}-${index}`}
                    className="flex w-max items-center gap-2 bg-blue-600 px-3 hover:bg-blue-500"
                  >
                    <p className="text-sm">{tag}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-5"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="size-4" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
            {formErrors.tags && (
              <p className="text-sm text-red-600">{formErrors.tags}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Ajoutez jusqu'à{' '}
              <span className="font-semibold">5 tags en minuscule</span> qui
              aideront à mieux référencer votre article.
              <br />
              Utilisez des mots-clés pertinents qui décrivent le contenu de
              votre article.
            </p>
          </div>
          <div className="space-y-3">
            <Label className="text-base">Statut de la réalisation</Label>
            <Select value={formData.status} onValueChange={handleChangeStatus}>
              <SelectTrigger className="max-w-32">
                <SelectValue placeholder="Sélectionnez un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="active">Activé</SelectItem>
                  <SelectItem value="desactive">Désactivé</SelectItem>
                  <SelectItem value="draft">Brouillon</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-lime-500" />
              <p className="text-sm text-muted-foreground">
                Activé : L'article est publié et visible par tous les
                utilisateurs.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-red-600" />
              <p className="text-sm text-muted-foreground">
                Désactivé : L'article n'est pas accessible au public.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-amber-500" />
              <p className="text-sm text-muted-foreground">
                Brouillon : L'article est en cours de rédaction et n'est pas
                encore prêt à être publié.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateRealisationThree;
