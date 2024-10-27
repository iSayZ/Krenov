import { Label } from '@/components/ui/label';

import { useModifyRealisation } from '../../../../contexts/ModifyRealisationContext';
import TinyMCEEditor from '../../../editor/Editor';

const ModifyRealisationTwo: React.FC = () => {
  const { formData, content, handleChangeContent, formErrors } = useModifyRealisation();

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <Label className="text-xl font-semibold text-card-foreground">
          Contenu de la réalisation
        </Label>
        <TinyMCEEditor content={content} setContent={handleChangeContent} source={formData.slug}/>
        {formErrors.content && (
          <p className="text-sm text-red-600">{formErrors.content}</p>
        )}
      </div>
    </div>
  );
};

export default ModifyRealisationTwo;
