import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import TinyMCEEditor from '../../editor/Editor';
import { useCreateRealisation } from '../contexts/CreateRealisationContext';

const CreateRealisationTwo: React.FC = () => {
  const {
    content,
    handleChangeContent,
    formErrors,
  } = useCreateRealisation();

  return (
    <div className="space-y-10">
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

export default CreateRealisationTwo;
