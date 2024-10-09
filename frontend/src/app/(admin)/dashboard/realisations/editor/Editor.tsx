// 'use client';

// import {
//   BasicTextStyleButton,
//   BlockTypeSelect,
//   ColorStyleButton,
//   CreateLinkButton,
//   FileCaptionButton,
//   FileReplaceButton,
//   FormattingToolbar,
//   FormattingToolbarController,
//   NestBlockButton,
//   TextAlignButton,
//   UnnestBlockButton,
//   useCreateBlockNote,
// } from '@blocknote/react';
// import React, { useState } from 'react';
// import '@blocknote/core/fonts/inter.css';
// import { locales } from '@blocknote/core';
// import { BlockNoteView } from '@blocknote/shadcn';

// import '@blocknote/shadcn/style.css';
// import { Button } from '@/components/ui/button';

// const Editor: React.FC = () => {
//   const editor = useCreateBlockNote({
//     dictionary: locales.fr, // Utiliser le dictionnaire français
//   });

//   const [exportedHtml, setExportedHtml] = useState<string | null>(null);

//   const handleExport = async () => {
//     if (editor) {
//       // Exporter le contenu en HTML
//       const html = await editor.blocksToFullHTML(editor.topLevelBlocks);

//       // Créer un conteneur temporaire pour manipuler le HTML
//       const tempDiv = document.createElement('div');
//       tempDiv.innerHTML = html;

//       // Ajouter des classes Tailwind aux images
//       const images = tempDiv.querySelectorAll('img');
//       images.forEach((img) => {
//         img.classList.add('max-w-full');
//       });

//       // Obtenir le HTML modifié
//       const modifiedHtml = tempDiv.innerHTML;

//       // Créer un blob et télécharger le fichier HTML
//       const blob = new Blob([modifiedHtml], { type: 'text/html' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'contenu-exporte.html';
//       a.click();
//       URL.revokeObjectURL(url);

//       // Optionnel: Afficher le contenu exporté
//       setExportedHtml(modifiedHtml);
//     }
//   };

//   return (
//     <div className="w-full">
//       {/* Affichage de l'éditeur BlockNote */}
//       <BlockNoteView editor={editor} />

//       {/* Bouton pour exporter le contenu en HTML */}
//       <Button
//         onClick={handleExport}
//         className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white"
//       >
//         Exporter en HTML
//       </Button>

//       {/* Optionnel: Afficher le contenu exporté */}
//       {exportedHtml && (
//         <div className="mt-6">
//           <h2 className="mb-2 text-xl font-semibold">Contenu Exporté :</h2>
//           <div className="rounded-lg bg-gray-100 p-4">
//             <pre>{exportedHtml}</pre>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Editor;
