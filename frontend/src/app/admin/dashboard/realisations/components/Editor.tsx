'use client';

import { Editor } from '@tinymce/tinymce-react';

import { uploadRealisationImage } from '@/api/uploadApi';

interface EditorProps {
  content: string;
  setContent: (value: string) => void;
  source: string;
}

const TinyMCEEditor: React.FC<EditorProps> = ({
  content,
  setContent,
  source,
}) => {
  return (
    <>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        value={content}
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          language: 'fr_FR',
          height: 500,
          menubar: true,
          plugins: [
            'autolink',
            'link',
            'fullscreen',
            'image',
            'emoticons',
            'lists',
            'preview',
            'searchreplace',
            'autosave',
          ],
          toolbar:
            'undo redo | preview restoredraft | styles | bold italic underline | link image emoticons | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | searchreplace fullscreen',
          advlist_bullet_styles: 'default',
          font_size_input_default_unit: 'px',
          image_caption: true, // To add legend at a picture
          image_dimensions: true, // To resize a picture
          images_reuse_filename: true, // Keep picture name
          file_picker_types: 'image',
          file_picker_callback: (cb) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.onchange = async () => {
              const file = input.files ? input.files[0] : null;
              if (file) {
                const image = new FormData();
                image.append('file', file);
                try {
                  const url = await uploadRealisationImage(image, source);
                  cb(url);
                } catch (error) {
                  console.error('Error uploading image:', error);
                }
              }
            };
            input.click();
            alert(`Pour que l'image occupe toute la largeur de l'article, veuillez entrer les dimensions appropriées :\n
              Largeur = 100%\n
              Hauteur = auto\n`);
          },
        }}
      />
    </>
  );
};

export default TinyMCEEditor;
