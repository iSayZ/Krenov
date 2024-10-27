import React, { createContext, ReactNode, useContext, useState } from 'react';

import { Realisation } from '@/types/realisation.interface';

interface CreateRealisationContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleChangeContent: (newContent: string) => void;
  formData: Pick<Realisation, 'title' | 'slug' | 'tags' | 'status' | 'header'>;
  setFormData: React.Dispatch<
    React.SetStateAction<
      Pick<Realisation, 'title' | 'slug' | 'tags' | 'status' | 'header'>
    >
  >;
  header: File | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newTag: string;
  setNewTag: React.Dispatch<React.SetStateAction<string>>;
  handleAddTag: () => void;
  removeTag: (tagToRemove: string) => void;
  handleChangeStatus: (newStatus: 'active' | 'desactive' | 'draft') => void;
  handleChangeFormData: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formErrors: FormErrors;
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

interface FormErrors {
  title: string;
  slug: string;
  content: string;
  tags: string;
  header: string;
}

const CreateRealisationContext = createContext<
  CreateRealisationContextType | undefined
>(undefined);

const CreateRealisationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Step of creation
  const [step, setStep] = useState<number>(1);

  // Content of the article
  const [content, setContent] = useState<
    Realisation['content']
  >(`<p>Votre salle de bain m&eacute;rite d&rsquo;&ecirc;tre un espace &agrave; la fois fonctionnel et esth&eacute;tique, mais est-elle &agrave; la hauteur de vos attentes ? Chez [Nom de votre entreprise], nous sommes convaincus que chaque salle de bain peut devenir un v&eacute;ritable havre de paix. Laissez-nous vous inspirer avec l&rsquo;exemple d&rsquo;une r&eacute;cente transformation r&eacute;alis&eacute;e pour l&rsquo;un de nos clients, la famille Martin &agrave; Lyon.</p>
<h3>Avant : Une Salle de Bain D&eacute;mod&eacute;e</h3>
<p>Avant notre intervention, la salle de bain des Martin &eacute;tait le reflet d&rsquo;un style pass&eacute;. Carrelage beige us&eacute;, sanitaires d&eacute;mod&eacute;s et &eacute;clairage insuffisant en faisaient un lieu peu attrayant. Pour cette famille, il &eacute;tait temps d&rsquo;apporter une touche de modernit&eacute; et de confort.</p>
<h3>Apr&egrave;s : Un Espace Repens&eacute;</h3>
<p>Nous avons collabor&eacute; avec les Martin pour red&eacute;finir compl&egrave;tement leur salle de bain. Voici quelques-unes des transformations dont ils ont b&eacute;n&eacute;fici&eacute; :</p>
<ul>
<li><strong>Rev&ecirc;tement de Sol &Eacute;l&eacute;gant</strong> : Nous avons remplac&eacute; le vieux carrelage par un sol en vinyle imitation bois, qui apporte chaleur et &eacute;l&eacute;gance.</li>
<li><strong>Peinture Apaisante</strong> : Les murs ont &eacute;t&eacute; peints dans une douce teinte bleu ciel, cr&eacute;ant une atmosph&egrave;re sereine propice &agrave; la d&eacute;tente.</li>
<li><strong>Sanitaires Modernes</strong> : L&rsquo;installation d&rsquo;un double lavabo avec des vasques en pierre naturelle a apport&eacute; un look contemporain et une fonctionnalit&eacute; accrue.</li>
<li><strong>Douche &agrave; l&rsquo;Italienne</strong> : Pour un maximum de confort, nous avons install&eacute; une douche &agrave; l&rsquo;italienne avec parois en verre, donnant une impression d&rsquo;espace.</li>
<li><strong>&Eacute;clairage Optimis&eacute;</strong> : Un &eacute;clairage LED encastr&eacute; a &eacute;t&eacute; ajout&eacute;, offrant une luminosit&eacute; parfaite tout en &eacute;conomisant de l&rsquo;&eacute;nergie.</li>
</ul>
<h3>Pourquoi Choisir [Nom de votre entreprise] ?</h3>
<p>En choisissant [Nom de votre entreprise], vous optez pour l&rsquo;expertise et le savoir-faire de professionnels passionn&eacute;s. Notre &eacute;quipe s'engage &agrave; :</p>
<ul>
<li><strong>&Eacute;couter vos Besoins</strong> : Chaque projet est unique, et nous prenons le temps de comprendre vos attentes pour r&eacute;aliser la salle de bain de vos r&ecirc;ves.</li>
<li><strong>Conseiller avec Expertise</strong> : Nos designers d&rsquo;int&eacute;rieur vous guideront dans le choix des mat&eacute;riaux et des am&eacute;nagements pour maximiser le potentiel de votre espace.</li>
<li><strong>Garantir la Qualit&eacute;</strong> : Nous utilisons des mat&eacute;riaux de haute qualit&eacute; et des techniques de pointe pour vous offrir une r&eacute;novation durable et esth&eacute;tique.</li>
</ul>
<h3>Obtenez Votre Devis Gratuit</h3>
<p>Vous r&ecirc;vez d'une salle de bain moderne et fonctionnelle ? N&rsquo;attendez plus ! Contactez-nous d&egrave;s aujourd&rsquo;hui pour un <strong>devis gratuit</strong> et personnalis&eacute;. Nos experts se d&eacute;placeront chez vous pour discuter de votre projet et vous proposer des solutions adapt&eacute;es &agrave; votre budget.</p>
<p>Transformez votre salle de bain avec [Nom de votre entreprise]. Ensemble, r&eacute;alisons le projet qui vous correspond !</p>`);

  // To update content
  const handleChangeContent = (newContent: string) => {
    handleResetError('content');
    setContent(newContent);
  };

  // Other value of the article
  const [formData, setFormData] = useState<
    Pick<Realisation, 'title' | 'slug' | 'tags' | 'status' | 'header'>
  >({
    title: '',
    slug: '',
    tags: ['maison', 'rénovation', 'bain', 'douche', 'sanitaire'],
    status: 'draft',
    header: '',
  });

  // To update new value of article
  const handleChangeFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    handleResetError(id);
  };

  // Header file
  const [header, setHeader] = useState<File | null>(null);

  // Stock the header
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setHeader(file[0]);
      const url = URL.createObjectURL(file[0]);
      setFormData((prevData) => ({
        ...prevData,
        header: url,
      }));
    }
    handleResetError('header');
  };

  // Tag value
  const [newTag, setNewTag] = useState<string>('');

  // To add a new tag
  const handleAddTag = () => {
    handleResetError('tag');

    if (!newTag) {
      return setFormErrors((prev) => ({
        ...prev,
        tags: 'Le tag ne peut pas être vide.',
      }));
    }

    if (formData.tags.length >= 5) {
      return setFormErrors((prev) => ({
        ...prev,
        tags: 'Vous ne pouvez ajouter que 5 tags maximum.',
      }));
    }

    if (formData.tags.includes(newTag)) {
      return setFormErrors((prev) => ({
        ...prev,
        tags: 'Ce tag est déjà ajouté.',
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      tags: [...prevData.tags, newTag],
    }));

    setNewTag('');
  };

  // To delete a tag
  const removeTag = (tagToRemove: string) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // To change status
  const handleChangeStatus = (newStatus: 'active' | 'desactive' | 'draft') => {
    setFormData((prevData) => ({
      ...prevData,
      status: newStatus,
    }));
  };

  // Errors values
  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: '',
    slug: '',
    content: '',
    tags: '',
    header: '',
  });

  // To reset an error
  const handleResetError = (input: string) => {
    setFormErrors((prevError) => ({
      ...prevError,
      [input]: '',
    }));
  };

  return (
    <CreateRealisationContext.Provider
      value={{
        step,
        setStep,
        content,
        setContent,
        handleChangeContent,
        formData,
        setFormData,
        handleChangeFormData,
        header,
        handleFileChange,
        newTag,
        setNewTag,
        handleAddTag,
        removeTag,
        handleChangeStatus,
        formErrors,
        setFormErrors,
      }}
    >
      {children}
    </CreateRealisationContext.Provider>
  );
};

const useCreateRealisation = () => {
  const context = useContext(CreateRealisationContext);
  if (context === undefined) {
    throw new Error(
      'useCreateRealisation must be used within a CreateRealisationProvider'
    );
  }
  return context;
};

export { useCreateRealisation, CreateRealisationProvider };
