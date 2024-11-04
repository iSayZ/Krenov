import { Label } from '@/components/ui/label';

import { useCreateRealisation } from '../../../contexts/CreateRealisationContext';
import TinyMCEEditor from '../../components/Editor';

const CreateRealisationTwo: React.FC = () => {
  const { formData, content, handleChangeContent, formErrors } =
    useCreateRealisation();

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <Label className="text-xl font-semibold text-card-foreground">
          Contenu de la réalisation
        </Label>
        <TinyMCEEditor
          content={content}
          setContent={handleChangeContent}
          source={formData.slug}
        />
        {formErrors.content && (
          <p className="text-sm text-red-600">{formErrors.content}</p>
        )}
      </div>
    </div>
  );
};

export default CreateRealisationTwo;
