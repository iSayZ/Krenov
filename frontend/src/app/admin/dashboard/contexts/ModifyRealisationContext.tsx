import React, { createContext, ReactNode, useContext, useState } from 'react';

import { Realisation } from '@/types/realisation.interface';

interface ModifyRealisationContextType {
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

const ModifyRealisationContext = createContext<
  ModifyRealisationContextType | undefined
>(undefined);

const ModifyRealisationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Step of creation
  const [step, setStep] = useState<number>(1);

  // Content of the article
  const [content, setContent] = useState<Realisation['content']>('');

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
    tags: [],
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
    <ModifyRealisationContext.Provider
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
    </ModifyRealisationContext.Provider>
  );
};

const useModifyRealisation = () => {
  const context = useContext(ModifyRealisationContext);
  if (context === undefined) {
    throw new Error(
      'useModifyRealisation must be used within a ModifyRealisationProvider'
    );
  }
  return context;
};

export { useModifyRealisation, ModifyRealisationProvider };
