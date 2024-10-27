'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { createRealisation } from '@/api/realisationsApi';
import { uploadHeaderRealisation, uploadRealisationImage } from '@/api/uploadApi';
import { formatDateForUX } from '@/lib/dateUtils';

import { Section } from '../../components/template/TopbarMenu';
import { useVisitedSection } from '../../contexts/VisitedSectionContext';

import { useCreateRealisation } from './contexts/CreateRealisationContext';
import CreateRealisationOne from './steps/CreateRealisationOne';
import CreateRealisationTwo from './steps/CreateRealisationTwo';
import CreateRealisationThree from './steps/CreateRealisationThree';
import CreateRealisationFour from './steps/CreateRealisationFour';

const section: Section = {
  items: [
    {
      path: '/admin/dashboard/accueil',
      name: 'Dashboard',
    },
    {
      path: '/admin/dashboard/realisations',
      name: 'Réalisations',
    },
  ],
  page: {
    path: '/admin/dashboard/realisation/creation',
    name: 'Ajouter une réalisation',
  },
};

const CreateRealisationPage: React.FC = () => {
  const {
    step,
    setStep,
    content,
    formData,
    header,
    formErrors,
    setFormErrors,
  } = useCreateRealisation();

  const { setVisitedSection } = useVisitedSection();

  useEffect(() => {
    setVisitedSection(section);
  }, [setVisitedSection]);

  const router = useRouter();

  // To go to previous step
  const handlePrevStep = () => {
    setStep((step) => step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // To go to next step
  const handleNextStep = () => {
    // Condition of step 1
    if (step === 1 && (!formData.title || !formData.slug)) {
      if (!formData.title) {
        setFormErrors((prev) => ({
          ...prev,
          title: 'Le champ titre est obligatoire.',
        }));
      }
      if (!formData.slug) {
        setFormErrors((prev) => ({
          ...prev,
          slug: 'Le champ slug est obligatoire.',
        }));
      }
      return;
    }

    // Condition of step 2
    if (step === 2 && (!content)) {
        return setFormErrors((prev) => ({
          ...prev,
          content: 'Le champ contenu est obligatoire.',
        }));
    }

    // Condition of step 3
    if (step === 3 && !header) {
      return setFormErrors((prev) => ({
        ...prev,
        header: "L'image d'en-tête est obligatoire.",
      }));
    }

    setStep((step) => step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step Informations
  const [stepInfo, setStepInfo] = useState<string>('');

  // Return details according to current step
  useEffect(() => {
    switch (step) {
      case 1:
        setStepInfo("Renseignez le titre, le slug et le contenu de l'article");
        break;
      case 2:
        setStepInfo(
          "Ajoutez les tags, sélectionnez le statut et téléchargez l'image d'en-tête"
        );
        break;
      case 3:
        setStepInfo('Revoyez et finalisez votre article avant publication.');
        break;
        default:
          setStepInfo('Revoyez et finalisez votre article avant publication.');
        break;
    }
  }, [step]);

  const extractImageSourcesFromHtml = (htmlString: string) => {
    const imageSources: string[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Select all <img>
    doc.querySelectorAll('img').forEach((img) => {
        // Get only path of src
        const path = img.src.split(`${process.env.NEXT_PUBLIC_API_BASE_URL}`)[1];
        imageSources.push(path);
    });

    // Return array of path src
    return imageSources;
  } 

  // Submit to create realisation
  const handleSubmit = async () => {
    if (!header) return;

    // Prepare header to upload
    const image = new FormData();
    image.append('file', header);

    // Uploading header
    const srcHeader = await uploadRealisationImage(image, formData.slug);

    const imageUrls = extractImageSourcesFromHtml(content);

    const realisation = {
      ...formData,
      content,
      header: srcHeader,
      imageUrls,
    };

    // Call API to create
    try {
      const response = await createRealisation(realisation);
      if (response.success) {
        toast.success('Réalisation publié avec succés.', {
          description: formatDateForUX(new Date().toISOString()),
          action: {
            label: 'Fermer',
            onClick: () => '',
          },
        });
        router.push('/admin/dashboard/realisations');
      }
    } catch (error) {
      console.error(error);
      toast.warning('Erreur lors de la publication.', {
        description: formatDateForUX(new Date().toISOString()),
        action: {
          label: 'Fermer',
          onClick: () => '',
        },
      });
    }
  };

  return (
    <div className="m-auto size-full space-y-10 2xl:w-2/3">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Ajouter une réalisation</h1>
        <h2 className="italic">
          Étape {step} - {stepInfo}
        </h2>
      </div>
      <div>
        {step === 1 && <CreateRealisationOne />}
        {step === 2 && <CreateRealisationTwo />}
        {step === 3 && <CreateRealisationThree />}
        {step === 4 && <CreateRealisationFour />}
      </div>
      <div className="flex w-full justify-between">
        <Button variant="destructive">Annuler</Button>
        <div className="space-x-4">
          {step > 1 && <Button onClick={handlePrevStep}>Précédent</Button>}
          {step < 3 ? (
            <Button onClick={handleNextStep}>Suivant</Button>
          ) : (
            <Button onClick={handleSubmit}>Publier</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateRealisationPage;
