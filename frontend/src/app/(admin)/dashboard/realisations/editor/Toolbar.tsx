// // components/Toolbar.tsx

// import { Bold, Italic, Strikethrough, Underline } from 'lucide-react';
// import React from 'react';

// import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// interface ToolbarProps {
//   editor: any; // Remplacez par le type approprié si vous avez des définitions pour l'éditeur
// }

// const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
//   if (!editor) {
//     return null; // Ne pas afficher la barre d'outils si l'éditeur n'est pas encore prêt
//   }

//   return (
//     <ToggleGroup variant="outline" type="multiple" className="mb-6 space-x-1">
//       <ToggleGroupItem
//         value="bold"
//         aria-label="Gras"
//         onClick={() => editor.chain().focus().toggleBold().run()}
//       >
//         <Bold className="size-4" />
//       </ToggleGroupItem>
//       <ToggleGroupItem
//         value="italic"
//         aria-label="Italique"
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//       >
//         <Italic className="size-4" />
//       </ToggleGroupItem>
//       <ToggleGroupItem
//         value="underline"
//         aria-label="Souligné"
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//       >
//         <Underline className="size-4" />
//       </ToggleGroupItem>
//       <ToggleGroupItem
//         value="strike"
//         aria-label="Barré"
//         onClick={() => editor.chain().focus().setParagraph().run()}
//       >
//         <Strikethrough className="size-4" />
//       </ToggleGroupItem>
//       <button
//         onClick={() => editor.chain().focus().setParagraph().run()}
//         className={`btn ${editor.isActive('paragraph') ? 'is-active' : ''}`}
//       >
//         Paragraphe
//       </button>
//       <button
//         onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
//         className={`btn ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
//       >
//         Titre 1
//       </button>
//       <button
//         onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
//         className={`btn ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
//       >
//         Titre 2
//       </button>
//       {/* Ajoutez d'autres boutons si nécessaire */}
//     </ToggleGroup>
//   );
// };

// export default Toolbar;
